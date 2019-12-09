import React from 'react'
import { connect } from 'react-redux'

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
      ? generateDiv(`You voted for "${props.notification}"`, style)
      : generateDiv('', null)
    )
  }

  return setNotification()
}

function mapStateToProps(state) {
  return {
    notification: state.notification,
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification