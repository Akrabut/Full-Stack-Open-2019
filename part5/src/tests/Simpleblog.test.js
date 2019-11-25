import testHelper from '../helpers/test_helper.js'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Simpleblog from '../components/Simpleblog'

const simpleBlog = {
  title: 'this is a simple blog',
  author: 'your very best',
  likes: 6,
}

test('renders content', () => {
  const component = render(
    <Simpleblog blog={simpleBlog}/>
  )

  expect(component.container).toHaveTextContent(
    'this is a simple blog'
  )
  expect(component.container).toHaveTextContent(
    'your very best'
  )
  expect(component.container).toHaveTextContent(
    6
  )
})

test('like button presses register', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Simpleblog blog={simpleBlog} onClick={mockHandler}/>
  )
  const { getByText } = component
  const button = getByText('like')
  for (let i = 0; i < 5; i++) {
    fireEvent.click(button) 
  }
  expect(mockHandler.mock.calls.length).toBe(5)
})
