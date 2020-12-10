import React from 'react'
import 'semantic-ui-css/semantic.min.css'

import { Grid } from 'semantic-ui-react'


// container
import Routes from './routes'

function App() {
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Routes />
    </Grid>
  );
}

export default App;
