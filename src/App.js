import React, { Component } from 'react'

import Header from './components/Header'
import TaskContainer from './components/TaskContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TaskContainer />
      </div>
    )
  }
}

export default App
