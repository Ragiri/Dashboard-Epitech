import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { GoogleLogin } from 'react-google-login'
import TextField from '@material-ui/core/TextField';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import CircularProgress from '@material-ui/core/CircularProgress'
import View from '../../components/view'
import defaultStyles from '../../js/styles'
import googleLogo from '../../assets/logos/googleLogo.png'
import fbLogo from '../../assets/logos/fbLogo.png'
import config from '../../js/config'
const BlueLoader = withStyles({
  root: {
    color: 'white',
    marginRight: 10,
  },
})(props => <CircularProgress color="primary" {...props} />);

const styles = {
  ...defaultStyles,
  ...{
  container: {
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: 'auto',
    maxWidth: 850,
    height: '100%',
    paddingBottom: 10,
    background: '#FFFFFF',
    borderRadius: '15px',
    boxShadow: '2px 2px 15px rgba(0, 0, 0, 0.15)',
  },
  titleDropdown: {
    fontFamily: 'Poppins',
    fontStyle: 'semibold',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '24px',
    color: '#797979',
  },
  title: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '30px',
    lineHeight: '45px',
    textAlign: 'center',
    color: '#624f69',
    marginTop: 20,
  },
  separator: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    border: '0.5px solid #C4C4C4',
  },
  inputContainer: {
    height: 55,
    width: '90%',
    marginTop: 15,
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    boxSizing: 'border-box',
    border: '0.5px solid #888888',
  },
  subText: {
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '18px',
    alignItems: 'center',
    textAlign: 'right',
    color: '#333333',
    marginTop: 5,
    marginLeft: 25,
    },
    buttonSignIn: {
      width: '90%',
      height: 55,
    },
    googlebtn: {
      background: '#DC4E41',
      borderRadius: '50px',
      color: 'white',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '23px',
      textTransform: 'none',
      width: '89%',
      height: '90%',
      '&:hover': {
      background: "#ba000d",
     },
    },
    LogoOut: {
      background: 'white',
      borderRadius: '50%',
      width: '42px',
      height: '42px',
      marginLeft: '-4%',
      marginRight: '18px',
    },
    Logo: {
      marginLeft: '-18%',
      marginRight: 'auto',
      width: '140%',
      height: '100%'
    },
    Logofb: {
      marginLeft: '-18%',
      marginRight: 'auto',
      width: '128%',
      height: '98%'
    },
    fbbtn: {
      background: '#212894',
      borderRadius: '50px',
      color: 'white',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '23px',
      textTransform: 'none',
      width: '89%',
      height: '90%',
      '&:hover': {
      background: "#1A2076",
     },
    },
    btn: {
      background: '#5dbbf8',
      borderRadius: '50px',
      color: 'white',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '23px',
      textTransform: 'none',
      width: '59%',
      height: '50%',
      '&:hover': {
      background: "#53a7de",
     },
    },
    inputbtn: {
      background: 'white',
      borderRadius: '50px',
      outlined: 'none',
      color: 'white',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '23px',
      textTransform: 'none',
      width: '89%',
      height: '90%',
      '&:hover': {
      background: 'white',
      outlined: 'white'
     },
    },
  }
}


class LoginView extends React.Component {
  state = {
    selectedValue: 'person',
    termsValue: false,
    hasNotAccepted: false,
    loading: false,
    passValue: '',
    emailValue: ''
  }

  googleResponse = (response) => {
    console.log(response);
    const body = {
      googleId: response.googleId,
      type: 'google'
    }
    fetch(`${config.apiRootUrl}/checkExistance`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((responses)=> {console.log(responses); return responses.json()
    }).then(res=> {
      console.log(res);
      if (res.status !== 'OK') {
        this.props.history.push('/signup')
      } else {
        sessionStorage.setItem('NameUser', res.name)
        this.props.history.push('/dashboard')
      }
    })
  }

  responseFacebook = (response) => {
    console.log(response);
    const body = {
      fbId: response.id,
      type: 'facebook'
    }
    console.log(response.id)
    fetch(`${config.apiRootUrl}/checkExistance`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response)=> {return response.json()
    }).then(res=> {
      if (res.status !== 'OK') {
        this.props.history.push('/signup')
      } else {
        sessionStorage.setItem('NameUser', res.name)
        this.props.history.push('/dashboard')
      }
    })
  }

