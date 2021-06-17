import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createfilm, getCategories, getGenres } from '../../../../http/filmApi'
import CreateActers from './createActer'
import DropDown from './dropDown'
import CreateTags from './CreateTags'
import { useInput } from '../../../../hooks/useInput'
import './_style.scss'
import AnimatedTextField from './AnimatedTextField'
import AddFileButton from './addFileButton'
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

  const changeAuthorName = (e: any) => {
    setAuthor({
      ...author,
      name: e.target.value,
    })
  }

  const changeAuthorPicture = (file: File) => {
    setAuthor({
      ...author,
      picture: file,
    })
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
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <AnimatedTextField
              text="Название фильма"
              hook={{ ...filmName }}
              id={'1'}
              type={'input'}
            />
            <AnimatedTextField
              text="Язык фильма"
              hook={{ ...language }}
              id={'2'}
              type={'input'}
            />
            <AnimatedTextField
              text="Дата премьеры"
              hook={{ ...publishDate }}
              id={'3'}
              type={'input'}
            />
          </div>
          <div style={{ flex: 1, marginLeft: 20 }}>
            <AnimatedTextField
              text="Описание фильма"
              hook={{ value: description, onChange: setDescription }}
              id={'4'}
              type="textarea"
            />
          </div>
        </div>
        <div className="flex admin__add-files-block">
          <AddFileButton
            id="poster"
            placeholder="Постер фильма"
            name="poster"
            accept=".png,.jpeg,.jpg,.webp"
            addFileFunc={setPoster}
            showFileFunc={showFile}
          />
          <AddFileButton
            id="film"
            name="film"
            placeholder="Film"
            accept=".mp4, .webm, .avi, .mkv"
            addFileFunc={setFilm}
            showFileFunc={showFile}
          />
        </div>
        <h2>Режиссер фильма</h2>
        <div className="flex" style={{ alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <AnimatedTextField
              id="authorName"
              type="input"
              text="Имя автора"
              hook={{ value: author.name, onChange: changeAuthorName }}
              name="name"
            />
          </div>

          <div style={{ marginLeft: '20px', display: 'flex', flex: 1 }}>
            <AddFileButton
              id="authorPicture"
              placeholder="Фото режиссера"
              accept=".png,.jpeg,.jpg,.webp"
              addFileFunc={changeAuthorPicture}
              showFileFunc={showFile}
              name="picture"
            />
          </div>
        </div>
        <input type="text" id="time" {...time} />
        <div className="flex" style={{margin:'0 -10px'}}>
          <DropDown
            items={categorys}
            keyWord={'Категорию'}
            chooseItem={chooseItem}
            setState={setChoosedCategorys}
            state={choosedCategorys}
          />
          <DropDown
            items={genres}
            keyWord={'Жанр'}
            chooseItem={chooseItem}
            setState={setChoosedGenres}
            state={choosedGenres}
          />
        </div>

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
