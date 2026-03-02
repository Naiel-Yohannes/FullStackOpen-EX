import { useState } from "react"

const Blog = ({ blog }) => {
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
          likes {blog.likes} <button>like</button> <br />
          {blog.author}
        </div>
      }
    </div>
  )
}

export default Blog