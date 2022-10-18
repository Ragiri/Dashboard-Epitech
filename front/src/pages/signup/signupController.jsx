import React from 'react'

import { withStyles } from '@material-ui/core/styles'


import SignupView from './signupView'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {idx: 0, type: ''}
    this.companyComponents = [() => <div>A</div>]
  }

  handleNext = (from, info) => {
    const { type} = this.state
    console.log("next", from, info, type)
  }

  handlePrev = (e) => {
    e.preventDefault()
    const { type, idx } = this.state
    if (idx === 0)
      this.setState({type: ''})
    else
      this.setState({toLoad: this.pages[type][idx - 1], idx: (idx - 1)})
  }

  render() {

    return (
      <SignupView history={this.props.history} toLoad={this.state.toLoad} handleNext={this.handleNext.bind(this)} handlePrev={this.handlePrev.bind(this)} />
    )
  }
}

const styles = {
  slider: {
    position: 'absolute',
    zIndex: '99',
    width: '100%',
    height: 'calc(100% - 180px)',
    top: '180px',
    left: 0,
    border: 'solid'
  },
  tmp: {
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    left: 0
  }
}

export default withStyles(styles)(Signup)