import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LoadingWrapper from '../LoadingWrapper'

describe('LoadingWrapper', () => {
  it('shows spinner when loading', () => {
    render(
      <LoadingWrapper isLoading className="custom">
        <p>Loaded content</p>
      </LoadingWrapper>
    )

    expect(
      screen.getByRole('status', { name: 'Content is loading' })
    ).toBeInTheDocument()
  })

  it('renders children when not loading', () => {
    render(
      <LoadingWrapper isLoading={false}>
        <p>Loaded content</p>
      </LoadingWrapper>
    )

    expect(screen.getByText('Loaded content')).toBeInTheDocument()
  })
})
