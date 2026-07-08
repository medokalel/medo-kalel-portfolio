// projectsData.js - Shared data file for all projects
// Add new projects here and they will appear everywhere automatically

import ecommerce from '../../assets/images/ProductService Landing Page Website in Black Blue Techflux Style.png'
import landingPage from '../../assets/images/ProductService Landing Page Website in Black Blue Techflu Style.png'
import portfolio from '../../assets/images/Screenshot 2026-05-14 210051.png'
import qrLandingPage from '../../assets/images/Screenshot 2026-05-14 210400.png'

export const projectsData = [
  {
    id: 1,
    category: 'E-Commerce',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform with real-time inventory, payment integration, and advanced product filtering.',
    image: ecommerce,
    tags: ['React', 'JavaScript', 'Bootstrap', 'CSS3'],
    liveUrl: 'https://react-ecommerce-app-sigma.vercel.app/',
    codeUrl: 'https://github.com/medokalel/react-ecommerce-app',
    date: '2026-05-13'
  },
  {
    id: 2,
    category: 'Landing Page',
    title: 'Landing Page',
    description: 'A modern and responsive coffee website featuring smooth animations, interactive sections, and a visually engaging user experience.',
    image: landingPage,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    liveUrl: 'https://medokalel.github.io/velora-coffee/',
    codeUrl: 'https://github.com/medokalel/velora-coffee',
    date: '2026-05-08'
  },
  {
    id: 3,
    category: 'Landing Page',
    title: 'Qr Landing Page',
    description: 'A modern QR code landing page featuring responsive design, clean UI, smooth interactions, and a scrolling logo marquee showcasing trusted brands for a more engaging user experience.',
    image: qrLandingPage,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    liveUrl: 'https://qr-landing-page-nine.vercel.app/',
    codeUrl: 'https://github.com/medokalel/qr-landing-page',
    date: '2026-05-14'
  },
  {
    id: 4,
    category: 'Portfolio',
    title: 'Portfolio WebSite',
    description: 'My personal portfolio built with React and CSS Modules, featuring smooth animations, a responsive design, and sections for projects, services, and journey to showcase my skills as a front-end developer.',
    image: portfolio,
    tags: ['React', 'JavaScript', 'CSS3', 'Bootstrap'],
    liveUrl: 'https://medo-kalel-portfolio.vercel.app/',
    codeUrl: '#',
    date: '2026-06-10'
  },
  {
    id: 5,
    category: 'Portfolio',
    title: 'Portfolio WebSite for Backend Developer',
    description: 'My personal portfolio built with React and CSS Modules, featuring smooth animations, a responsive design, and sections for projects, services, and journey to showcase my skills as a front-end developer.',
    image: portfolio,
    tags: ['React', 'JavaScript', 'CSS3', 'Bootstrap'],
    liveUrl: 'https://alex-portfolio-weld.vercel.app/',
    codeUrl: 'https://github.com/medokalel/alex-portfolio',
    date: '2026-07-7'
  },{
    id: 6,
    category: 'Portfolio',
    title: 'Portfolio WebSite for Backend Developer',
    description: 'My personal portfolio built with React and CSS Modules, featuring smooth animations, a responsive design, and sections for projects, services, and journey to showcase my skills as a front-end developer.',
    image: portfolio,
    tags: ['React', 'JavaScript', 'CSS3', 'Bootstrap'],
    liveUrl: 'https://ahmed-samir-portfolio-pi.vercel.app/',
    codeUrl: 'https://github.com/medokalel/ahmed-samir-portfolio',
    date: '2026-07-6'
  },{
    id: 7,
    category: 'Portfolio',
    title: 'Portfolio WebSite for Web Design',
    description: 'My personal portfolio built with React and CSS Modules, featuring smooth animations, a responsive design, and sections for projects, services, and journey to showcase my skills as a front-end developer.',
    image: portfolio,
    tags: ['React', 'JavaScript', 'CSS3', 'Bootstrap'],
    liveUrl: 'https://youssef-kamel-portfolio.vercel.app/',
    codeUrl: 'https://github.com/medokalel/youssef-kamel-portfolio',
    date: '2026-07-8'
  }
]

// Helper function to get latest projects
export const getLatestProjects = (count = 4) => {
  return [...projectsData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count)
}

// Helper function to get all projects sorted by date
export const getAllProjectsSorted = () => {
  return [...projectsData].sort((a, b) => new Date(b.date) - new Date(a.date))
}

// Helper function to format date
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}