import { createBrowserRouter, Navigate, Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProjectsPage from '@/pages/ProjectsPage'

/** Root route: new pages open at the top, Back restores the old position, #hash links still work. */
function Root() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'home', element: <HomePage /> },
        ],
      },
      { path: 'projects', element: <ProjectsPage /> },
      // Old URL (kept so existing links don't break)
      { path: 'projectspage', element: <Navigate to="/projects" replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
