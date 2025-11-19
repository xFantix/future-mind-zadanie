import useFavoritesStore from '@/store/useFavouriteStore'
import FavouritesFilms from '@/views/favouritesFilms/FavouritesFilms'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/store/useFavouriteStore', () => ({
  default: vi.fn(),
}))

type ViMock = ReturnType<typeof vi.fn>

type FavoritesStoreState = {
  favorites: Array<{
    imdbID: string
    Title: string
    Year: string
    Type: string
  }>
}

const mockUseFavoritesStore = useFavoritesStore as unknown as ViMock

const setupMockStore = (favorites: FavoritesStoreState['favorites']) => {
  mockUseFavoritesStore.mockImplementation(
    (selector: (state: FavoritesStoreState) => unknown) =>
      selector({ favorites })
  )
}

const renderView = () =>
  render(
    <MemoryRouter>
      <FavouritesFilms />
    </MemoryRouter>
  )

describe('FavouritesFilms', () => {
  it('renders empty state when there are no favourites', () => {
    setupMockStore([])

    renderView()

    expect(
      screen.getByText(/there are no saved items yet/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /open movie search/i })
    ).toHaveAttribute('href', '/')
  })

  it('renders favourites list with correct status message', () => {
    const favorites = [
      {
        imdbID: 'tt001',
        Title: 'Movie 1',
        Year: '2001',
        Type: 'movie',
        Poster: 'poster-1.jpg',
      },
      {
        imdbID: 'tt002',
        Title: 'Movie 2',
        Year: '2002',
        Type: 'series',
        Poster: 'poster-2.jpg',
      },
    ]
    setupMockStore(favorites)

    renderView()

    expect(
      screen.getByText(
        `The list currently contains ${favorites.length} movies.`
      )
    ).toBeInTheDocument()
    expect(
      screen.getByRole('list', { name: /favourite movies list/i })
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(favorites.length)
  })
})
