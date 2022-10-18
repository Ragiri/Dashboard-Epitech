import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import View from '../../components/view'

import TextField from '@material-ui/core/TextField';

import defaultStyles from '../../js/styles'

/**
 * Styles spécifiques à la page
 */
const styles = {
  ...defaultStyles,
  ...{
    settingsPanel: {
      maxWidth: 600,
      margin: '0 auto',
    },
    inputWrapper: {
      marginBottom: 20,
    },
  },
}

/**
 * Settings - vue
 *
 */
class SettingsView extends React.Component {
  render() {
    const {
      classes,
      history,
      name,
      email,
      phone,
      onChangeName,
      onChangeEmail,
      onChangePhone,
    } = this.props

    return (
      <View
        history={history}
      >
        <div
          className={classNames({
            [classes.panel]: true,
            [classes.settingsPanel]: true,
          })}
        >
          <h1
            className={classes.mainTitle}
          >
            {"Setting"}
          </h1>
          <div className={classes.inputWrapper}>
            <TextField
              label={"name"}
              value={name}
              onChange={onChangeName}
              disabled
            />
          </div>
          <div className={classes.inputWrapper}>
            <TextField 
              label={"email"}
              value={email}
              onChange={onChangeEmail}
              disabled
            /> 
          </div>
          <div className={classes.inputWrapper}>
            <TextField 
              label={"phone"}
              value={phone}
              onChange={onChangePhone}
              disabled
            />
          </div>
        </div>
      </View>
    )
  }
}

SettingsView.propTypes = {
  t: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  password: PropTypes.string,
  twoFA: PropTypes.bool,
  onChangeName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePhone: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChange2FA: PropTypes.func,
}

SettingsView.defaultProps = {
  name: '',
  email: '',
  phone: '',
  password: '',
  twoFA: false,
  onChangeName: () => null,
  onChangeEmail: () => null,
  onChangePhone: () => null,
  onChangePassword: () => null,
  onChange2FA: () => null,
}

export default withStyles(styles)(SettingsView)
