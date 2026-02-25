import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Login'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const formHandler = async(e) => {
    e.preventDefault()

    try{
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)

      setUser(user)
      setPassword('')
      setUsername('')
    }catch{
      if(timer) {
        clearTimeout(timer)
      }
      setMessage({text: 'wrong credentials', type: 'error'})
      setTimer(setTimeout(() => {
        setMessage(null)
      }, 3000))
    }
  }

  return (
    <div>
      {message && <Notification message={message} />}
      {!user && <LoginForm setUsername={setUsername} username={username} setPassword={setPassword} password={password} formHandler={formHandler} /> }

      {user &&
        <div> 
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )} 
        </div>
      }
    </div>
  )
}

export default App