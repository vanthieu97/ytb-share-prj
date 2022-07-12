import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import axios from '../../axios-settings'
import Home from '.'
import { AuthContext } from '../../Auth.context'

jest.mock('../../axios-settings')

const customRender = (props) => {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={{ ...props }}>
        <Home />
      </AuthContext.Provider>
    </MemoryRouter>,
  )
}

describe('Home', () => {
  test('render Home with empty list', async () => {
    axios.get.mockResolvedValue({ data: { total: 0, data: [] } })

    let container
    await act(async () => {
      const renderResult = customRender()
      container = renderResult.container
    })
    expect(container).toMatchSnapshot()
    expect(screen.getByText('No video is shared!')).toBeInTheDocument()
  })

  test('render Home without pagination', async () => {
    axios.get.mockResolvedValue({
      data: {
        total: 1,
        data: [
          {
            url: 'video-1',
            title: 'Title 1',
            desc: 'Desc 1',
            vote: '',
            likeCount: 10,
            dislikeCount: 11,
          },
        ],
      },
    })
    let container
    await act(async () => {
      const renderResult = customRender()
      container = renderResult.container
    })
    expect(container).toMatchSnapshot()
    expect(screen.getByText('Title 1')).toBeInTheDocument()
    expect(screen.getByText('Desc 1')).toBeInTheDocument()
    expect(container.querySelector('.pagination .page')).not.toBeInTheDocument()
  })

  test('render Home with pagination', async () => {
    axios.get.mockResolvedValue({
      data: {
        total: 11,
        data: Array(11)
          .fill()
          .map((_, index) => ({
            url: `video-${index}`,
            title: `Title ${index}`,
            desc: `Desc ${index}`,
            vote: '',
            likeCount: 10,
            dislikeCount: 11,
          })),
      },
    })
    let container
    await act(async () => {
      const renderResult = customRender()
      container = renderResult.container
    })
    expect(container).toMatchSnapshot()
    expect(screen.getByText('Title 1')).toBeInTheDocument()
    expect(screen.getByText('Desc 1')).toBeInTheDocument()
    expect(container.querySelector('.pagination .page')).toBeInTheDocument()
  })
})
