import HomeView from '@/views/homeView/HomeView'
import MainLayout from '@layouts/mainLayout/MainLayout'
import { createBrowserRouter } from 'react-router'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomeView />,
      },
    ],
  },
])

export default routes
