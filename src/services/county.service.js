import axios from 'axios'

const apiBase = `${process.env.REACT_APP_API_BASE}/counties`

export const getCounties = async () => {
  const response = await axios.get(`${apiBase}`)

  return response.data;
}
