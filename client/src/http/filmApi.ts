import axios from 'axios'

const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const createfilm = async (formData: FormData | any) => {
  const { data } = await axios.post(`${URL}/films`, formData)
  return data
}

export const getGenres = async () => {
  const { data } = await axios.get(`${URL}/films/genre`)
  return data
}

export const createGenre = async (genre: string) => {
  const { data } = await axios.post(`${URL}/films/genre`, genre)
  return data
}

export const getCategories = async () => {
  const { data } = await axios.get(`${URL}/films/category`)
  return data
}

export const createCategory = async (category: string) => {
  const { data } = await axios.post(`${URL}/films/category`, category)
  return data
}

export const createActer = async (formData: FormData | any) => {
  const { data } = await axios.post(`${URL}/films/acters`, formData)
  return data
}
