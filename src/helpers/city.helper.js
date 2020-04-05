import * as apiService from '../services/api.service'
import moment from 'moment'

export const getCity = async (city) => {
  const results = await apiService.getCity(city);

  const infections = []
  const dates = []
  results.forEach(item => {
    infections.push(item.infections);
    dates.push(moment(item.date).format('M/D'));
  })
  return {infections, dates};
}

export const getCityMultiple = async (cityList) => {
  const results = await apiService.getCityMultiple(cityList);

  if (results.length === 0) {
    return {
      dates: [],
      cities: []
    }
  }


  const dates = parseDate(results[0])
  const seriesCollection = parseSeries(results)
  return {
    dates,
    seriesCollection
  };
}

const parseDate = (series) => {
  const dates = series.map(item => moment(item.date).format('M/D'))
  return dates;
}

const parseSeries = (originalSeriesCollection) => {
  const parsedSeriesCollection = []
  originalSeriesCollection.forEach(series => {
    const parsedSeries = []

    series.forEach(data => parsedSeries.push(data.infections))

    const city = series[series.length - 1].city
    parsedSeriesCollection.push({
      name: city,
      data: parsedSeries
    })
  })
  return parsedSeriesCollection
}