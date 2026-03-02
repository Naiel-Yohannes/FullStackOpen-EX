import blogService from '../services/blogs'
import { useState } from 'react'

const Create = ({ blogs, setBlogs, timer, setTimer, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createForm = async(e) => {
    e.preventDefault()

    if(title.trim() && author.trim()){
      try {
        const newBlog = {
          title,
          author,
          url
        }

        const created = await blogService.create(newBlog)
        setBlogs(blogs.concat(created))

        setTitle('')
        setAuthor('')
        setUrl('')
        if(timer){
          clearTimeout(timer)
        }
        setMessage({ text: `a new blog ${title} by ${author} added`, type: 'success' })
        setTimer(setTimeout(() => {
          setMessage(null)
        }, 3000))
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Failed to create blog'
        if(timer){
          clearTimeout(timer)
        }
        setMessage({ text: errorMessage, type: 'error' })
      }
    }else{
      window.alert('ensert both author name and title')
      setAuthor('')
      setTitle('')
    }
  }

  return(
    <form onSubmit={createForm}>
      <h1>Create new</h1>
      <label>
                title:<input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
                author:<input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </label><label>
                url:<input type="text" value={url} onChange={e => setUrl(e.target.value)} />
      </label>
      <button type="submit">create</button>
    </form>
  )
}

export default Create