import { useQueryClient } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProvidersWrapper from '../ProvidersWrapper'

vi.mock('@/components/ui/sonner', () => ({
  Toaster: () => <div data-testid="mock-toaster" />,
}))

const QueryClientConsumer = () => {
  useQueryClient()

  return <p>Query client ready</p>
}

describe('ProvidersWrapper', () => {
  it('provides react-query context to its children', () => {
    render(
      <ProvidersWrapper>
        <QueryClientConsumer />
      </ProvidersWrapper>
    )

    expect(screen.getByText('Query client ready')).toBeInTheDocument()
  })

  it('renders the Toaster component', () => {
    render(
      <ProvidersWrapper>
        <p>Child</p>
      </ProvidersWrapper>
    )

    expect(screen.getByTestId('mock-toaster')).toBeInTheDocument()
  })
})
