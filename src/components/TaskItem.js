import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Checkbox from '@material-ui/core/Checkbox'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import ReplayIcon from '@material-ui/icons/Replay'
import DoneIcon from '@material-ui/icons/Done'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'

// actions
import {
  deleteItem,
  editItem,
  toggleCountdown,
  startExecutionAt,
  completed,
  reset
} from '../state/actions'

// helpers
import { getRemainTime, timeInSeconds } from '../helpers'

// components
import DurationForm from './DurationForm'

class TaskItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditable: false
    }
    this.timerUpdater = null
    this.editionIsActive = false

    this.hidden = false
    this.isComplete = false
    this.itemsToShow = 'all'

    this.checkRef = React.createRef()

    this.removeItem = this.removeItem.bind(this)
    this.modifyItem = this.modifyItem.bind(this)
    this.handleEditedTime = this.handleEditedTime.bind(this)
    this.resetTime = this.resetTime.bind(this)
    this.filter = this.filter.bind(this)
  }

  removeItem() {
    this.props.deleteItem(this.props.task)
  }

  handleChange = prop => e => {
    switch (prop) {
      case 'task':
        this.setState({
          [prop]: e.target.value
        })
        break
      case 'isComplete':
      console.log(this.checkRef.current.checked);
        this.setState({
          [prop]: this.checkRef.current.checked
        })
        if (this.checkRef.current.checked) {
          this.toggleCountdown(true)()
        }
        this.props.completed({
          id: this.state.id,
          isComplete: this.checkRef.current.checked,
          completedAt: new Date().getTime()
        })
        break

      default:
        break
    }
  }

  handleEditedTime(time) {
    this.setState({
      time,
      timeInSeconds: timeInSeconds(time),
      timeToShow: time
    })
  }

  handleClick(e) {
    e.stopPropagation()
  }

  modifyItem() {
    this.editionIsActive = !this.editionIsActive

    switch (this.editionIsActive) {
      case true:
        console.log('active edition')
        this.setState({
          isEditable: !this.state.isEditable,
          modifiedAt: new Date().getTime()
        })
        console.log(this.state)
        break
      case false:
        console.log('edition finished')
        this.setState({
          isEditable: !this.state.isEditable
        })
        console.log(this.state)
        this.props.finishEdition(this.state)
        break

      default:
        break
    }
  }

  toggleCountdown = (stop, toggleFromButton = true) => () => {
    const countdown = (deadline, stop) => {
      let props = {
        isPlaying: !this.state.isPlaying,
        timeToShow: this.state.timeToShow,
        id: this.state.id
      }
      if (!stop) {
        if (toggleFromButton) {
          this.props.startExecutionAt({
            id: this.state.id,
            executedAt: new Date().getTime()
          })
        }
        this.timerUpdater = setInterval(() => {
          deadline--
          let time = getRemainTime(deadline)
          this.setState({
            timeToShow: time.formatedTime,
            isPlaying: true
          })

          if (time.remainTime < 1) {
            this.isComplete = true
            clearInterval(this.timerUpdater)
            const completedAt = new Date().getTime()
            this.setState({
              isPlaying: false,
              isComplete: true,
              completedAt
            })
            this.props.completed({
              isComplete: true,
              completedAt,
              id: this.state.id
            })
            this.props.toggleCountdown({
              isPlaying: this.state.isPlaying,
              timeToShow: this.state.timeToShow,
              id: this.state.id
            })
          }
        }, 1000)
      } else if (stop) {
        this.setState({
          isPlaying: false
        })
        props = {
          isPlaying: this.state.isPlaying,
          timeToShow: this.state.timeToShow,
          id: this.state.id
        }
        if (this.state.isPlaying) {
          this.props.toggleCountdown(props)
        }
        clearInterval(this.timerUpdater)
      }
      if (!this.state.isPlaying) {
        this.props.toggleCountdown(props)
      }
    }

    countdown(timeInSeconds(this.state.timeToShow), stop)
  }

  resetTime() {
    this.isComplete = false
    this.setState({
      timeToShow: this.props.task.time,
      isComplete: false
    })
    this.props.reset({
      id: this.state.id,
      timeToShow: this.props.task.time,
      isComplete: false
    })
  }

  // hooks
  componentWillMount() {
    this.setState({
      ...this.props.task
    })
    this.isComplete = this.props.task.isComplete

    if (this.props.task.isPlaying) {
      const restart = (initial, final) => {
        initial = Math.floor(initial / 1000)
        const now = Math.floor(new Date().getTime() / 1000)
        if (now - initial < final) {
          this.setState({
            timeToShow: getRemainTime(final - (now - initial)).formatedTime
          })
        }
      }
      restart(this.props.task.executedAt, this.props.task.timeInSeconds)
    }
  }

  componentDidMount() {
    if (this.state.isPlaying) {
      this.toggleCountdown(false, false)()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.itemsToShow = nextProps.classprop
    return true
  }

  filter(prop = this.itemsToShow) {
    switch (prop) {
      case 'all':
        this.hidden = false
        break

      case 'complete':
        if (this.isComplete) {
          this.hidden = false
        } else {
          this.hidden = true
        }
        break

      case 'incomplete':
        if (!this.isComplete) {
          this.hidden = false
        } else {
          this.hidden = true
        }
        break

      default:
        this.hidden = false
        break
    }
  }

  componentWillUpdate(nextProps, nextState) {
    this.filter(nextProps.classprop)
  }

  componentWillUnmount() {
    this.toggleCountdown(true)()
  }

  render() {
    return (
      <ExpansionPanel className={this.hidden ? 'hidden' : ''} expanded>
        <ExpansionPanelSummary>
          <Grid container spacing={24} justify="space-between">
            <Grid item xs={4}>
              {this.state.isEditable ? (
                <FormControl fullWidth margin="dense">
                  <InputLabel htmlFor="task">Editar Tarea</InputLabel>
                  <Input
                    onClick={this.handleClick}
                    required
                    onChange={this.handleChange('task')}
                    autoFocus
                    margin="dense"
                    id="task"
                    placeholder="Editar Tarea"
                    value={this.state.task}
                  />
                </FormControl>
              ) : (
                <Typography>{this.props.task.task}</Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              {this.state.isEditable ? (
                <DurationForm
                  setTime={this.state.timeToShow}
                  editedTime={this.handleEditedTime}
                />
              ) : (
                <Typography>{this.state.timeToShow}</Typography>
              )}
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid
            container
            spacing={24}
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    inputRef={this.checkRef}
                    checked={this.state.isComplete}
                    onChange={this.handleChange('isComplete')}
                    color="primary"
                  />
                }
                label="Completada"
              />
            </Grid>
            <Grid item>
              {this.state.isPlaying ? (
                <Button
                  disabled={
                    this.state.isEditable || this.state.timeToShow === '0:00:00'
                  }
                  variant="fab"
                  color="primary"
                  aria-label="Play"
                  onClick={this.toggleCountdown(true)}
                >
                  <PauseIcon />
                </Button>
              ) : (
                <Button
                  disabled={this.state.isEditable || this.state.isComplete}
                  variant="fab"
                  color="primary"
                  aria-label="Play"
                  onClick={this.toggleCountdown(false)}
                >
                  <PlayArrowIcon />
                </Button>
              )}
            </Grid>
            <Grid item>
              <Button
                onClick={this.resetTime}
                disabled={this.state.isEditable || this.state.isPlaying}
                variant="fab"
                color="primary"
                aria-label="Replay"
              >
                <ReplayIcon />
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={this.state.isPlaying}
                onClick={this.modifyItem}
                variant="fab"
                aria-label="Edit"
              >
                {this.state.isEditable ? <DoneIcon /> : <Icon>edit_icon</Icon>}
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={this.removeItem}
                disabled={this.state.isEditable}
                variant="fab"
                color="secondary"
                aria-label="Delete"
              >
                <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: item => dispatch(deleteItem(item)),
    finishEdition: item => dispatch(editItem(item)),
    toggleCountdown: item => dispatch(toggleCountdown(item)),
    startExecutionAt: item => dispatch(startExecutionAt(item)),
    completed: item => dispatch(completed(item)),
    reset: item => dispatch(reset(item))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(TaskItem)
