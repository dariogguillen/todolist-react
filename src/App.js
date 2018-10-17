import React, { Component } from 'react'

import Header from './components/shared/Header'
import TaskContainer from './components/TaskContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Administrador de Tareas" color="primary" />
        <TaskContainer />
      </div>
    )
  }
}

export default App
