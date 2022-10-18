import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  AppBar,
  Toolbar,
  Button,
} from '@material-ui/core'


import colors from '../../js/colors'
import tables from '../../js/tables'

const styles = {
  appbar: {
    boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.25)',
  },
  toolbar: {
    backgroundColor: colors.blue,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 200,
    paddingTop: 10,
  },
  panelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
  },
  rightPanel: {
  },
  inlineMenu: {
    display: 'flex',
    justifyContent: 'flex-end',
    ['@media (max-width:600px)']: {
      display: 'none',
    },
  },
  hamburgerMenu: {
    ['@media (min-width:600px)']: {
      display: 'none',
    },
  },
  hamburgerIcon: {
    color: colors.white,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    color: colors.white,
    fontSize: 12,
    textTransform: 'none',
    fontWeight: 'normal',
  },
  brandButton: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  brandLogo: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  menuButton: {
    color: colors.white,
  },
  dropdownMenu: {
    transition: '0.2s',
  },
  dropdownMenuRotate: {
    transform: 'rotate(180deg)',
  },
}

class Header extends React.Component {
  state = {
    accountMenuOpen: false,
    anchorMenu: null,
    open: false,
    dialog: false,
    dialogOut: false,
  }

  handleClickLogo = (event) => {
    this.props.history.push('/')
  }

  handleAccountMenuOpen = (event) => {
    this.setState({anchorMenu: event.target})
  }

  handleAccountMenuClose = (event) => {
    this.setState({anchorMenu: null})
  }

  handleClickMenuLogin = (event) => {
    this.closeMenus(event)
    if (sessionStorage.getItem('NameUser') === undefined || sessionStorage.getItem('NameUser') === '' || sessionStorage.getItem('NameUser') === 'null')
      this.props.history.push('/login')
    else
      this.setState({dialog: true});
  }

  handleClickMenuSign = (event) => {
    this.closeMenus(event)
    if (sessionStorage.getItem('NameUser') === undefined || sessionStorage.getItem('NameUser') === '' || sessionStorage.getItem('NameUser') === 'null')
      this.props.history.push('/signup')
    else
      this.setState({dialog: true});
  }
  
  handleClickMenuLogOut = (event) => {
    this.closeMenus(event);
    tables.steamIds = [];
    tables.youtubeIds = [];
    tables.citys = [];
    tables.filmNames = [];
    tables.twitterName = [];
    sessionStorage.setItem('NameUser', '')
    this.setState({dialogOut: true});
    window.location.reload();
  }

  handleClose = () => {
    this.setState({dialog: false});
    this.setState({dialogOut: false});
  };

  closeMenus = (event) => {}


  render() {
    const {
      classes,
    } = this.props

    const {
      dialog,
      dialogOut,
    } = this.state

    const inlineMenu = (
      <div className={classes.inlineMenu}>
        <Button
          className={classes.button}
          onClick={this.handleClickMenuLogin}
        >
          {"Sign in"}
        </Button>
        <Button
          className={classes.button}
          onClick={this.handleClickMenuSign}
        >
          {"Sign up"}
        </Button>
        <Button
          className={classes.button}
          onClick={this.handleClickMenuLogOut}
        >
          {"Log out"}
        </Button>
        <Dialog
        open={dialog}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">{sessionStorage.getItem('NameUser') + " is already log in. Log out first"}</DialogTitle>
      </Dialog>
      <Dialog
        open={dialogOut}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">{"You're log out"}</DialogTitle>
      </Dialog>
      </div>
    )

    return (
      <AppBar
        position="static"
        className={classes.appbar}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.panelWrapper}>
            <div className={classes.leftPanel}>
              <Button
                className={classNames({
                  [classes.button]: true,
                  [classes.brandButton]: true,
                })}
                onClick={this.handleClickLogo}
              >
                {"Epitech Dashboard"}
              </Button>
            </div>
            <div className={classes.rightPanel}>
              {inlineMenu}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
}

Header.defaultProps = { }

export default withStyles(styles)(Header)
