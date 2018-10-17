import React from 'react'
import PropTypes from 'prop-types'

// components
import DefaultButton from './DefaultButton'
import OptionalButton from './OptionalButton'

const SingleButton = ({ towIcons, showDefaultIcon, color, icons }) => {
  return (
    <React.Fragment>
      {towIcons ? (
        showDefaultIcon ? (
          <DefaultButton color={color} icon={icons.defaultIcon} />
        ) : (
          <OptionalButton color={color} icon={icons.optionalIcon} />
        )
      ) : (
        <DefaultButton color={color} icon={icons.defaultIcon} />
      )}
    </React.Fragment>
  )
}

SingleButton.propTypes = {
  color: PropTypes.string.isRequired,
  towIcons: PropTypes.bool.isRequired,
  showDefaultIcon: PropTypes.bool.isRequired,
  icons: PropTypes.shape({
    defaultIcon: PropTypes.element.isRequired,
    optionalIcon: PropTypes.element
  }).isRequired
}

export default SingleButton
