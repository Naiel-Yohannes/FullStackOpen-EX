import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Login'
import loginService from './services/login'
import Notification from './components/Notification'
import Create from './components/Create'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [timer, setTimer] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const savedUser = window.localStorage.getItem('savedUser')
    if(savedUser){
      const loggedInUser = JSON.parse(savedUser)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const formHandler = async(e) => {
    e.preventDefault()

    if(password.trim() && username.trim()){
      try{
        const user = await loginService.login({ username, password })
        window.localStorage.setItem('savedUser', JSON.stringify(user))
        blogService.setToken(user.token)

        setUser(user)
        setPassword('')
        setUsername('')
      }catch{
        if(timer) {
          clearTimeout(timer)
        }
        setMessage({text: 'wrong username or password', type: 'error'})
        setUsername('')
        setPassword('')
        setTimer(setTimeout(() => {
          setMessage(null)
        }, 3000))
      }
    }else{
      setMessage({text: 'ensert both username and password', type: 'error'})
      setTimer(setTimeout(() => {
        setMessage(null)
      }, 3000))
    }
  }

  const logout = () =>{
    window.localStorage.removeItem('savedUser')
    setUser(null)
    blogService.setToken(null)
  }

  const createForm = async(e) => {
    e.preventDefault()

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
      setMessage({text: `a new blog ${title} by ${author} added`, type: 'success'})
      setTimer(setTimeout(() => {
        setMessage(null)
      }, 3000))
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to create blog'
      if(timer){
        clearTimeout(timer)
      }
      setMessage({text: errorMessage, type: 'error'})
    }
  }

  return (
    <div>
      {message && <Notification message={message} />}
      {!user && <LoginForm setUsername={setUsername} username={username} setPassword={setPassword} password={password} formHandler={formHandler} /> }

      {user &&
        <div> 
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={logout}>logout</button></p>
          <Create createForm={createForm} title={title} setTitle={e => setTitle(e.target.value)} author={author} setAuthor={e => setAuthor(e.target.value)} url={url} setUrl={e => setUrl(e.target.value)} />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )} 
        </div>
      }
    </div>
  )
}

export default App