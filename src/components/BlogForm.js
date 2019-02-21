import React from 'react'

const BlogForm = ({onSubmit, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange}) => {
    return (
        <div>
            <h2>Luo uusi blogi</h2>
            <form onSubmit={onSubmit}>
                <input
                    value={title}
                    onChange={handleTitleChange}
                />
                <input
                    value={author}
                    onChange={handleAuthorChange}
                />
                <input
                    value={url}
                    onChange={handleUrlChange}
                />
                <button type="submit">tallenna</button>
            </form>
        </div>
    )
}

export default BlogForm
