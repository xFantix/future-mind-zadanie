import useFavoritesStore from '@/store/useFavouriteStore'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import FilmCard from '../FilmCard'

vi.mock('@/store/useFavouriteStore', () => ({
  default: vi.fn(),
}))

type ViMock = ReturnType<typeof vi.fn>

const mockUseFavoritesStore = useFavoritesStore as unknown as ViMock

const film = {
  Title: 'Interstellar',
  Year: '2014',
  imdbID: 'tt0816692',
  Type: 'movie',
  Poster: 'poster.jpg',
} as const

type FavoritesStoreState = {
  favorites: (typeof film)[]
  addFavorite: ViMock
  removeFavorite: ViMock
}

const setupMockStore = (overrides: Partial<FavoritesStoreState> = {}) => {
  const state: FavoritesStoreState = {
    favorites: overrides.favorites ?? [],
    addFavorite: overrides.addFavorite ?? vi.fn(),
    removeFavorite: overrides.removeFavorite ?? vi.fn(),
  }

  mockUseFavoritesStore.mockImplementation(
    (selector: (state: FavoritesStoreState) => unknown) => selector(state)
  )

  return state
}

const renderFilmCard = () =>
  render(
    <MemoryRouter>
      <FilmCard film={film} />
    </MemoryRouter>
  )

describe('FilmCard', () => {
  it('renders film details and link', () => {
    setupMockStore()

    renderFilmCard()

    expect(screen.getByRole('link', { name: /interstellar/i })).toHaveAttribute(
      'href',
      `/film/${film.imdbID}`
    )
    expect(screen.getByText('2014')).toBeInTheDocument()
    expect(screen.getByText('movie')).toBeInTheDocument()
  })

  it('adds film to favourites when not already favourited', async () => {
    const store = setupMockStore()
    const user = userEvent.setup()

    renderFilmCard()

    await user.click(screen.getByRole('button', { name: /add to favourites/i }))

    expect(store.addFavorite).toHaveBeenCalledWith(film)
    expect(store.removeFavorite).not.toHaveBeenCalled()
  })

  it('removes film from favourites when already favourited', async () => {
    const store = setupMockStore({ favorites: [film] })
    const user = userEvent.setup()

    renderFilmCard()

    await user.click(screen.getByRole('button', { name: /add to favourites/i }))

    expect(store.removeFavorite).toHaveBeenCalledWith(film.imdbID)
    expect(store.addFavorite).not.toHaveBeenCalled()
  })
})
