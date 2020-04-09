import * as countyService from '../services/county.service'
import moment from 'moment'

export const getCountiesAndMeta = async (city) => {
  const results = await countyService.getCounties();

  const seriesCollection = results.counties.map(county => {
    const response = {
      name: county.county,
      data: county.data,
    };

    if (!['Riverside', 'Los Angeles', 'Orange'].includes(response.name)) {
      response.visible = false;
    }
    return response
  })

  const dates = results.meta.dates.map(date => moment(date).format('M/D'))

  return {
    seriesCollection,
    dates
  };
}
