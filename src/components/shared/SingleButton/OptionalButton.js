import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Button from '@material-ui/core/Button'

const OptionalButton = ({ icon, color }) => {
  return (
    <Button
      // disabled={this.state.isEditable || this.state.timeToShow === '0:00:00'}
      variant="fab"
      color={color}
      // onClick={this.toggleCountdown(true)}
    >
      {icon}
    </Button>
  )
}

OptionalButton.propTypes = {
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
}

export default OptionalButton
