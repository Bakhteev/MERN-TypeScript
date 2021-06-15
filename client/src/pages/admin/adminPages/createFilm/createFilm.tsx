import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createfilm, getCategories, getGenres } from '../../../../http/filmApi'
import CreateActers from './createActer'
import DropDown from './dropDown'
import CreateTags from './CreateTags'
import { useInput } from '../../../../hooks/useInput'
import './_style.scss'
import AnimatedInput from './AnimatedInput'
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

interface Previews {
  poster: string | any
  film: string | any
  actersPictures: [string] | [] | any
  authorPicture: string | any
}

export const CreateFilm: React.FC = () => {
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
  const [previews, setPreviews] = useState<Previews>({
    poster: '',
    film: '',
    actersPictures: [],
    authorPicture: '',
  })

  const filmName = useInput('')
  const price = useInput('')
  const time = useInput('')
  const language = useInput('')
  const publishDate = useInput('')

  const [filmOne, setFilmOne] = useState<any>()

  useEffect(() => {
    getCategories().then((data) => setCategorys(data))
    getGenres().then((data) => setGenres(data))
    axios
      .get(`${process.env.REACT_APP_API_URL}/films?id=60b62737c6e04e0015a76199`)
      .then((smt) => setFilmOne(smt.data))
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
    await createfilm(formData)
  }

  const showFile = (event: any) => {
    const reader = new FileReader()
    const name = event.target.name
    reader.onload = (e) => {
      setPreviews({
        ...previews,
        [name]: !e.target?.result ? '' : e.target?.result,
      })
    }
    reader.readAsDataURL(event.target.files[0])
  }

  return (
    <div
      className="container"
      style={{
        color: 'black',
      }}
    >
      <h1>Создание фильма</h1>
      <div className="col-6">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <AnimatedInput
            text="Название фильма"
            hook={{ ...filmName }}
            id={'1'}
          />
          <AnimatedInput text="Язык фильма" hook={{ ...language }} id={'2'} />
          <AnimatedInput
            text="Дата премьеры"
            hook={{ ...publishDate }}
            id={'3'}
          />
          <textarea
            style={{ resize: 'none' }}
            rows={10}
            placeholder="Описание фильма"
            value={description}
            className=""
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <label htmlFor="poster" style={{ color: 'black' }}>
          Poster
          <input
            type="file"
            id="poster"
            placeholder="Poster"
            name="poster"
            onChange={(e) => {
              setPoster(!e.target.files ? null : e.target.files[0])
              showFile(e)
            }}
          />
        </label>
        <label htmlFor="film" style={{ color: 'black' }}>
          Film
          <input
            type="file"
            id="film"
            name="film"
            placeholder="Film"
            onChange={(e) => {
              setFilm(!e.target.files ? null : e.target.files[0])
              showFile(e)
            }}
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
            name="authorPicture"
            onChange={(e) => {
              changeAuthor('picture', !e.target.files ? '' : e.target.files[0])
              showFile(e)
            }}
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

      {/* <div className="flex">
        <img src={previews.poster} alt="" width="40px" />
        <video src={previews.film} width="200px" controls></video>
        <img src={previews.authorPicture} alt="" width="40px" />
      </div> */}
    </div>
  )
}
