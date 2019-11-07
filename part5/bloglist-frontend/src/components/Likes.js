import React, { useState } from 'react'
import blogService from '../services/blogs'

const Likes = props => {
  const [likes, setLikes] = useState(props.blog.likes)

  async function handleLike() {
    try {
      await blogService.update(props.blog)
      setLikes(likes + 1)
    } catch(error) { console.log(error) }
  }

  return (
    <div id="likes">
      {`likes - ${likes} `}
      <button onClick={handleLike}>like</button>
    </div>
  )
}

export { Likes, blogService }