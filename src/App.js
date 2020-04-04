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
    data: []
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
      <div style={{textAlign: "center"}}>
        <h1>Flatten the Curve</h1>
        <CitiesDropdown city={city} handleChange={setCity}/>
        <HighchartsReact
          highcharts={Highcharts}
          options={infections}
        />
      </div>

      <div style={{padding: 15}}>
        <p>Info</p>
        <ul>
          <li>Motivation: wanted to see graphs per each region of Los Angeles but could not find one online</li>
          <li>Information gathered from <a href="http://www.publichealth.lacounty.gov/media/Coronavirus/">LA County Health</a></li>
          <li>Will be updated daily</li>
          <li>Contributions welcome <a href="https://github.com/johndevedu/flatten-the-curve" target="_blank">here</a></li>
          <li>Comments welcome <a href="https://github.com/johndevedu/flatten-the-curve/issues" target="_blank">here</a></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
