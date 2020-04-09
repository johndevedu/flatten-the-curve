import axios from 'axios'

const apiBase = process.env.REACT_APP_API_BASE

export const getCities = async () => {
  const response = await axios.get(`${apiBase}/cities`)

  return response.data;
}

export const getCity = async (city) => {
  const response = await axios.get(`${apiBase}/cities/${encodeURIComponent(city)}`)

  return response.data;
}

export const getCityMultiple = async (cityList) => {
  const response = await axios.post(`${apiBase}/cities/multiple`, {list: cityList})

  return response.data;
}