import React, { useContext } from 'react'
import { ChartContext } from '../providers/ChartProvider'
import Chart from '../Chart'
import { Button } from '@material-ui/core'

export default function Charts() {
  const {state, dispatch} = useContext(ChartContext)

  const charts = state.map((item, index) => <Chart row={index} />)

  return (
    <div>
      {charts}
      <Button onClick={() => dispatch({type: 'addChart'}) } style={{marginRight: '10px'}}>Add more charts</Button>
      <Button onClick={() => dispatch({type: 'rememberCharts'})}>Remember charts for next time</Button>
    </div>
  )
}
