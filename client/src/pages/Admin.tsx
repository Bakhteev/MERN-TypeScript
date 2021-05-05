import React, { useState } from 'react'
import { useInput } from '../hooks/useInput'

export const AdminTop: React.FC = () => {
  const [file, setFile] = useState(null)
  const [author, setAuthor] = useState(null)
  const filmName = useInput('')
  // const authorName = useInput('')

  console.log(file)

  return (
    <div className="container">
      <h1>Создание фильма</h1>
      <input type="text" {...filmName} placeholder="название фильма" />
      <h2>Автор фильма</h2>
      <div className="flex">
        <input type="text" placeholder="Имя режиссера" name="authorName" />
        <label>
          <FileUpload setFile={setAuthor} />
        </label>
      </div>
    </div>
  )
}

type FileUploadProps = {
  setFile: Function
}

export const FileUpload: React.FC<FileUploadProps> = ({ setFile }) => {
  const uploadfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files)
  }
  return (
    <>
      <input type="file" accept={'image/*, videp/*'} onChange={uploadfile} />
    </>
  )
}
