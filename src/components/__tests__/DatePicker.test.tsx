import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DatePicker } from '../DatePicker'

describe('DatePicker', () => {
  it('renders label and button placeholder', () => {
    const onChange = vi.fn()

    render(<DatePicker label="From" value={undefined} onChange={onChange} />)

    expect(screen.getByText('From')).toBeInTheDocument()
    expect(screen.getByLabelText('From')).toBeVisible()
  })

  it('shows calendar and calls onChange when date selected', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<DatePicker label="To" value={undefined} onChange={onChange} />)

    await user.click(screen.getByLabelText('To'))

    const calendar = await screen.findByRole('grid')
    expect(calendar).toBeVisible()

    const dayButton = within(calendar)
      .getAllByRole('gridcell')[0]
      ?.querySelector('button')
    expect(dayButton).not.toBeNull()

    await user.click(dayButton as HTMLButtonElement)

    expect(onChange).toHaveBeenCalled()
  })
})
