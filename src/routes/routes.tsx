import FavouritesFilms from '@/views/favouritesFilms/FavouritesFilms'
import FilmDetails from '@/views/filmDetails/FilmDetails'
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
      {
        path: '/film/:id',
        element: <FilmDetails />,
      },
      {
        path: '/favourites',
        element: <FavouritesFilms />,
      },
    ],
  },
])

export default routes
