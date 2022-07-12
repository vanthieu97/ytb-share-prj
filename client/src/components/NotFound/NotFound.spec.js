import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import NotFound from '.'

describe('NotFound', () => {
  test('render NotFound', () => {
    const { container } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )
    expect(container).toMatchSnapshot()
  })
})
