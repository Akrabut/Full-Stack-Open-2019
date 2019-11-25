import { useState } from 'react'

export const useField = (init) => {
  const [value, setValue] = useState(init)

  const reInit = (val) => {
    setValue(val)
  }

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    value,
    onChange,
    reInit,
  }
}