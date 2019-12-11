import React/*,  { useState } */ from 'react'
import Footer from './Footer'
import Menu from './Menu'

const Home = props => {
  // const [notification, setNotification] = useState('')

  return (
    <div>
      <Menu />
      <Footer />
    </div>
  )
}

export default Home