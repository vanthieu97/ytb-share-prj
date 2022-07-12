import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Share from '.'

jest.mock('../../axios-settings')

const customRender = () => {
  return render(
    <MemoryRouter>
      <Share />
    </MemoryRouter>,
  )
}

describe('Share', () => {
  test('render Share', async () => {
    const { container } = customRender()
    expect(container).toMatchSnapshot()
  })
})
