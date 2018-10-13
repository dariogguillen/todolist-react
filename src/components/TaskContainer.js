import React from 'react'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// actions
import { toggleDialog } from '../state/actions'

// components
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'

const TaskContainer = ({ toggleDialog, open, tasks }) => {
  const toggle = () => {
    toggleDialog(!open)
  }

  const renderItem = tasks => {
    return tasks.map(task => {
      return <TaskItem task={task} key={task.id} />
    })
  }

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
            onClick={toggle}
            variant="fab"
            color="primary"
            aria-label="Add"
            className=""
          >
            <AddIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper>{renderItem(tasks)}</Paper>
        </Grid>
      </Grid>
      <TaskForm handleClickClose={toggle} />
    </div>
  )
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
