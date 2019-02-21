import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerStyle}>
            <br/>
            <em>Blog app, Department of Computer Science 2019</em>
        </div>
    )
}

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    // const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    useEffect(() => {
        blogService.getAll().then(initialBlogs => {
            setBlogs(initialBlogs)
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
    // const notesToShow = showAll
    //     ? blogs
    //     : blogs.filter(note => note.important)
    const addBlog = (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        }
        blogService.create(blogObject).then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')
        })
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
        } catch (exception) {
            setErrorMessage('käyttäjätunnus tai salasana virheellinen')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    // const rows = () => blogsToShow.map(blog =>
    const rows = () => blogs.map(blog =>
        <Blog
            key={blog.id}
            blog={blog}
            // toggleImportance={() => toggleImportanceOf(blog.id)}
        />
    )
    const loginForm = () => {
        return (
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
    }
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
            <h1>Blogisovellus</h1>
            <Notification message={errorMessage}/>
            {user === null ?
                loginForm() :
                <div>
                    <p>{user.name} logged in</p>
                    {blogForm()}
                </div>
            }
            <h2>Blogit</h2>
            {/*<div>*/}
            {/*<button onClick={() => setShowAll(!showAll)}>*/}
            {/*näytä {showAll ? 'vain tärkeät' : 'kaikki'}*/}
            {/*</button>*/}
            {/*</div>*/}
            <ul>
                {rows()}
            </ul>
            <Footer/>
        </div>
    )
}

export default App
