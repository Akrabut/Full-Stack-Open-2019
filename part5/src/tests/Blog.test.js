import testHelper from '../helpers/test_helper.js'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { getByTestId, getByText } from '@testing-library/dom'
import { Blog } from '../components/Blog'

describe('Blog component', () => {
  const blog = {
    title: 'this is a regular blog',
    author: 'a regular author',
    url: 'https://regularurl.com',
    user: {
      id: 123456,
      name: 'a regular user',
    },
    likes: 13,
  }
  let component = null

  beforeEach(() => {
    component = render(
      <Blog blog={blog}/>
    )
  })

  function findElement(id) {
    return component.container.querySelector(id)
  }

  test('blog details are hidden by default', () => {
    expect(component.container).toHaveTextContent(blog.title)

    expect(component.container).not.toHaveTextContent(blog.url)
  })

  test('blog details are displayed after pressing it', () => {
    const button = findElement('#blog-without-details')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(blog.url)
  })

  test('blog details are hidden again after pressing the blog twice', () => {
    let button = findElement('#blog-without-details')
    fireEvent.click(button)
    button = findElement('#clickable-content')
    fireEvent.click(button)
    expect(component.container).not.toHaveTextContent(blog.url)
  })

})

