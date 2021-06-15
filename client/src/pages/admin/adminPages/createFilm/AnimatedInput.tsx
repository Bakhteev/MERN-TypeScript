import React, { useState } from 'react'

interface AnimatedInputProps {
  text: string
  hook: any
  id: string
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({ text, hook, id }) => {
  const [active, setActive] = useState<boolean>(false)

  const handleChange = (e: any) => {
    setActive(e.target.value !== '' ? true : false)
  }

  return (
    <label
      htmlFor={id}
      className={`admin__label label ${active ? 'active' : ''}`}
    >
      <span className="label__placeholder">{text}</span>
      <input
        className={`label__input ${active ? 'active' : ''}`}
        type="text"
        id={id}
        value={hook.value}
        onChange={(e) => {
          handleChange(e)
          hook.onChange(e)
        }}
      />
    </label>
  )
}

export default AnimatedInput
