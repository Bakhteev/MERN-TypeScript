import axios from 'axios'
import { useRef, useState } from 'react'

interface Acters {
  role: string
  name: string
  picture: File
  number: string | number
}

interface CreateActersProps {
  setActersId: Function
}

const CreateActers: React.FC<CreateActersProps> = ({ setActersId }) => {
  const [acters, setActers] = useState<any>([])
  const [active, setActive] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const inputEl = useRef<HTMLInputElement>(null)

  const addActer = () => {
    setActers([
      ...acters,
      { role: '', name: '', picture: '', number: Date.now() },
    ])
  }

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

  const postActer = async (number: number | string) => {
    setLoading(true)
    const acter = acters.filter((item: Acters) => item.number === number)
    const { role, picture, name } = acter[0]
    const formData = new FormData()
    formData.append('name', name)
    formData.append('role', role)
    formData.append('picture', picture)
    const { data } = await axios.post(
      'http://localhost:5000/films/acters',
      formData
    )
    setActersId((prev: any) => [...prev, data._id])
    setLoading(false)
  }

  const handleChange = (e: any) => {
    setActive(e.target.value !== '' ? true : false)
  }

  const handleClick = () => {
    inputEl.current?.click()
  }

  return (
    <>
      <button onClick={addActer}>добавить актера</button>
      {acters.map((acter: Acters) => (
        <div
          key={acter.number}
          className="flex"
          style={{ justifyContent: 'space-between' }}
        >
          <div className="flex" style={{ flex: '66.66%', margin: '0 -10px' }}>
            <label
              htmlFor={`role ${acter.number}`}
              className="createacters__label"
            >
              {/* <span
              className={`createacters__placeholder ${active ? 'active' : ''}`}
            >
              Роль актера
            </span> */}
              <input
                type="text"
                placeholder="Роль актера"
                className={`createacters__input ${active ? 'active' : ''}`}
                id={`role ${acter.number}`}
                onChange={(e) => {
                  handleChange(e)
                  changeInfo('role', e.target.value, acter.number)
                }}
              />
            </label>
            <label
              htmlFor={`name ${acter.number}`}
              className="createacters__label"
            >
              {/* <span
              className={`createacters__placeholder ${active ? 'active' : ''}`}
            >
              Имя актера
            </span> */}
              <input
                type="text"
                placeholder="Имя актера"
                className={`createacters__input ${active ? 'active' : ''}`}
                id={`name ${acter.number}`}
                onChange={(e) => {
                  handleChange(e)
                  changeInfo('name', e.target.value, acter.number)
                }}
              />
            </label>
          </div>
          <label htmlFor={`picture ${acter.number}`}>
            <input
              type="file"
              ref={inputEl}
              style={{ display: 'none' }}
              id={`picture ${acter.number}`}
              onChange={(e) =>
                changeInfo(
                  'picture',
                  e.target.files === null ? null : e.target.files[0],
                  acter.number
                )
              }
            />
            <button
              className="btn"
              onClick={handleClick}
              style={{ marginLeft: 10 }}
              disabled={loading}
            >
              Добавить фото
            </button>
          </label>

          <button
            className="btn btn--blue"
            onClick={() => postActer(acter.number)}
            style={{ marginLeft: 10 }}
            disabled={loading}
            // acters.filter((item: any) => item.number === acter.number)[0] ===
            //   acter.number
          >
            Загрузить
          </button>
          {loading ? <div className="loading"></div> : ''}
        </div>
      ))}
    </>
  )
}

export default CreateActers
