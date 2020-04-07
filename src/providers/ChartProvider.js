import React, { useReducer } from 'react'
import { getCookie, saveCookie } from '../helpers/cookie.helper';

export const ChartContext = React.createContext([]);
const defaultCities = {cities: ['Koreatown']};

const reducer = (state, action) => {
  switch (action.type) {
    case 'addChart':
      return [...state, defaultCities]
    case 'deleteChart':
      return state.filter((_item, index) => {
        return index !== action.row
      })
    case 'setSelectedCities':
      return state.map((item, index) => {
        if (index !== action.row) {
          return item
        }

        return {
          ...item,
          cities: action.data
        }
      })
    case 'clearCities':
      return state.map((item, index) => {
        if (index !== action.row) {
          return item
        }

        return {
          ...item,
          cities: []
        }
      })
    case 'rememberCharts':
      saveCookie('energycity', JSON.stringify(state))
      return state;
    default:
      return state;
  }
}

const savedData = getCookie('energycity')
let parsedData
try {
  const parsed = JSON.parse(savedData)
  if (savedData[0] === '[') {
    parsedData = parsed;
  }
} catch (error) {
  
}

export const ChartProvider =({ children }) => {
  const initialData = parsedData || [defaultCities];
  const [state, dispatch] = useReducer(reducer, initialData)
  const contextValue = {state, dispatch}
  
  return (
    <ChartContext.Provider value={contextValue}>
      {children}
    </ChartContext.Provider>
  )
}