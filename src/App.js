import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import {useField} from './hooks'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState({
        message: null
    })
    const [user, setUser] = useState(null)
    const newTitle = useField('text')
    const newAuthor = useField('text')
    const newUrl = useField('text')
    const username = useField('text')
    const password = useField('text')
    useEffect(() => {
        blogService.getAll().then(initialBlogs => {
            setBlogs(initialBlogs
                .map(blog => ({blog, show: false}))
                .sort((a, b) => b.blog.likes - a.blog.likes))
        })
    }, [])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])
    const notify = (message, type = 'success') => {
        setNotification({message, type})
        setTimeout(() => setNotification({message: null}), 5000)
    }
    const addBlog = async (event) => {
        event.preventDefault()
        try {
            blogFormRef.current.toggleVisibility()
            const blogObject = {
                title: newTitle.value,
                author: newAuthor.value,
                url: newUrl.value,
            }
            const returnedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat({blog: returnedBlog, show: false}))
            notify(`a new blog ${newTitle.value}, by ${newAuthor.value} added`)
            newTitle.onReset()
            newAuthor.onReset()
            newUrl.onReset()
        } catch (exception) {
            notify('bad title, author or url', 'error')
        }
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value, password: password.value,
            })
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            username.onReset()
            password.onReset()
        } catch (exception) {
            notify('wrong username or password', 'error')
        }
    }
    const handleLogout = (event) => {
        window.localStorage.removeItem('loggedBlogappUser')
        blogService.setToken(null)
        setUser(null)
    }
    const handleBlogClick = (currentItem) => (event) => {
        setBlogs(blogs
            .filter(item => item.blog.id !== currentItem.blog.id)
            .concat({blog: currentItem.blog, show: !currentItem.show})
            .sort((a, b) => b.blog.likes - a.blog.likes))
    }
    const handleBlogLike = (currentItem) => async (event) => {
        const blog = currentItem.blog
        const updatedBlog = {
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
        }
        const returnedBlog = await blogService.update(blog.id, updatedBlog)
        setBlogs(blogs
            .filter(item => item.blog.id !== currentItem.blog.id)
            .concat({blog: returnedBlog, show: currentItem.show})
            .sort((a, b) => b.blog.likes - a.blog.likes))
    }
    const handleBlogRemove = (currentItem) => async (event) => {
        const blog = currentItem.blog
        if (window.confirm(`Remove blog ${blog.title} ${blog.author}`)) {
            await blogService.remove(blog.id)
            setBlogs(blogs
                .filter(item => item.blog.id !== currentItem.blog.id)
                .sort((a, b) => b.blog.likes - a.blog.likes))
        }
    }
    const rows = () => blogs.map(item =>
        <Blog
            key={item.blog.id}
            blog={item.blog}
            show={item.show}
            onClick={handleBlogClick(item)}
            onLike={handleBlogLike(item)}
            onRemove={handleBlogRemove(item)}
            currentUser={user}
        />
    )
    const loginForm = () => (
        <Togglable buttonLabel='login'>
            <LoginForm
                username={username}
                password={password}
                handleSubmit={handleLogin}
            />
        </Togglable>
    )
    const blogFormRef = React.createRef()
    const blogForm = () => (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
                onSubmit={addBlog}
                title={newTitle}
                author={newAuthor}
                url={newUrl}
            />
        </Togglable>
    )
    return (
        <div>
            <h1>Blog app</h1>
            <Notification notification={notification}/>
            {user === null ?
                loginForm() :
                <div>
                    <p>{user.name} logged in</p>
                    <LogoutForm onSubmit={handleLogout}/>
                    {blogForm()}
                    <h2>Blogs</h2>
                    {rows()}
                </div>
            }
        </div>
    )
}

export default App
