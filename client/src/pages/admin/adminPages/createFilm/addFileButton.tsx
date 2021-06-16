import React, { useRef } from 'react'

interface AddFileButtonProps {
  id: string
  name: string
  accept: string
  placeholder: string
  addFileFunc: Function
  showFileFunc: Function
}

const AddFileButton: React.FC<AddFileButtonProps> = ({
  id,
  name,
  placeholder,
  accept,
  addFileFunc,
  showFileFunc,
}) => {
  const inputEl = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputEl.current?.click()
  }

  console.log(name)

  return (
    <label htmlFor={id} className="flex addfile">
      <span className="addfile__placeholder">{placeholder}</span>
      <input
        style={{ display: 'none' }}
        ref={inputEl}
        type="file"
        name={name}
        accept={accept}
        id={id}
        onChange={(e) => {
          addFileFunc(!e.target.files ? null : e.target.files[0])
          showFileFunc(e)
        }}
      />
      <button onClick={handleClick} className="addfile__btn">
        Загрузить
      </button>
    </label>
  )
}

export default AddFileButton
