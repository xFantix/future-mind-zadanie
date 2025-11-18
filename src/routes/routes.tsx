import HomeView from '@views/HomeView'
import { createBrowserRouter } from 'react-router'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomeView />,
  },
])

export default routes
