import type { Film } from '@/types/films'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useFavoritesStore from '../useFavouriteStore'

const createLocalStorageMock = () => {
  let store: Record<string, string> = {}

  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
    get length() {
      return Object.keys(store).length
    },
  } as Storage
}

const localStorageMock = createLocalStorageMock()

vi.stubGlobal('localStorage', localStorageMock)

const sampleFilm: Film = {
  Title: 'Inception',
  Year: '2010',
  imdbID: 'tt1375666',
  Type: 'movie',
  Poster: 'poster.jpg',
}

describe('useFavouriteStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] })
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    useFavoritesStore.setState({ favorites: [] })
  })

  it('adds a film to favourites', () => {
    const addFavorite = useFavoritesStore.getState().addFavorite

    addFavorite(sampleFilm)

    expect(useFavoritesStore.getState().favorites).toEqual([sampleFilm])
  })

  it('removes a film from favourites', () => {
    useFavoritesStore.setState({ favorites: [sampleFilm] })
    const removeFavorite = useFavoritesStore.getState().removeFavorite

    removeFavorite(sampleFilm.imdbID)

    expect(useFavoritesStore.getState().favorites).toEqual([])
  })

  it('checks if a film is favourite', () => {
    useFavoritesStore.setState({ favorites: [sampleFilm] })
    const isFavorite = useFavoritesStore.getState().isFavorite

    expect(isFavorite(sampleFilm.imdbID)).toBe(true)
    expect(isFavorite('another-id')).toBe(false)
  })
})
