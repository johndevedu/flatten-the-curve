import React, { useContext, useState } from 'react'
import { ChartContext } from '../providers/ChartProvider'
import CityChart from './CityChart'
import Toast from './Toast'
import { Button, Paper, Card, CardHeader, Typography } from '@material-ui/core'
import CountyChart from './CountyChart'

export default function Charts() {
  const {state, dispatch} = useContext(ChartContext)
  const [openToast, setOpenToast] = useState(false)

  const charts = state.map((item, index) => (
    <Card>
      <Typography gutterBottom variant="h5" component="h2">
          Local
      </Typography>
      <CityChart row={index} />
    </Card>
  ))

  const onRememberChartsClick = () => {
    dispatch({type: 'rememberCharts'})
    setOpenToast(true)
  }

  return (
    <div style={{backgroundColor: '#f5f5f5'}}>
      {charts}
      <Button onClick={() => dispatch({type: 'addChart'}) } style={{marginRight: '10px'}}>Add local graph</Button>
      <Button variant='outlined' onClick={onRememberChartsClick}>Remember local graphs for next time</Button>
      <Card style={{ marginTop: '20px'}}>
        <Typography gutterBottom variant="h5" component="h2">
          Counties of California
        </Typography>
        <CountyChart />
      </Card>
      <Toast onClose={() => setOpenToast(false)} open={openToast} />
    </div>
  )
}
