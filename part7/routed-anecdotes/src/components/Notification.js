import React, { useState, useEffect } from 'react'

const Notification = ({ notif, setNotif }) => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    console.log(notif);
    setMessage(notif)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  function toDisplay() {
    if (!notif) return null
    setTimeout(() => {
      setNotif('')
      setMessage('')
    }, 6000)
    return (<div style={style}>
      {message}
    </div>)
  }

  return toDisplay()
}

export default Notification