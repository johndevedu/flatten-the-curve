import axios from 'axios'

export const getCities = async () => {
  const response = await axios.get('http://localhost:7001/api/cities')

  return response.data;
}

export const getCity = async (city) => {
  const response = await axios.get(`http://localhost:7001/api/cities/${city}`)

  return response.data;
}