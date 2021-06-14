import axios from 'axios'
import { useState } from 'react'

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
  return (
    <>
      <button onClick={addActer}>добавить актера</button>
      {acters.map((acter: Acters) => (
        <div key={acter.number} className="flex">
          <label htmlFor={`role ${acter.number}`}>
            <input
              type="text"
              id={`role ${acter.number}`}
              onChange={(e) => changeInfo('role', e.target.value, acter.number)}
            />
          </label>
          <label htmlFor={`name ${acter.number}`}>
            <input
              type="text"
              id={`name ${acter.number}`}
              onChange={(e) => changeInfo('name', e.target.value, acter.number)}
            />
          </label>
          <label htmlFor={`picture ${acter.number}`}>
            <input
              type="file"
              id={`picture ${acter.number}`}
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
    </>
  )
}

export default CreateActers
