import React, { useEffect, useState } from 'react';
import '../App.css';
import { getCountiesAndMeta } from '../helpers/county.helper';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';

const options = {
  chart: {
    height: 540,
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
    showInLegend: false,
    name: 'Cases',
    data: []
  }],
  credits: {
    enabled: false
  }
}


function CountyChart({ row }) {
  const [highchartOptions, setHighchartOptions] = useState(options)

  useEffect(() => {
    const getter = async () => {
      const { seriesCollection, dates } = await getCountiesAndMeta();
      mapAndSetChartOptions(seriesCollection, dates)
    }

    getter()
  }, [setHighchartOptions])

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

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
        </div>
      </div>

      <HighchartsReact
        highcharts={Highcharts}
        options={highchartOptions}
      />
    </div>

  );
}

export default CountyChart;
