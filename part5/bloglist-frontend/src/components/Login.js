import React, { useState, useEffect } from 'react'
import loginService from '../services/login'

const Login = props => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    if (!storedUser) return
    setUser(storedUser)
    props.setToken(`bearer ${storedUser.token}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleLogout(event) {
    event.preventDefault()
    props.setToken('')
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  async function handleLogin(event) {
    event.preventDefault()
    console.log(username, password);
    try {
      const user = (await loginService.login({ username, password })).data
      setUser(user)
      props.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch(error) { console.log(error); }
  }

  function loggedOut() {
    return (
      <form id="login-form" onSubmit={handleLogin}>
        <h2>Login to app</h2>
        <div id="username-input">
          {`username `}
          <input type="text" value={username} name="Username"
            onChange={event => setUsername(event.target.value)}></input>
        </div>
        <div id="password-input">
          {`password `}
          <input type="password" value={password} name="Password"
          onChange={event => setPassword(event.target.value)}></input>
        </div>
        <button type="submit">Log in</button>
      </form>
    )
  }

  function loggedIn() {
    return (
      <div>
        {`${user.name} logged in `}
        <button type="submit" onClick={handleLogout}>log out</button>
      </div>
    )
  }

  return (
    <div id="login-form">
      {user ? loggedIn() : loggedOut()}
    </div>
  )

}

export default Login