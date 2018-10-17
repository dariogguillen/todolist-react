import React, { Component } from 'react'
import { connect } from 'react-redux'

// material-ui
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// actions
import { toggleDialog } from '../../state/actions'

// components
import Header from '../shared/Header'
import TaskForm from '../TaskForm'
import TaskItem from '../TaskItem'
import OptionSelect from './OptionSelect'

class TaskContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibles: 'all'
    }
  }

  toggle = () => {
    this.props.toggleDialog(!this.props.open)
  }

  renderItem = tasks => {
    return tasks.map(task => {
      return (
        <TaskItem classprop={this.state.visibles} task={task} key={task.id} />
      )
    })
  }

  handleChange = e => {
    this.setState({
      visibles: e.target.value
    })
  }

  componentWillMount() {
    this.props.toggleDialog(false)
  }
  render() {
    return (
      <div className="content">
        <Header
          title="Listado de tareas"
          color="default"
          addButton={
            <Button
              onClick={this.toggle}
              variant="fab"
              color="primary"
              aria-label="Add"
            >
              <AddIcon />
            </Button>
          }
        />
        <Grid container spacing={24} justify="space-between">
          <Grid item xs={12} container justify="flex-end">
            <Grid item xs={3}>
              <OptionSelect
                visibles={this.state.visibles}
                onChangeOption={this.handleChange}
              />
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
