import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import FilmDetailsRowIcon from '../FilmDetailsRowIcon'

describe('FilmDetailsRowIcon', () => {
  it('renders icon, label and value', () => {
    render(
      <FilmDetailsRowIcon
        label="Released"
        value="2014"
        icon={<span data-testid="icon">★</span>}
      />
    )

    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('Released')).toBeInTheDocument()
    expect(screen.getByText('2014')).toBeInTheDocument()
  })

  it('supports test value', () => {
    render(
      <FilmDetailsRowIcon label="Box office" value={'test'} icon={<span />} />
    )

    expect(screen.getByText('Box office')).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
