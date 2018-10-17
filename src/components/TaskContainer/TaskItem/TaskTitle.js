import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'

const handleClick = e => {
  e.stopPropagation()
}

const TaskTitle = (props) => {
  const { isEditable, title, onEditTitle, titleToEdit } = props
  return (
    <React.Fragment>
      {isEditable ? (
        <FormControl fullWidth margin="dense">
          <InputLabel htmlFor="task">Editar Tarea</InputLabel>
          <Input
            onClick={handleClick}
            required
            onChange={onEditTitle}
            autoFocus
            margin="dense"
            id="task"
            placeholder="Editar Tarea"
            value={titleToEdit}
          />
        </FormControl>
      ) : (
        <Typography>{title}</Typography>
      )}
    </React.Fragment>
  )
}

TaskTitle.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onEditTitle: PropTypes.func.isRequired,
  titleToEdit: PropTypes.string.isRequired,
}

export default TaskTitle
