import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useInput } from '../../hooks/useInput'
import { createfilm, getCategories, getGenres } from '../../http/filmApi'
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
  picture: File | any
}

export const AdminPage: React.FC = () => {
  const [poster, setPoster] = useState<File | null>(null)
  const [film, setFilm] = useState<File | null>(null)
  const [author, setAuthor] = useState<Author>({ name: '', picture: [] })
  const [actersId, setActersId] = useState<any>([])
  const [categorys, setCategorys] = useState<any>([])
  const [choosedCategorys, setChoosedCategorys] = useState<any>([])
  const [genres, setGenres] = useState<any>([])
  const [choosedGenres, setChoosedGenres] = useState<any>([])
  const [description, setDescription] = useState<string>('')
  const [tags, setTags] = useState<any>([])

  const filmName = useInput('')
  const price = useInput('')
  const time = useInput('')
  const language = useInput('')
  const publishDate = useInput('')

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
    const { picture } = author
    const formData = new FormData()
    formData.append('name', filmName.value)
    formData.append('language', language.value)
    formData.append('description', description)
    formData.append('publish_date', publishDate.value)
    formData.append('authorName', author.name)
    formData.append('authorPicture', picture)
    formData.append('cast', JSON.stringify(actersId))
    formData.append('price', price.value)
    formData.append('tags', JSON.stringify(tags))
    formData.append('category', JSON.stringify(choosedCategorys))
    formData.append('genre', JSON.stringify(choosedGenres))
    formData.append('time', time.value)
    formData.append('poster', !poster ? '' : poster)
    formData.append('film', !film ? '' : film)
    const fetchedFilm = await createfilm(formData)
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
      <input type="text" {...filmName} placeholder="Название фильма" />
      <input type="text" {...language} placeholder="Язык фильма" />
      <input type="text" {...publishDate} placeholder="Дата премьеры" />
      <textarea
        rows={10}
        placeholder="Описание фильма"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
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
          placeholder="Имя автора"
          onChange={(e) => changeAuthor('name', e.target.value)}
        />
      </label>
      <label
        htmlFor="authorPicture"
        style={{ display: 'flex', color: 'black' }}
      >
        Фото режиссера
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
      <CreateTags tags={tags} setTags={setTags} />
      <input type="number" id="price" {...price} placeholder="введите цену" />
      <button onClick={postData}>отправить</button>
    </div>
  )
}
