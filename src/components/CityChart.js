import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import { getCityMultiple } from '../helpers/city.helper';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import CitiesDropdown from './CitiesDropdown';
import { ChartContext } from '../providers/ChartProvider';
import { Button } from '@material-ui/core';

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
      text: 'Cases'
    },
  },
  title: {
    text: ''
  },
  series: [{
    name: 'Cases',
    data: []
  }],
  credits: {
    enabled: false
  }
}


function CityChart({ row }) {
  const [highchartOptions, setHighchartOptions] = useState(options)
  const { state, dispatch } = useContext(ChartContext)
  const selectedCities = state[row].cities;

  useEffect(() => {
    const getter = async () => {
      const { seriesCollection, dates } = await getCityMultiple(selectedCities);
      mapAndSetChartOptions(seriesCollection, dates)
    }

    getter()
  }, [setHighchartOptions, selectedCities])

  const mapAndSetChartOptions = (seriesCollection = [], dates = []) => {
    const newOptions = {
      ...options,
      series: seriesCollection,
      xAxis: {
        ...options.xAxis,
        categories: dates
      }
    }
    setHighchartOptions(newOptions);
  }

  const onClearCities = () => {
    mapAndSetChartOptions()
    dispatch({
      type: 'clearCities',
      row
    })
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CitiesDropdown city={selectedCities} handleChange={cities => dispatch({
          type: 'setSelectedCities',
          data: cities,
          row
        })} />
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <span >
            <Button onClick={onClearCities} variant='outlined' style={{marginRight: '10px'}}>Clear cities</Button>
            {(row > 0) &&
              <Button color='secondary' onClick={() => dispatch({
                type: 'deleteChart',
                row
              })}>Remove graph</Button>
            }
          </span>
        </div>
      </div>

      <HighchartsReact
        highcharts={Highcharts}
        options={highchartOptions}
      />
    </div>

  );
}

export default CityChart;
