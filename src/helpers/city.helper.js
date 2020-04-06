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


  const {dateRange, longestSeries} = parseDate(results)
  const seriesCollection = parseSeries(results, longestSeries)
  return {
    dates: dateRange,
    seriesCollection
  };
}

const parseDate = (seriesCollection) => {
  let longestSeries = [];
  seriesCollection.forEach(series => series.length > longestSeries.length && (longestSeries = series))
  
  const dateRange = longestSeries.map(item => moment(item.date).format('M/D'))
  return {
    dateRange,
    longestSeries
  };
}

const parseSeries = (originalSeriesCollection, dateRange) => {
  const parsedSeriesCollection = []
  originalSeriesCollection.forEach(series => {
    const parsedSeries = []

    let seriesIndex = 0;
    for (let i = 0; i < dateRange.length ; i ++){
      const seriesDate = series[seriesIndex].date;
      const infections = series[seriesIndex].infections;

      if (seriesIndex === 0 && (seriesDate !== dateRange[i].date)){
        parsedSeries.push(0)
        continue
      }
      if (seriesIndex > 0) {
        parsedSeries.push(infections)
      }
      else if (seriesDate === dateRange[i].date) {
        parsedSeries.push(infections)
      } 
      
      seriesIndex++;
    }

    const city = series[series.length - 1].city
    parsedSeriesCollection.push({
      name: city,
      data: parsedSeries
    })
  })
  return parsedSeriesCollection
}