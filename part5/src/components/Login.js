import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import propTypes from 'prop-types'
import { useField } from '../hooks/index'

const Login = props => {
  const [user, setUser] = useState(null)
  const username = useField('')
  const password = useField('')

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
    props.setErrorProperties('', '')
    props.setToken('')
    window.localStorage.removeItem('loggedBlogAppUser')
    window.localStorage.removeItem('loggedBlogAppUserId')
    setUser(null)
  }

  async function handleLogin(event) {
    event.preventDefault()
    try {
      const loggedUser = (await loginService.login({ username: username.value, password: password.value })).data
      setLoggedUser(loggedUser)
      props.setErrorProperties('', '')
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
      window.localStorage.setItem('loggedBlogAppUserId', JSON.stringify(loggedUser.id))
      username.reInit('')
      password.reInit('')
    } catch(error) {
      props.setErrorProperties('error', error.response.data.error)
    }
  }

  function loggedOut() {
    return (
      <form id="login-form" onSubmit={handleLogin}>
        <h2>Login to app</h2>
        <div id="username-input">
          {`username `}
          <input type="text" value={username.value} required name="Username"
            onChange={event => username.onChange(event)}></input>
        </div>
        <div id="password-input">
          {`password `}
          <input type="password" value={password.value} required name="Password"
          onChange={event => password.onChange(event)}></input>
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