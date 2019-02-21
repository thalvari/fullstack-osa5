import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    // const [showAll, setShowAll] = useState(false)
    const [notification, setNotification] = useState({
        message: null
    })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
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
    // const toggleImportanceOf = id => {
    //     const note = blogs.find(n => n.id === id)
    //     const changedNote = {...note, important: !note.important}
    //
    //     blogService
    //         .update(changedNote).then(returnedNote => {
    //         setBlogs(blogs.map(note => note.id !== id ? note : returnedNote))
    //     })
    //         .catch(() => {
    //             setErrorMessage(`muistiinpano '${note.content}' on jo valitettavasti poistettu palvelimelta`)
    //             setTimeout(() => {
    //                 setErrorMessage(null)
    //             }, 5000)
    //             setBlogs(blogs.filter(n => n.id !== id))
    //         })
    // }
    // const blogsToShow = showAll
    //     ? blogs
    // : blogs.filter(note => note.important)
    const notify = (message, type = 'success') => {
        setNotification({message, type})
        setTimeout(() => setNotification({message: null}), 5000)
    }
    const addBlog = async (event) => {
        event.preventDefault()
        try {
            blogFormRef.current.toggleVisibility()
            const blogObject = {
                title: newTitle,
                author: newAuthor,
                url: newUrl,
            }
            const returnedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat({blog: returnedBlog, show: false}))
            notify(`a new blog ${newTitle}, by ${newAuthor} added`)
            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')
        } catch (exception) {
            notify('bad title, author or url', 'error')
        }
    }
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            // setShowAll(true)
        } catch (exception) {
            notify('wrong username or password', 'error')
        }
    }
    const handleLogout = (event) => {
        window.localStorage.removeItem('loggedBlogappUser')
        blogService.setToken(null)
        setUser(null)
        // setShowAll(false)
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
    const rows = () => blogs.map(item =>
        <Blog
            key={item.blog.id}
            blog={item.blog}
            show={item.show}
            onClick={handleBlogClick(item)}
            onLike={handleBlogLike(item)}
            // toggleImportance={() => toggleImportanceOf(blog.id)}
        />
    )
    const loginForm = () => (
        <Togglable buttonLabel='login'>
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({target}) => setUsername(target.value)}
                handlePasswordChange={({target}) => setPassword(target.value)}
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
                handleTitleChange={handleTitleChange}
                author={newAuthor}
                handleAuthorChange={handleAuthorChange}
                url={newUrl}
                handleUrlChange={handleUrlChange}
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
            {/*<div>*/}
            {/*<button onClick={() => setShowAll(!showAll)}>*/}
            {/*näytä {showAll ? 'vain tärkeät' : 'kaikki'}*/}
            {/*</button>*/}
            {/*</div>*/}
        </div>
    )
}

export default App
