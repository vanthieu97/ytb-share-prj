import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Notification from '.'

jest.spyOn(document.body, 'append')

describe('Notification', () => {
  test('render success notification', () => {
    Notification.success('Test success')
    expect(document.body.append).toBeCalled()
    expect('Test success')
    expect(document.body.append.mock.calls[0][0]).toMatchSnapshot()
  })

  test('render error notification', () => {
    Notification.error('Test error')
    expect(document.body.append).toBeCalled()
    expect('Test error')
    expect(document.body.append.mock.calls[0][0]).toMatchSnapshot()
  })
})
