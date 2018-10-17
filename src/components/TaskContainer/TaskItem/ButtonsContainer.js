import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Grid from '@material-ui/core/Grid'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import ReplayIcon from '@material-ui/icons/Replay'
import DoneIcon from '@material-ui/icons/Done'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

// components
import SingleButton from '../../shared/SingleButton'

const ButtonsContainer = () => {
  return (
    <React.Fragment>
      <Grid item>
        <SingleButton
          towIcons={true}
          showDefaultIcon={true}
          color="primary"
          icons={{
            defaultIcon: <PlayArrowIcon />,
            optionalIcon: <PauseIcon />
          }}
        />
      </Grid>
      <Grid item>
        <SingleButton
          towIcons={false}
          showDefaultIcon={true}
          color="primary"
          icons={{
            defaultIcon: <ReplayIcon />
          }}
        />
      </Grid>
      <Grid item>
        <SingleButton
          towIcons={true}
          showDefaultIcon={true}
          color="default"
          icons={{
            defaultIcon: <DoneIcon />,
            optionalIcon: <EditIcon />
          }}
        />
      </Grid>
      <Grid item>
        <SingleButton
          towIcons={false}
          showDefaultIcon={true}
          color="secondary"
          icons={{
            defaultIcon: <DeleteIcon />
          }}
        />
      </Grid>
    </React.Fragment>
  )
}

ButtonsContainer.propTypes = {}

export default ButtonsContainer
