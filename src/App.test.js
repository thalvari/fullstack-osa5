import React from 'react'
import {render, waitForElement} from 'react-testing-library'
import App from './App'

jest.mock('./services/blogs')

describe('integration tests', () => {
    it('if no user logged, blogs are not rendered', async () => {
        const component = render(
            <App/>
        )
        component.rerender(<App/>)
        await waitForElement(() => component.getByText('login'))
        const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(0)
    })

    it('if logged, blogs are rendered', async () => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
        }
        localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        const component = render(
            <App/>
        )
        component.rerender(<App/>)
        await waitForElement(() => component.container.querySelector('.blog'))
        const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(5)
        expect(component.container).toHaveTextContent('title')
        expect(component.container).toHaveTextContent('title2')
        expect(component.container).toHaveTextContent('title3')
        expect(component.container).toHaveTextContent('title4')
        expect(component.container).toHaveTextContent('title5')
    })
})
