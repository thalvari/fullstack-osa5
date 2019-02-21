import React from 'react'

const Blog = ({blog, show, onClick, onLike}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return (
        <div style={blogStyle}>
            <div>
                <div onClick={onClick}>
                    {blog.title} {blog.author}
                </div>
                {show &&
                <div>
                    <a href={blog.url}>{blog.url}</a>
                    <div>
                        {blog.likes} likes <button onClick={onLike} type="submit">like</button>
                    </div>
                    <div>
                        added by {blog.user.name}
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

// const Blog = ({ blog, toggleImportance }) => {
//   const label = blog.important
//     ? 'make not important'
//     : 'make important'
//
//   return (
//     <li className='blog'>
//       {blog.content}
//       <button onClick={toggleImportance}>{label}</button>
//     </li>
//   )
// }

export default Blog
