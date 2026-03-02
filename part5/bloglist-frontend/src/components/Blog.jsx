import { useState } from "react"
import blogService from '../services/blogs.js'

const Blog = ({ blogs, blog, setBlogs }) => {
  const [display, setDisplay] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDisplay = () => {
    setDisplay(!display)
  }

  const incrementLike = async(id) => {
    const selectedBlog = blogs.find(b => b.id === id)
    const updatedBlog = await blogService.update(id, {...selectedBlog, likes: selectedBlog.likes + 1})
    setBlogs(blogs.map(b => b.id === id ? updatedBlog : b))
  }

  return(
    <div style={blogStyle}>
      {!display && 
        <div>
          {blog.title} <button onClick={toggleDisplay}>view</button>
        </div>
      }
      {display && 
        <div>
          {blog.title} <button onClick={toggleDisplay}>hide</button><br />
          {blog.url} <br />
          likes {blog.likes} <button onClick={() => incrementLike(blog.id)}>like</button> <br />
          {blog.user?.username}
          
        </div>
      }
    </div>
  )
}

export default Blog