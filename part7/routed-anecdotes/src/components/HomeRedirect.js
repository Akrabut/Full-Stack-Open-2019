import React from 'react'
import {
  BrowserRouter as Router, Route, Link,
} from 'react-router-dom'
import Home from './Home'

const HomeRedirect = () => {
  return (
    <Router>
        <div>
          <Link to='/'>home</Link>
        </div>
        <Route exact path='/' render={() => <Home/>}></Route>
    </Router>
  )
}

export default HomeRedirect