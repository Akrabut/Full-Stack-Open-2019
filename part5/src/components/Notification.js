import React from 'react'

const Notification = props => {
  function setStyle() {
    return (
      {
        color: props.type === 'error' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
    )
  }
  return (
    <div id="notification" style={setStyle()}>
      {props.message}
    </div>
  )
}

export default Notification