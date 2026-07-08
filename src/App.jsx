import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import ProjectsPage from './components/ProjectsPage/ProjectsPage'

function App() {

    let pahts = createBrowserRouter([
    {path:'' ,element:<Layout/>,children:[
      {index: true,element:<Home/>},
      {path:'home',element:<Home/>},
    ]},
    {path:'projectspage',element:<ProjectsPage/>},
  ])

  return (
    <>
      <RouterProvider router={pahts}></RouterProvider>
    </>
  )
}

export default App
