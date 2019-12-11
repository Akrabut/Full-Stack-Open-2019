import React, { useState } from 'react'
import {
  BrowserRouter as Router, Route, Link,
} from 'react-router-dom'
import CreateNew from './CreateNew'
import About from './About'
import AnecdoteList from './AnecdoteList'

const Menu = ({ setNotif }) => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const padding = {
    paddingRight: 5
  }

  return (
    <Router>
        <div>
          <Link to='/anecdotes' style={padding}>anecdotes</Link>
          <Link to='/create_new' style={padding}>create new</Link>
          <Link to='/about' style={padding}>about</Link>
        </div>
        <Route exact path='/anecdotes' render={() => <AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes}/>}></Route>
        <Route path='/about' render={() => <About/>}></Route>
        <Route path='/create_new' render={() => <CreateNew anecdotes={anecdotes} setAnecdotes={setAnecdotes} setNotif={setNotif}/>}></Route>
    </Router>
  )
}

export default Menu