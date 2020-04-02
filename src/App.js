import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getCities } from './services/api.service'
import { getCity } from './helpers/city.helper';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';

const city = 'koreatown'
const options = {
  title: {
    text: city
  },
  series: [{
    data: [1, 2, 3]
  }]
}


function App() {
  const [cities, setCities] = useState([])
  const [koreatown, setKoreatown] = useState(options)

  useEffect(() => {
    const getter = async () => {
      const cities = await getCities();
      setCities(cities);
      const koreatown = await getCity(city);
      const newOptions = {
        ...options,
        series: {
          ...options.series,
          data: koreatown
        }
      }
      setKoreatown(newOptions);
    }

    getter()
  }, [setCities, setKoreatown])

  return (
    <div className="App">
  <HighchartsReact
    highcharts={Highcharts}
    options={koreatown}
  />
    </div>
  );
}

export default App;
