import React, { useEffect, useRef, useState } from 'react'

interface AnimatedInputProps {
  text: string
  hook: any
  id: string
  type: string
  name?: string
}

const AnimatedTextField: React.FC<AnimatedInputProps> = ({
  text,
  hook,
  id,
  type,
  name,
}) => {
  const [active, setActive] = useState<boolean>(false)
  const handleChange = (e: any) => {
    setActive(e.target.value !== '' ? true : false)
  }

  if (type === 'input') {
    return (
      <label
        htmlFor={id}
        className={`admin__label label ${active ? 'active' : ''}`}
      >
        <span className={`label__placeholder ${active ? 'active' : ''}`}>
          {text}
        </span>
        <input
          className={`label__textfield ${active ? 'active' : ''}`}
          type="text"
          id={id}
          value={hook.value}
          name={name}
          onChange={(e) => {
            handleChange(e)
            hook.onChange(e)
          }}
        />
      </label>
    )
  } else {
    return (
      <label
        htmlFor={id}
        className={`admin__label label ${active ? 'active' : ''}`}
      >
        <span className={`label__placeholder ${active ? 'active' : ''}`}>
          {text}
        </span>
        <textarea
          className={`label__textfield label__textarea ${
            active ? 'active' : ''
          }`}
          id={id}
          rows={10}
          value={hook.value}
          onChange={(e) => {
            handleChange(e)
            hook.onChange(e.target.value)
          }}
        />
      </label>
    )
  }
}

export default AnimatedTextField
