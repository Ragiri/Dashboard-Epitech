/* eslint-disable no-useless-computed-key */
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import defaultStyles from '../../js/styles'

/**
 * Styles spécifiques au composant
 */
const styles = {
  ...defaultStyles,
  ...{
    mobileMenu: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      width: '50%',
      background: 'white',
      padding: 20,
      transition: '0.1s',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      zIndex: 1001,
    },
    mobileMenuLeft: {
      left: '-50%',
      borderRight: '1px solid #eaecf0',
    },
    mobileMenuRight: {
      right: '-50%',
      borderLeft: '1px solid #eaecf0',
    },
    mobileMenuVisible: {
      transition: '0.1s',
      boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.25)',
    },
    mobileMenuVisibleLeft: {
      left: 0,
    },
    mobileMenuVisibleRight: {
      right: 0,
    },
    mobileMenuBackground: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      width: '100%',
      background: 'rgb(0,0,0,0.6)',
      transition: '0.1s',
      boxSizing: 'border-box',
      zIndex: 1000,
    },
    mobileMenuBackgroundLeft: {
      left: '-100%',
    },
    mobileMenuBackgroundRight: {
      right: '-100%',
    },
    mobileMenuBackgroundVisible: {
      transition: '0.1s',
    },
    mobileMenuBackgroundVisibleLeft: {
      left: 0,
    },
    mobileMenuBackgroundVisibleRight: {
      right: 0,
    },
  },
}


class SlideMenu extends React.Component {
  render() {
    const {
      classes,
      children,
      open,
      onClose,
      right,
    } = this.props

    return (
      <React.Fragment>
        <div
          className={classNames({
            [classes.mobileMenu]: true,
            [classes.mobileMenuLeft]: !right,
            [classes.mobileMenuRight]: right,
            [classes.mobileMenuVisible]: open,
            [classes.mobileMenuVisibleLeft]: open && !right,
            [classes.mobileMenuVisibleRight]: open && right,
          })}
        >
          {children}
        </div>
        <div
          className={classNames({
            [classes.mobileMenuBackground]: true,
            [classes.mobileMenuBackgroundLeft]: !right,
            [classes.mobileMenuBackgroundRight]: right,
            [classes.mobileMenuBackgroundVisible]: open,
            [classes.mobileMenuBackgroundVisibleLeft]: open && !right,
            [classes.mobileMenuBackgroundVisibleRight]: open && right,
          })}
          role="button"
          onClick={onClose}
        />
      </React.Fragment>
    )
  }
}

SlideMenu.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  right: PropTypes.bool,
  children: PropTypes.instanceOf(Object),
}

SlideMenu.defaultProps = {
  open: false,
  onClose: () => null,
  right: false,
  children: (<div></div>)
}

export default withStyles(styles)(SlideMenu)
