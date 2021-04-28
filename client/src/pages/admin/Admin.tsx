import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useInput } from '../../hooks/useInput'
import { getCategories, getGenres } from '../../http/filmApi'
import CreateActers from './createActer'
import DropDown from './dropDown'
import CreateTags from './CreateTags'

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

  const [categorys, setCategorys] = useState<any>([])
  const [choosedCategorys, setChoosedCategorys] = useState<any>([])

  const [genres, setGenres] = useState<any>([])
  const [choosedGenres, setChoosedGenres] = useState<any>([])

  const filmName = useInput('')
  const price = useInput('')
  const time = useInput('')

  console.log(choosedGenres)

  useEffect(() => {
    getCategories().then((data) => setCategorys(data))
    getGenres().then((data) => setGenres(data))
  }, [])

  const changeAuthor = (key: string, value: any) => {
    setAuthor({ ...author, [key]: value })
  }

  const chooseItem = (item: any, setState: Function) => {
    setState((prev: any) => {
      const oldItem = prev.filter((i: any) => i === item)
      if (oldItem.length > 0) {
        return prev
      }
      return [...prev, item]
    })
  }

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
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'black',
      }}
    >
      <h1>Создание фильма</h1>
      <label htmlFor="">
        <input type="text" {...filmName} placeholder="название фильма" />
      </label>
      <label htmlFor="">
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          placeholder="Описание фильма"
        ></textarea>
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
      <input type="text" id="time" {...time} />
      <DropDown
        items={categorys}
        keyWord={'Категорию'}
        chooseItem={chooseItem}
        setState={setChoosedCategorys}
      />
      <DropDown
        items={genres}
        keyWord={'Жанр'}
        chooseItem={chooseItem}
        setState={setChoosedGenres}
      />
      <CreateActers setActersId={setActersId} />
      <CreateTags />
      <input type="text" id="price" {...price} placeholder="введите цену" />
      <button onClick={postData}>отправить</button>
    </div>
  )
}
