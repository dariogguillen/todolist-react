import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Header = () => {
  return (
    <div className="header">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h4" color="inherit">
            Administrador de Tareas
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
