import React from 'react'
import ReactGA from 'react-ga'

import {
  BrowserRouter,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'

import Home from './pages/home'
import Login from './pages/login'
import Settings from './pages/settings'
import Signup from './pages/signup'

import tables from './js/tables'
import store from './js/magicStore'
import theme from './js/theme'


require('./App.css')

class RedirectHome extends React.Component {
  render() {
    this.props.history.push('/')
    return (null)
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    ReactGA.initialize('UA-114999421-8')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  componentDidMount() {
    store.restore()
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/devices" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="/*" component={withRouter(RedirectHome)} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
