import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

// helpers
import { timeInSeconds, getRemainTime } from '../helpers'

class DurationForm extends Component {
  constructor(props) {
    super(props)
    this.setTime = this.setTime.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.hoursRef = React.createRef()
    this.minutesRef = React.createRef()
    this.secondsRef = React.createRef()
  }

  setTime() {
    switch (typeof this.props.setTime) {
      case 'function':
        const time = `${this.hoursRef.current.value}:${
          this.minutesRef.current.value
        }:${this.secondsRef.current.value}`
        this.props.setTime({
          customTime: time,
          timeInSeconds: timeInSeconds(time)
        })
        break
      case 'string':
        const splitTime = this.props.setTime.split(':')
        this.hoursRef.current.value = splitTime[0]
        this.minutesRef.current.value = splitTime[1]
        this.secondsRef.current.value = splitTime[2]
        break

      default:
        break
    }
  }

  handleClick(e) {
    e.stopPropagation()
  }

  handleChange() {
    if (this.hoursRef.current.value > 1) {
      this.minutesRef.current.value = 0
      this.secondsRef.current.value = 0
    }
    switch (typeof this.props.setTime) {
      case 'function':
        this.setTime()
        break
      case 'string':
        const editedTime =
          this.hoursRef.current.value * 3600 +
          this.minutesRef.current.value * 60 +
          parseInt(this.secondsRef.current.value)
        this.props.editedTime(getRemainTime(editedTime).formatedTime)
        break

      default:
        break
    }
  }

  // hooks
  componentDidMount() {
    this.setTime()
  }

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={4}>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="hours">Horas</InputLabel>
            <Input
              onClick={this.handleClick}
              inputRef={this.hoursRef}
              inputProps={{
                min: 0,
                max: 2
              }}
              id="hours"
              type="number"
              defaultValue="0"
              onChange={this.handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="minutes">Minutos</InputLabel>
            <Input
              onClick={this.handleClick}
              inputRef={this.minutesRef}
              inputProps={{
                min: 0,
                max: 59
              }}
              id="minutes"
              type="number"
              defaultValue="0"
              onChange={this.handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="seconds">Segundos</InputLabel>
            <Input
              onClick={this.handleClick}
              inputRef={this.secondsRef}
              inputProps={{
                min: 0,
                max: 59
              }}
              id="seconds"
              type="number"
              defaultValue="0"
              onChange={this.handleChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    )
  }
}

export default DurationForm
