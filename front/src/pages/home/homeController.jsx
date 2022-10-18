import React from 'react'

import HomeView from './homeView'

/**
 * Home
 */
class Home extends React.Component {
  render() {
    return (
      <HomeView
        history={this.props.history}
      />
    )
  }
}

Home.propTypes = { }
Home.defaultProps = { }

export default Home
