import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Loading from '.'

describe('Loading', () => {
  test('render Loading', () => {
    const { container } = render(<Loading />)
    expect(container).toMatchSnapshot()
  })
})
