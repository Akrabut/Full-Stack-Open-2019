import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import propTypes from 'prop-types'

const Login = props => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function setLoggedUser(userParam) {
    setUser(userParam)
    props.setToken(`bearer ${userParam.token}`)
  }

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    if (!storedUser) return
    setLoggedUser(storedUser)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleLogout(event) {
    event.preventDefault()
    props.setToken('')
    window.localStorage.removeItem('loggedBlogAppUser')
    window.localStorage.removeItem('loggedBlogAppUserId')
    setUser(null)
  }

  async function handleLogin(event) {
    event.preventDefault()
    console.log(username, password);
    try {
      const loggedUser = (await loginService.login({ username, password })).data
      setLoggedUser(loggedUser)
      props.setErrorProperties('', '')
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
      window.localStorage.setItem('loggedBlogAppUserId', JSON.stringify(loggedUser.id))
      setUsername('')
      setPassword('')
    } catch(error) {
      props.setErrorProperties('error', error.response.data.error)
    }
  }

  function loggedOut() {
    props.setErrorProperties('', '')
    return (
      <form id="login-form" onSubmit={handleLogin}>
        <h2>Login to app</h2>
        <div id="username-input">
          {`username `}
          <input type="text" value={username} required name="Username"
            onChange={event => setUsername(event.target.value)}></input>
        </div>
        <div id="password-input">
          {`password `}
          <input type="password" value={password} required name="Password"
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

Login.propTypes = {
  setToken: propTypes.func.isRequired,
  setErrorProperties: propTypes.func.isRequired,
}

export default Login