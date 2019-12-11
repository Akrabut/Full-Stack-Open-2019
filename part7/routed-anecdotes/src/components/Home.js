import React, { useState } from 'react'
import Footer from './Footer'
import Menu from './Menu'
import Notification from './Notification'

const Home = () => {
  const [notification, setNotification] = useState('')

  return (
    <div>
      <Menu setNotif={setNotification}/>
      <Notification notif={notification} setNotif={setNotification} />
      <Footer/>
    </div>
  )
}

export default Home