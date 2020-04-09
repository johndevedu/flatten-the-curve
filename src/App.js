import React from 'react';
import './App.css';
import { ChartProvider } from './providers/ChartProvider'
import Charts from './components/Charts';
import { MuiThemeProvider, createMuiTheme, Typography, AppBar, Toolbar } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';

const theme = createMuiTheme({
  props: {
    MuiButton: {
      variant: "contained",
      size: "small",
      color: 'primary'
    }
  },
  overrides: {
    MuiPaper: {
      root: {
        margin: '10px',
        padding: '10px'
      }
    }
  },
  palette: {
    primary: blue,
    secondary: pink,
  },
});

function App() {
  // const [additionalCharts, setAdditionalCharts] = useState(0)

  // const charts = [<Chart isRememberEnabled={true} key={0} row={0}/>];

  // for (let i = 0; i < additionalCharts; i++ ) {
  //   const index = i+1;
  //   charts.push(<Chart key={index} row={index}/>)
  // }

  return (
    <div className="App" style={{backgroundColor: '#f5f5f5'}}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" >
              Flatten the Curve
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ textAlign: "center" }}>
        {/* <Typography gutterBottom variant="h3" component="h2">Flatten the Curve</Typography> */}
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
