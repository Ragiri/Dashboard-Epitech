import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import Header from '../header'

const styles = {
  mainWrapper: {
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: 1200,
    paddingLeft: 20,
    paddingRight: 20,
    margin: '0 auto',
    position: 'relative',
    marginBottom: 20,
  },
}

class View extends React.Component {
  render() {
    const {
      classes,
      history,
      children,
      id,
      marginTop,
    } = this.props

    return (
      <React.Fragment>
        <Header
          history={history}
        />
        <div
          id={id}
          className={classes.mainWrapper}
        >
          <div style={{marginTop: marginTop, position: 'relative'}}>
            {children}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

View.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object),
  id: PropTypes.string,
  marginTop: PropTypes.number,
}

View.defaultProps = {
  children: null,
  id: null,
  marginTop: -50,
}

export default withStyles(styles)(View)
