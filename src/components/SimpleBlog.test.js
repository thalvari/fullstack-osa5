import React from 'react'
import {fireEvent, render} from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0,
    }
    const component = render(
        <SimpleBlog blog={blog}/>
    )
    expect(component.container).toHaveTextContent('title')
    expect(component.container).toHaveTextContent('author')
    expect(component.container).toHaveTextContent(0)
})

it('clicking the button twice calls event handler twice', async () => {
    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0,
    }
    const mockHandler = jest.fn()
    const {getByText} = render(
        <SimpleBlog blog={blog} onClick={mockHandler}/>
    )
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
})
