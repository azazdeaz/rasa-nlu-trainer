// @flow

import React, { Component } from 'react';
import ExampleTable from './ExampleTable'
import TopBar from './TopBar'

class App extends Component {
  render() {
    return (
      <div>
        <TopBar/>
        <ExampleTable />
      </div>
    )
  }
}

export default App;
