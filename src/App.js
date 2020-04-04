import React, { useEffect, useState } from 'react';
import './App.css';
import { getCity } from './helpers/city.helper';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import CitiesDropdown from './CitiesDropdown';

const defaultCity = 'Koreatown'
const options = {
  chart: {
    type: 'column'
  },
  xAxis: {
    categories: [
    ],
    crosshair: true,
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Infections'
      },
  },
  title: {
    text: defaultCity
  },
  series: [{
    showInLegend: false,  
    name: 'Infections',
    data: [1, 2, 3]
  }],
  credits: {
    enabled: false
  }
}


function App() {
  const [infections, setInfections] = useState(options)
  const [city, setCity] = useState(defaultCity)

  useEffect(() => {
    const getter = async () => {
      const {infections, dates} = await getCity(city);
      const newOptions = {
        ...options,
        series: [{
          data: infections
        }],
        xAxis: {
          ...options.xAxis,
          categories: dates
        }, 
        title: {
          text: city
        }
      }
      setInfections(newOptions);
    }

    getter()
  }, [setInfections, city])

  return (
    <div className="App">
      <CitiesDropdown city={city} handleChange={setCity}/>
      <HighchartsReact
        highcharts={Highcharts}
        options={infections}
      />
    </div>
  );
}

export default App;
