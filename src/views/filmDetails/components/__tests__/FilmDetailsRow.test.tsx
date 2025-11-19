import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import FilmDetailsRow from '../FilmDetailsRow'

describe('FilmDetailsRow', () => {
  it('renders provided label and value', () => {
    render(<FilmDetailsRow label="Director" value="Christopher Nolan" />)

    expect(screen.getByText('Director')).toBeInTheDocument()
    expect(screen.getByText('Christopher Nolan')).toBeInTheDocument()
  })
})
