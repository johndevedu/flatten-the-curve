import React from 'react';
import './App.css';
import { ChartProvider } from './providers/ChartProvider'
import Charts from './components/Charts';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  props: {
    MuiButton: {
      variant: "contained",
      size: "small"
    }
  }
});

function App() {
  // const [additionalCharts, setAdditionalCharts] = useState(0)

  // const charts = [<Chart isRememberEnabled={true} key={0} row={0}/>];

  // for (let i = 0; i < additionalCharts; i++ ) {
  //   const index = i+1;
  //   charts.push(<Chart key={index} row={index}/>)
  // }

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <div style={{ textAlign: "center" }}>
          <h1>Flatten the Curve</h1>
          <ChartProvider>
            <Charts />
          </ChartProvider>

        </div>

        <div style={{ padding: 15 }}>
          <p>Info</p>
          <ul>
            <li>Motivation: wanted to see graphs per each region of Los Angeles but could not find one online</li>
            <li>Information gathered from <a href="http://www.publichealth.lacounty.gov/media/Coronavirus/">LA County Health</a></li>
            <li>Will be updated daily</li>
            <li>Contributions welcome <a href="https://github.com/johndevedu/flatten-the-curve" target="_blank">here</a></li>
            <li>Comments welcome <a href="https://github.com/johndevedu/flatten-the-curve/issues" target="_blank">here</a></li>
          </ul>
        </div>    
      </MuiThemeProvider>
    </div>
  );
}

export default App;
