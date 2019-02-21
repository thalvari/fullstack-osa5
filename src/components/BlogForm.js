import React from 'react'
import PropTypes from "prop-types";

const BlogForm = ({onSubmit, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange}) => {
    return (
        <div>
            <h2>Add blog</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>title</label>
                    <input
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <label>author</label>
                    <input
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    <label>url</label>
                    <input
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <div>
                    <button type="submit">submit</button>
                </div>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    author: PropTypes.string.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
}

export default BlogForm
