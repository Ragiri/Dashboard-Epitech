import React from 'react'

import LoginView from './loginView'

class Login extends React.Component {

  render() {
    return (
      <LoginView
        history={this.props.history}
      />
    )
  }
}

Login.propTypes = { }
Login.defaultProps = { }

export default Login
