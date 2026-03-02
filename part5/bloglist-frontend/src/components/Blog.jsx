import { useState } from "react"
import blogService from '../services/blogs.js'

const Blog = ({ blogs, blog, setBlogs, user }) => {
  const [display, setDisplay] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeStyle = {
    color: 'black',
    background: 'blue',
    borderRadius: '5px',
    border: 'none',
    padding: '5px'
  }

  const toggleDisplay = () => {
    setDisplay(!display)
  }

  const incrementLike = async(id) => {
    const selectedBlog = blogs.find(b => b.id === id)
    const updatedBlog = await blogService.update(id, {...selectedBlog, likes: selectedBlog.likes + 1})
    setBlogs(blogs.map(b => b.id === id ? updatedBlog : b))
  }

  const removeBlog = async(id) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.remove(id)
      const filteredBlog = blogs.filter(b => b.id !== id)
      setBlogs(filteredBlog)
    }
  }

  return(
    <div style={blogStyle}>
      {!display && 
        <div>
          {blog.title} {blog.author} <button onClick={toggleDisplay}>view</button>
        </div>
      }
      {display && 
        <div>
          {blog.title} {blog.author} <button onClick={toggleDisplay}>hide</button><br />
          {blog.url} <br />
          likes {blog.likes} <button onClick={() => incrementLike(blog.id)}>like</button> <br />
          {blog.user?.username}
          
          {user.username === blog.user?.username ? <button style={removeStyle} onClick={() => removeBlog(blog.id)}>remove</button> : null}
        </div>
      }
    </div>
  )
}

export default Blog