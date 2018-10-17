import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const Header = props => {
  const { title, color, addButton } = props
  return (
    <header className="header">
      {!addButton ? (
        <AppBar position="static" color={color}>
          <Toolbar>
            <Typography variant="h3" color="inherit">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      ) : (
        <Grid
          container
          spacing={24}
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" color="inherit">
              {title}
            </Typography>
          </Grid>
          <Grid item>{addButton}</Grid>
        </Grid>
      )}
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  addButton: PropTypes.element
}

export default Header
