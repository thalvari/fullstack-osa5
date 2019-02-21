import React from 'react'

const Blog = ({blog}) => {
    return (
        <li className='blog'>
            {blog.title} {blog.author} {blog.url} {blog.likes}
        </li>
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
