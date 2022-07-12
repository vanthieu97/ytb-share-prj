import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Layout from '.'

jest.mock('./Header', () => 'header')

describe('Layout', () => {
  test('render Layout', () => {
    render(<Layout>children</Layout>)
    expect(screen.getByText('children')).toBeInTheDocument()
  })
})
