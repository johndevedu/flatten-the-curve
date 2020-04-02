import { getCity as getCityService} from '../services/api.service'

export const getCity = async (city) => {
  const results = await getCityService(city);

  const infections = results.map(item => item.infections)
  return infections;
}