import React from 'react'
import PropTypes from "prop-types";

const BlogForm = ({onSubmit, title, author, url}) => {
    return (
        <div>
            <h2>Add blog</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>title</label>
                    <input {...title}/>
                </div>
                <div>
                    <label>author</label>
                    <input {...author}/>
                </div>
                <div>
                    <label>url</label>
                    <input {...url}/>
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
    title: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    url: PropTypes.object.isRequired,
}

export default BlogForm
