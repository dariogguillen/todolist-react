import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuidv1 from 'uuid'

import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'

// actions
import { toggleDialog, setInfo } from '../state/actions'

// helpers
import { timeInSeconds, getRemainTime } from '../helpers'

// components
import DurationForm from './DurationForm'

class TaskForm extends Component {
  constructor() {
    super()
    this.state = {
      task: '',
      type: 'small',
      time: '',
      timeInSeconds: 1800
    }

    this.customTime = '0'
    this.timeInSeconds = 0

    this.toggle = this.toggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getTime = this.getTime.bind(this)
    this.setCustomTime = this.setCustomTime.bind(this)
  }

  getTime(type = this.state.type, customTime = this.customTime) {
    switch (type) {
      case 'small':
        return '0:30:00'
      case 'medium':
        return '1:00:00'
      case 'large':
        return '2:00:00'
      case 'custom':
        return customTime
      default:
        return '0'
    }
  }

  toggle() {
    this.props.toggleDialog(!this.props.open)
    this.setState({
      task: '',
      type: 'small',
      time: '0:30:00',
      timeInSeconds: 1800
    })
  }

  setCustomTime(time) {
    this.customTime = time.customTime
    this.timeInSeconds = time.timeInSeconds
  }

  handleChange = prop => e => {
    switch (prop) {
      case 'task':
        this.setState({
          [prop]: e.target.value
        })
        break
      case 'type':
        this.setState({
          [prop]: e.target.value,
          time: this.getTime(e.target.value),
          timeInSeconds: timeInSeconds(this.getTime(e.target.value))
        })
        break

      default:
        break
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.timeInSeconds > 0) {
      let { time, timeInSeconds } = this.state
      const { task, type } = this.state
      if (type === 'custom') {
        time = getRemainTime(this.timeInSeconds).formatedTime
        timeInSeconds = this.timeInSeconds
      }
      const info = {
        id: uuidv1(),
        task,
        type,
        time,
        timeInSeconds,
        createdAt: new Date().getTime(),
        modifiedAt: null,
        executedAt: null,
        isComplete: false,
        isPlaying: false
      }
      this.props.setInfoToState(info)
      this.toggle()
    }
  }

  // hooks
  componentDidMount() {
    this.setState({
      time: this.getTime()
    })
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.toggle}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar Nueva Tarea</DialogTitle>
        <form onSubmit={this.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Especifica el nombre de la tarea y el tiempo que va a durar,
              maximo dos horas
            </DialogContentText>
            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="task">Nueva Tarea</InputLabel>
              <Input
                required
                onChange={this.handleChange('task')}
                autoFocus
                margin="dense"
                id="task"
                placeholder="Nueva Tarea"
                fullWidth
              />
            </FormControl>
            <FormControl component="fieldset" margin="dense">
              <FormLabel component="legend">Duración</FormLabel>
              <RadioGroup
                aria-label="Duracion"
                name="type"
                value={this.state.type}
                onChange={this.handleChange('type')}
              >
                <FormControlLabel
                  value="small"
                  control={<Radio color="primary" />}
                  label="Corta (30 min)"
                />
                <FormControlLabel
                  value="medium"
                  control={<Radio color="primary" />}
                  label="Media (1 hr)"
                />
                <FormControlLabel
                  value="large"
                  control={<Radio color="primary" />}
                  label="Larga (2 hr)"
                />
                <FormControlLabel
                  value="custom"
                  control={<Radio color="primary" />}
                  label="Personalizado (max. 2 hr)"
                />
              </RadioGroup>
              <FormHelperText>
                Selecciona una opción en personalizado maximo 2 horas.
              </FormHelperText>
            </FormControl>
            {this.state.type === 'custom' ? (
              <DurationForm setTime={this.setCustomTime} />
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

const mapStateToProps = state => {
  return {
    open: state.open
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDialog: isOpen => dispatch(toggleDialog(isOpen)),
    setInfoToState: item => dispatch(setInfo(item))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm)
