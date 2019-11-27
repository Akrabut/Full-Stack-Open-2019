import React from 'react'

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  function generateDiv(notif, style) {
    return (
      <div id="notification" style={style}>
        {notif}
      </div>
    )
  }

  function setNotification() {
    return (props.notification
      ? generateDiv(props.notification, style)
      : generateDiv('', null)
    )
  }

  return setNotification()
}

export default Notification