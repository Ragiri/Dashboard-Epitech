import React from 'react'

import SettingsView from './settingsView'


/**
 * Settings - contrôleur
 */
class Settings extends React.Component {
  state = {
    name: {
      value: '',
      error: true,
    },
    email: {
      value: '',
      error: true,
    },
    phone: {
      value: '',
      error: true,
    },
    password: {
      value: '',
      error: true,
    },
    twoFA: false,
  }

  componentDidMount() {

  }

  onChangeName = (name) => {
    this.setState({name})
  }

  onChangeEmail = (email) => {
    this.setState({email})
  }

  onChangePhone = (phone) => {
    this.setState({phone})
  }

  onChange2FA = (value) => {
    this.setState({twoFA: value})
  }

  render() {
    const {
      history,
    } = this.props

    const {
      name,
      email,
      phone,
      password,
      twoFA,
    } = this.state

    return (
      <SettingsView
        history={history}
        name={name.value}
        email={email.value}
        phone={phone.value}
        password={password.value}
        twoFA={twoFA}
        onChangeName={this.onChangeName}
        onChangeEmail={this.onChangeEmail}
        onChangePhone={this.onChangePhone}
        onChange2FA={this.onChange2FA}
      />
    )
  }
}

Settings.propTypes = { }
Settings.defaultProps = { }

export default Settings
