import FavouritesFilms from '@/views/favouritesFilms/FavouritesFilms'
import FilmDetails from '@/views/filmDetails/FilmDetails'
import HomeView from '@/views/homeView/HomeView'
import MainLayout from '@layouts/mainLayout/MainLayout'
import { createBrowserRouter } from 'react-router'

type RouteMeta = {
  title: string
  description: string
}

export const routesMetadata = {
  root: {
    title: 'Future Mind Films',
    description:
      'Future Mind Films — browse the catalog, see details and manage favourites.',
  } satisfies RouteMeta,
  home: {
    title: 'Search movies | Future Mind Films',
    description:
      'Look up movies, series and episodes by title, year or type with instant filters.',
  } satisfies RouteMeta,
  filmDetails: {
    title: 'Film details | Future Mind Films',
    description:
      'Deep dive into the selected title with cast, plot, release info and more.',
  } satisfies RouteMeta,
  favourites: {
    title: 'Your favourites | Future Mind Films',
    description:
      'Review and manage every movie or series saved to your local favourites list.',
  } satisfies RouteMeta,
}

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    handle: routesMetadata.root,
    children: [
      {
        path: '/',
        element: <HomeView />,
        handle: routesMetadata.home,
      },
      {
        path: '/film/:id',
        element: <FilmDetails />,
        handle: routesMetadata.filmDetails,
      },
      {
        path: '/favourites',
        element: <FavouritesFilms />,
        handle: routesMetadata.favourites,
      },
    ],
  },
])

export default routes
