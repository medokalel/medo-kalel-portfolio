// One-off migration script (safe on Windows/macOS case-insensitive file systems).
// Run from the project root:  node restructure.mjs
import fs from 'node:fs'
import path from 'node:path'

const src = (...p) => path.join('src', ...p)
const comp = (...p) => src('components', ...p)

if (fs.existsSync(src('pages')) || fs.existsSync(comp('ui'))) {
  console.error('src/pages or src/components/ui already exists. Restore the original src first (git restore src), then run again.')
  process.exit(1)
}

function move(from, to) {
  if (!fs.existsSync(from)) return console.warn(`  ! missing: ${from}`)
  fs.mkdirSync(path.dirname(to), { recursive: true })
  fs.renameSync(from, to)
}

function edit(file, replacements) {
  let text = fs.readFileSync(file, 'utf8')
  for (const [from, to] of replacements) {
    if (!text.includes(from)) console.warn(`  ! "${from}" not found in ${file}`)
    text = text.split(from).join(to)
  }
  fs.writeFileSync(file, text)
}

// 0) Park every old component folder under a temporary name, so that
//    "Layout" -> "layout" and "Home" -> "home" can never collide on Windows.
const oldDirs = ['Layout', 'Navbar', 'Footer', 'ScrollToTop', 'Hero', 'About', 'TechStack', 'Projects',
  'Journey', 'Services', 'Testimonials', 'Contact', 'Home', 'ProjectsPage', 'projectsData']
const old = (name, ...p) => comp(`__old_${name}`, ...p)
for (const name of oldDirs) {
  if (fs.existsSync(comp(name))) fs.renameSync(comp(name), comp(`__old_${name}`))
}

// 1) Layout
move(old('Layout', 'Layout.jsx'), comp('layout', 'Layout.jsx'))
for (const f of ['Navbar.jsx', 'Navbar.module.css']) move(old('Navbar', f), comp('layout', f))
for (const f of ['Footer.jsx', 'Footer.module.css']) move(old('Footer', f), comp('layout', f))

// 2) Shared UI
for (const f of ['ScrollToTop.jsx', 'ScrollToTop.module.css']) move(old('ScrollToTop', f), comp('ui', f))

// 3) Home sections
for (const name of ['Hero', 'About', 'TechStack', 'Projects', 'Journey', 'Services', 'Testimonials', 'Contact']) {
  for (const ext of ['jsx', 'module.css']) move(old(name, `${name}.${ext}`), comp('home', `${name}.${ext}`))
}

// 4) Pages
move(old('Home', 'Home.jsx'), src('pages', 'HomePage.jsx'))
move(old('ProjectsPage', 'ProjectsPage.jsx'), src('pages', 'ProjectsPage.jsx'))
move(old('ProjectsPage', 'ProjectsPage.module.css'), src('pages', 'ProjectsPage.module.css'))

// 5) Content
move(old('projectsData', 'projectsData.jsx'), src('content', 'projects.js'))

// 6) Delete the parked folders (only leftovers like the empty Home.module.css remain in them)
for (const name of oldDirs) fs.rmSync(comp(`__old_${name}`), { recursive: true, force: true })

// 7) Old JS entry files + empty folders from the reference structure
for (const f of [src('main.jsx'), src('App.jsx'), 'vite.config.js']) fs.rmSync(f, { force: true })
for (const dir of ['context', 'hooks', 'lib', path.join('i18n', 'locales')]) {
  fs.mkdirSync(src(dir), { recursive: true })
  fs.writeFileSync(path.join(src(dir), '.gitkeep'), '')
}
fs.mkdirSync(src('styles'), { recursive: true })
fs.writeFileSync(
  src('styles', 'design-system.css'),
  '/* Design tokens (colors, fonts, breakpoints) go here inside an @theme block. Filled in Task 3. */\n',
)

// 8) Fix imports
edit(comp('layout', 'Layout.jsx'), [
  ["'../Navbar/Navbar'", "'./Navbar'"],
  ["'../Footer/Footer'", "'./Footer'"],
])
edit(src('pages', 'HomePage.jsx'), [
  ["'../Hero/Hero'", "'@/components/home/Hero'"],
  ["'../About/About'", "'@/components/home/About'"],
  ["'../TechStack/TechStack'", "'@/components/home/TechStack'"],
  ["'../ScrollToTop/ScrollToTop'", "'@/components/ui/ScrollToTop'"],
  ["'../Projects/Projects'", "'@/components/home/Projects'"],
  ["'../Journey/Journey'", "'@/components/home/Journey'"],
  ["'../Services/Services'", "'@/components/home/Services'"],
  ["'../Testimonials/Testimonials'", "'@/components/home/Testimonials'"],
  ["'../Contact/Contact'", "'@/components/home/Contact'"],
  ['export default function Home()', 'export default function HomePage()'],
])
edit(comp('home', 'Projects.jsx'), [
  ["'../../components/projectsData/projectsData'", "'@/content/projects'"],
])
edit(src('pages', 'ProjectsPage.jsx'), [
  ["import { projectsData, getAllProjectsSorted, formatDate } from '../../components/projectsData/projectsData'",
   "import { getAllProjectsSorted, formatDate } from '@/content/projects'"],
])
edit(comp('home', 'About.jsx'), [["'../../assets/", "'@/assets/"]])
edit(src('content', 'projects.js'), [["'../../assets/", "'@/assets/"]])

// 9) Import the (still empty) design tokens file from index.css
const css = fs.readFileSync(src('index.css'), 'utf8')
if (!css.includes('design-system.css')) {
  fs.writeFileSync(src('index.css'), css.replace('@import "tailwindcss";', '@import "tailwindcss";\n@import "./styles/design-system.css";'))
}

console.log('Done.')