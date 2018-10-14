import React, { Component } from 'react'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

// actions
import { toggleDialog } from '../state/actions'

// components
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'

class TaskContainer extends Component {
  // = ({ toggleDialog, open, tasks }) =>

  // let visibles = 'todas'
  constructor(props) {
    super(props)
    this.state = {
      visibles: 'all'
    }

    this.visibles = ''
  }

  toggle = () => {
    this.props.toggleDialog(!this.props.open)
  }

  renderItem = (tasks, option = this.state.visibles) => {
    return tasks.map(task => {
      switch (option) {
        case 'complete':
          // console.log('mostrando completas')
          // console.log(task)
          return task.isComplete && <TaskItem task={task} key={task.id} />

        case 'incomplete':
          // console.log('mostrando incompletas')
          return !task.isComplete && <TaskItem task={task} key={task.id} />

        default:
          return <TaskItem task={task} key={task.id} />
      }
    })
  }

  handleChange = e => {
    // console.log(e.target.value);
    this.visibles = e.target.value
    this.setState({
      visibles: e.target.value
    })
    this.renderItem(this.props.tasks, this.visibles)
  }

  render() {
    return (
      <div className="content">
        <Grid container spacing={24} justify="space-between">
          <Grid item>
            <Typography variant="h4" color="inherit">
              Listado de Tareas
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={this.toggle}
              variant="fab"
              color="primary"
              aria-label="Add"
            >
              <AddIcon />
            </Button>
          </Grid>
          <Grid item xs={12} container justify="flex-end">
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="select">Mostrando</InputLabel>
                <Select
                  value={this.state.visibles}
                  onChange={this.handleChange}
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
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper>{this.renderItem(this.props.tasks)}</Paper>
          </Grid>
        </Grid>
        <TaskForm handleClickClose={this.toggle} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    open: state.open,
    tasks: state.tasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDialog: open => dispatch(toggleDialog(open))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskContainer)