  checkExistMail = (mail, password) => {
    const body = {
      pass: password,
      email: mail,
      type: 'local'
    }
    fetch(`${config.apiRootUrl}/checkExistance`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response)=> {return response.json()
    }).then(res=> {
      if (res.status !== 'OK') {
        this.props.history.push('/signup')
      } else {
        sessionStorage.setItem('NameUser', res.name)
        this.props.history.push('/dashboard')
      }
    })
  }

  handleConnection = (e, next) => {
    
    var loading = true

    this.setState({loading})
    e.preventDefault()
    next()
  }
  
  onFailure = (error) => {
    console.log(error)
  }

  handleChangeEmail = (e) => this.setState({ 
		emailValue: e.target.value 
  }) 
  handleChangePass = (e) => this.setState({ 
		passValue: e.target.value 
  }) 
  render() {
    const {
      classes,
      width,
      history,
    } = this.props

    const mobile = width === 'xs'

    const {
      loading,
      passValue,
      emailValue,
    } = this.state

    return (
      <View
        history={history}
      >
        <div className={classNames({ [classes.container]: !mobile, [classes.containerMobile]: mobile })}>
        <Grid container align="center" alignContent="center" alignItems="center" justify="center">
            <Grid item xs={12} sm={12}>
              <Typography className={classes.title}>{"Sign In"}</Typography>
            <Grid item xs={10} sm={7} style={{ marginTop: 35 }} align="center">
            <GoogleLogin
            clientId="949133872098-hdsshoo05f00tv63lqnaofon3aeo5l7v.apps.googleusercontent.com"
            render={renderProps => (
              <Button className={classes.googlebtn} onClick={(e) => this.handleConnection(e, renderProps.onClick)} disabled={renderProps.disabled}>
                {loading ? <BlueLoader /> : 
                <Box className={classes.LogoOut}>
                  <img className={classes.Logo} src={googleLogo} alt="" />
                </Box>
                }
                {"Log in with Google"}
              </Button>
            )}
            onSuccess={this.googleResponse}
            onFailure={this.onFailure('connection fail') && this.setState({loading: false})}
            />
            </Grid>
            <Grid item xs={10} sm={7} style={{ marginTop: 35 }} align="center">
            <FacebookLogin
            appId="1337227160013781"
            scope="public_profile,user_friends,user_actions.books"
            render={renderProps => (
              <Button className={classes.fbbtn} onClick={(e) => this.handleConnection(e, renderProps.onClick)} disabled={renderProps.disabled}>
                {loading ? <BlueLoader /> : 
                <Box className={classes.LogoOut}>
                  <img className={classes.Logofb} src={fbLogo} alt="" />
                </Box>
                }
                {"Log in with Facebook"}
              </Button>
            )}
            callback={this.responseFacebook}
            />
            </Grid>
            <Typography className={classes.title}>{"Email Sign In"}</Typography>
            <Grid item xs={10} sm={7} style={{ marginTop: 35 }} align="center">
            <TextField required id="outlined-basic" label="Email" variant="outlined" className={classes.inputbtn} value={this.state.emailValue} onChange={this.handleChangeEmail}></TextField>
            </Grid>
            <Grid item xs={10} sm={7} style={{ marginTop: 35 }} align="center">
            <TextField required id="outlined-basic" label="passwords" type="password" variant="outlined" className={classes.inputbtn} value={this.state.passValue} onChange={this.handleChangePass}/>
            </Grid>
            <Grid item xs={10} sm={7} style={{ marginTop: 35 }} align="center">
            <Button className={classes.btn} onClick={() => this.checkExistMail(emailValue, passValue)}>
            {"Send"}
            </Button>
            </Grid>
            </Grid>
          </Grid>
          </div>
      </View>
    )
  }
}

LoginView.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
}

LoginView.defaultProps = { }

export default withStyles(styles)(LoginView)
