import React from 'react'

const Notification = (props) => {

  const style = {
    color: props.color,
    background: 'lightgrey',
    fontSize: '20',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(!props.message) return ''
  return (
    <div style={style}>
      {props.message}
    </div>
  )
}

export default Notification