import { getCity as getCityService} from '../services/api.service'
import moment from 'moment'

export const getCity = async (city) => {
  const results = await getCityService(city);

  const infections = []
  const dates = []
  results.forEach(item => {
    infections.push(item.infections);
    dates.push(moment(item.date).format('M/D'));
  })
  return {infections, dates};
}