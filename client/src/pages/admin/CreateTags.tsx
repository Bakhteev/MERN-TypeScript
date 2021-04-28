import React, { ChangeEvent, useState } from 'react'

const CreateTags = () => {
  const [tags, setTags] = useState<any>([])
  const [timer, setTimer] = useState<any>()

  console.log(tags)

  const addTag = () => {
    setTags((prev: any) => [...prev, { name: '', number: Date.now() }])
  }

  const changeHandler = (
    key: string,
    number: number | string,
    value: string
  ) => {
    setTags(
      tags.map((tag: any) =>
        tag.number === number ? { ...tag, [key]: value } : tag
      )
    )
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button onClick={addTag}>добавить тэг</button>
      {tags.map((item: any) => (
        <input
          type="text"
          onChange={(e) => changeHandler('name', item.number, e.target.value)}
        />
      ))}
    </div>
  )
}

export default CreateTags
