import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '.'
import { AuthContext } from '../../../Auth.context'

const customRender = (props) => {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={{ ...props }}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>,
  )
}

describe('Header', () => {
  test('render Header without login', () => {
    const props = { auth: jest.fn(), login: jest.fn() }
    const { container } = customRender(props)
    expect(container).toMatchSnapshot()
    expect(props.auth).toBeCalled()
    expect(screen.getByText('Funny Movies')).toBeInTheDocument()
    expect(container.querySelector('input[name="email"]')).toBeInTheDocument()
    expect(container.querySelector('input[name="password"]')).toBeInTheDocument()
    expect(screen.getByText('Login/Register')).toBeInTheDocument()
    screen.getByText('Login/Register').click()
    expect(props.login).toBeCalled()
  })

  test('render Header with login', () => {
    const props = { state: { loggedIn: true, email: 'test@gmail.com' }, auth: jest.fn(), logout: jest.fn() }
    const { container } = customRender(props)
    expect(container).toMatchSnapshot()
    expect(props.auth).toBeCalled()
    expect(screen.getByText(props.state.email)).toBeInTheDocument()
    expect(screen.getByText('Share a movie')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
    screen.getByText('Logout').click()
    expect(props.logout).toBeCalled()
  })
})
