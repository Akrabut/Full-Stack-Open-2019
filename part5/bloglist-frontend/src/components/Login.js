import React, { useState } from 'react'
import loginService from '../services/login'

const Login = props => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(event) {
    event.preventDefault()
    console.log(username, password);
    try {
      setUser((await loginService.login({ username, password })).data)
      props.setLogged(!props.logged)
    } catch(error) { console.log(error); }
    setUsername('')
    setPassword('')
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
          <input type="text" value={password} name="Password"
          onChange={event => setPassword(event.target.value)}></input>
        </div>
        <button type="submit">Log in</button>
      </form>
    )
  }

  function loggedIn() {
    console.log(user);
    return (
      <div>
        {user.name} logged in
      </div>
    )
  }

  return (
    user ? loggedIn() : loggedOut()
  )

}

export default Login