import { render, screen } from '@testing-library/react'

import Login from './Login'

describe('<Login />', () => {
  it('should mount', () => {
    render(<Login />)
    const element = screen.getByText(/hello world/i)

    expect(element).toBeInTheDocument()
  })
})
