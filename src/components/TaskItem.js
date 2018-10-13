import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
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
  startExecutionAt
} from '../state/actions'

// helpers
import { getRemainTime, timeInSeconds } from '../helpers'

// components
import DurationForm from './DurationForm'

class TaskItem extends Component {
  /* 
  * this.prop.task is a father prop
  * deleteItem, editItem, toggleCountdown are state props
  */
  constructor(props) {
    super(props)

    this.state = {
      isEditable: false
    }
    this.timerUpdater = null

    this.removeItem = this.removeItem.bind(this)
    this.modifyItem = this.modifyItem.bind(this)
    this.finishEdition = this.finishEdition.bind(this)
    this.handleEditedTime = this.handleEditedTime.bind(this)
  }

  removeItem() {
    this.props.deleteItem(this.props.task)
  }

  modifyItem() {
    this.setState({
      isEditable: !this.state.isEditable,
      modifiedAt: new Date().getTime()
    })
  }

  handleChange = prop => e => {
    switch (prop) {
      case 'task':
        this.setState({
          [prop]: e.target.value
        })
        break
      case 'isComplete':
        this.setState({
          [prop]: e.target.checked
        })
        break

      default:
        break
    }
  }

  handleEditedTime(time) {
    this.setState({
      time,
      timeInSeconds: timeInSeconds(time)
    })
  }

  handleClick(e) {
    e.stopPropagation()
  }

  finishEdition() {
    this.props.finishEdition(this.state)
  }

  toggleCountdown = stop => () => {
    this.setState({
      isPlaying: !this.state.isPlaying
    })

    const countdown = (deadline, stop) => {
      if (!stop) {
        const executedAt = new Date().getTime()
        this.timerUpdater = setInterval(() => {
          deadline--
          let time = getRemainTime(deadline)
          this.setState({
            timeToShow: time.formatedTime,
            executedAt
          })

          if (time.remainTime < 1) {
            clearInterval(this.timerUpdater)
            this.setState({
              isPlaying: false
            })
          }
        }, 1000)
      } else {
        clearInterval(this.timerUpdater)
      }
      this.props.toggleCountdown(this.state)
      console.log(this.state);
    }


    countdown(timeInSeconds(this.state.timeToShow), stop)
  }

  // hooks
  componentWillMount() {
    this.setState({
      ...this.props.task
    })
  }

  componentDidMount() {
    console.log(this.state)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('should componente update')
    // this.props.toggleCountdown(this.state)
    return nextProps.task.isPlaying === nextState.isPlaying
  }

  render() {
    const { task } = this.props
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
                <Typography>{task.task}</Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              {this.state.isEditable ? (
                <DurationForm
                  setTime={this.state.time}
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
                    checked={this.state.isComplete}
                    onChange={this.handleChange('isComplete')}
                    // value={this.state.isComplete}
                    color="primary"
                  />
                }
                label="Completada"
              />
            </Grid>
            <Grid item>
              {this.state.isPlaying ? (
                <Button
                  disabled={this.state.isEditable}
                  variant="fab"
                  color="primary"
                  aria-label="Play"
                  onClick={this.toggleCountdown(true)}
                >
                  <PauseIcon />
                </Button>
              ) : (
                <Button
                  disabled={this.state.isEditable}
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
                disabled={this.state.isEditable}
                variant="fab"
                color="primary"
                aria-label="Replay"
              >
                <ReplayIcon />
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={this.modifyItem} variant="fab" aria-label="Edit">
                {this.state.isEditable ? (
                  <DoneIcon onClick={this.finishEdition} />
                ) : (
                  <Icon>edit_icon</Icon>
                )}
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
    startExecutionAt: item => dispatch(startExecutionAt(item))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(TaskItem)
