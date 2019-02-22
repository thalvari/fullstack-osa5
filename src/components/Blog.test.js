import React from 'react'
import {fireEvent, render} from 'react-testing-library'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0,
    }
    const component = render(
        <Blog blog={blog}/>
    )
    expect(component.container).toHaveTextContent('title')
    expect(component.container).toHaveTextContent('author')
    expect(component.container).not.toHaveTextContent('url')
    expect(component.container).not.toHaveTextContent(0)
})

it('clicking the button renders all content', async () => {
    const user = {
        username: 'username',
        name: 'name',
    }
    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0,
        user: user
    }
    const component = render(
        <Blog blog={blog} show={true} currentUser={user}/>
    )
    component.debug()
    expect(component.container).toHaveTextContent('title')
    expect(component.container).toHaveTextContent('author')
    expect(component.container).toHaveTextContent('url')
    expect(component.container).toHaveTextContent(0)
})
