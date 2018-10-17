import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const OptionSelect = props => {
  const { visibles, onChangeOption } = props
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel htmlFor="select">Mostrando</InputLabel>
        <Select
          value={visibles}
          onChange={onChangeOption}
          inputProps={{
            name: 'select',
            id: 'select'
          }}
        >
          <MenuItem value={'all'}>Todas</MenuItem>
          <MenuItem value={'complete'}>Completadas</MenuItem>
          <MenuItem value={'incomplete'}>Incompletas</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

OptionSelect.propTypes = {
  visibles: PropTypes.string.isRequired,
  onChangeOption: PropTypes.func.isRequired
}

export default OptionSelect
