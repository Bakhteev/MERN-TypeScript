import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useInput } from '../hooks/useInput'

interface Acters {
  role: string
  name: string
  picture: File
  number: string | number
}

interface Author {
  name: string
  picture: File
}

export const AdminTop: React.FC = () => {
  const [poster, setPoster] = useState<File | null>(null)
  const [film, setFilm] = useState<File | null>(null)
  const [author, setAuthor] = useState({})
  const [acters, setActers] = useState<any>([])
  const [actersId, setActersId] = useState<any>([])
  const [data, setData] = useState(null)

  const filmName = useInput('')

  console.log(author)

  const changeInfo = (
    key: string,
    value: string | File | null,
    number: number | string
  ) => {
    setActers(
      acters.map((acter: Acters) =>
        acter.number === number ? { ...acter, [key]: value } : acter
      )
    )
  }

  const changeAuthor = (key: string, value: any) => {
    setAuthor({ ...author, [key]: value })
  }

  const addActer = () => {
    setActers([
      ...acters,
      { role: '', name: '', picture: '', number: Date.now() },
    ])
  }

  const postActer = async (number: number | string) => {
    const acter = acters.filter((item: Acters) => item.number === number)

    console.log(acter)

    const { role, picture, name } = acter[0]

    console.log(role, picture, name)

    const formData = new FormData()

    formData.append('name', name)
    formData.append('role', role)
    formData.append('picture', picture)

    console.log(formData)

    const { data } = await axios.post(
      'http://localhost:5000/films/acters',
      formData
    )
    console.log(data)
    setActersId((prev: any) => [...prev, data._id])
  }

  console.log(actersId)

  const postData = async () => {
    const formData = new FormData()
    formData.append('name', 'Venom 3')
    formData.append('language', 'RU')
    formData.append('desription', 'Фильм о Venom')
    formData.append('publish_date', '10-04-2020')
    formData.append('authorParam', JSON.stringify(author))
    formData.append('cast', JSON.stringify(acters))
    formData.append('price', '200')
    formData.append('tags', '["#Venom", "#Commics"]')
    formData.append('category', '6084282640df7432fc7a6914')
    formData.append('genre', '60853bf1aabaef1c80146155')
    formData.append('time', '160 мин')
    formData.append('poster', !poster ? '' : poster)
    formData.append('film', !film ? '' : film)

    const fetchedFilm = await axios.post(
      'http://localhost:5000/films',
      formData
    )
    console.log(fetchedFilm)
  }

  return (
    <div
      className="container"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Создание фильма</h1>
      <label htmlFor="">
        <input type="text" {...filmName} placeholder="название фильма" />
      </label>
      <label htmlFor="">
        <textarea name="" id="" cols={30} rows={10} placeholder="Описание фильма"></textarea>
      </label>
      
      <label htmlFor="poster" style={{ color: 'black' }}>
        Poster
        <input
          type="file"
          id="poster"
          placeholder="Poster"
          onChange={(e) =>
            setPoster(!e.target.files ? null : e.target.files[0])
          }
        />
      </label>
      <label htmlFor="film" style={{ color: 'black' }}>
        Film
        <input
          type="file"
          id="film"
          placeholder="Film"
          onChange={(e) => setFilm(!e.target.files ? null : e.target.files[0])}
        />
      </label>
      <h2>Режиссер фильма</h2>
      <label htmlFor="authorName">
        <input
          type="text"
          id="authorName"
          placeholder="Author name"
          onChange={(e) => changeAuthor('name', e.target.value)}
        />
      </label>
      <label
        htmlFor="authorPicture"
        style={{ display: 'flex', color: 'black' }}
      >
        author Picture
        <input
          type="file"
          id="authorPicture"
          onChange={(e) =>
            changeAuthor('picture', !e.target.files ? '' : e.target.files[0])
          }
        />
      </label>
      <button onClick={addActer}>добавить актера</button>
      {acters.map((acter: Acters) => (
        <div key={acter.number} className="flex">
          <label htmlFor="role">
            <input
              type="text"
              id="role"
              onChange={(e) => changeInfo('role', e.target.value, acter.number)}
            />
          </label>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              onChange={(e) => changeInfo('name', e.target.value, acter.number)}
            />
          </label>
          <label htmlFor="picture">
            <input
              type="file"
              id="picture"
              onChange={(e) =>
                changeInfo(
                  'picture',
                  e.target.files === null ? null : e.target.files[0],
                  acter.number
                )
              }
            />
          </label>
          <button onClick={() => postActer(acter.number)}>Загрузить</button>
        </div>
      ))}
      <button onClick={postData}>отправить</button>
    </div>
  )
}

// type FileUploadProps = {
//   setFile: Function
// }

// export const FileUpload: React.FC<FileUploadProps> = ({ setFile }) => {
//   const uploadfile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFile(e.target.files)
//   }
//   return (
//     <>
//       <input type="file" accept={'image/*, video/*'} onChange={uploadfile} />
//     </>
//   )
// }
