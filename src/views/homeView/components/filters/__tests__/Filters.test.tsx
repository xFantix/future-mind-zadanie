import { QueryKeys } from '@/config/queryKeys'
import type { FilmsResponse, FiltersFormValues } from '@/types/films'
import Filters from '@/views/homeView/components/filters/Filters'
import {
  QueryClient,
  QueryClientProvider,
  type InfiniteData,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/components/Input', () => ({
  default: ({
    label,
    ...props
  }: { label: string } & ComponentProps<'input'>) => (
    <label>
      {label}
      <input {...props} />
    </label>
  ),
}))

vi.mock('@/components/Combobox', () => ({
  Combobox: ({
    label,
    value,
    setValue,
    options,
  }: {
    label: string
    value: string | undefined
    setValue: (value: string | undefined) => void
    options: { label: string; value: string }[]
  }) => (
    <label>
      {label}
      <select
        aria-label={label}
        value={value ?? ''}
        onChange={event => setValue(event.target.value || undefined)}
      >
        <option value="">Select</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  ),
}))

vi.mock('@/components/Select', () => ({
  Select: ({
    label,
    value,
    onChange,
    options,
  }: {
    label: string
    value?: string
    onChange?: (value: string) => void
    options: { label: string; value: string }[]
  }) => (
    <label>
      {label}
      <select
        aria-label={label}
        value={value}
        onChange={event => onChange?.(event.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  ),
}))

type MoviesQueryResult = Pick<
  UseInfiniteQueryResult<InfiniteData<FilmsResponse, unknown>, Error>,
  'refetch'
>

const createdQueryClients: QueryClient[] = []

const renderFilters = (options?: {
  defaultValues?: Partial<FiltersFormValues>
  seedMovies?: boolean
}) => {
  const queryClient = new QueryClient()
  createdQueryClients.push(queryClient)

  if (options?.seedMovies) {
    queryClient.setQueryData([QueryKeys.MOVIES], {
      pages: [],
      pageParams: [],
    } satisfies InfiniteData<FilmsResponse, unknown>)
  }

  const moviesQuery: MoviesQueryResult = {
    refetch: vi.fn(),
  }

  const Wrapper = () => {
    const form = useForm<FiltersFormValues>({
      defaultValues: {
        s: '',
        y: undefined,
        type: 'all',
        ...options?.defaultValues,
      },
    })

    return (
      <Filters
        form={form}
        moviesQuery={
          moviesQuery as UseInfiniteQueryResult<
            InfiniteData<FilmsResponse, unknown>,
            Error
          >
        }
      />
    )
  }

  const user = userEvent.setup()

  return {
    user,
    moviesQuery,
    queryClient,
    ...render(
      <QueryClientProvider client={queryClient}>
        <Wrapper />
      </QueryClientProvider>
    ),
  }
}

afterEach(() => {
  createdQueryClients.forEach(client => client.clear())
  createdQueryClients.length = 0
})

describe('Filters', () => {
  it('enables submit when search has value and triggers movies refetch', async () => {
    const { user, moviesQuery } = renderFilters()

    const searchButton = screen.getByRole('button', { name: /search/i })
    expect(searchButton).toBeDisabled()

    await user.type(screen.getByLabelText('Search'), 'Matrix')

    expect(searchButton).toBeEnabled()

    await user.click(searchButton)

    expect(moviesQuery.refetch).toHaveBeenCalledTimes(1)
  })

  it('clears form values and resets movies query cache', async () => {
    const { user, queryClient } = renderFilters()
    const resetSpy = vi.spyOn(queryClient, 'resetQueries')

    const clearButton = screen.getByRole('button', { name: /clear/i })
    expect(clearButton).toBeDisabled()

    await user.type(screen.getByLabelText('Search'), 'Avatar')

    expect(clearButton).toBeEnabled()

    await user.click(clearButton)

    await waitFor(() => expect(screen.getByLabelText('Search')).toHaveValue(''))
    expect(clearButton).toBeDisabled()
    expect(resetSpy).toHaveBeenCalledWith({ queryKey: [QueryKeys.MOVIES] })
  })

  it('enables clear button when movies data is cached', () => {
    renderFilters({ seedMovies: true })

    expect(screen.getByRole('button', { name: /clear/i })).toBeEnabled()
  })
})
