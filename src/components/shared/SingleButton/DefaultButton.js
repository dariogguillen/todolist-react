import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Button from '@material-ui/core/Button'

const DefaultButton = ({ icon, color }) => {
  return (
    <Button
      // disabled={this.state.isEditable || this.state.isComplete}
      variant="fab"
      color={color}
      // onClick={this.toggleCountdown(false)}
    >
      {icon}
    </Button>
  )
}

DefaultButton.propTypes = {
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
}

export default DefaultButton
