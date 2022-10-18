import React from 'react'
import defaultStyles from '../../js/styles'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import View from '../../components/view'
import Steam from '../../components/Widget/Steam'
import Weather from '../../components/Widget/Weather'
import YoutubeAnalytics from '../../components/Widget/YoutubeAnalytics'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import config from '../../js/config';
import tables from '../../js/tables';
import Cinema from '../../components/Widget/Cinema'
import Twitter from '../../components/Widget/Twitter'

const styles = {
  ...defaultStyles,
  ...{
    absolute: {
      backgroundColor: '#ffffff',
      color: '#5bace2',
      '&:hover': {
      background: "#dddddd",
     },
    }
  }
}

const options = [
  'Steam',
  'Weather',
  'Youtube Analytics',
  'Cinema',
  'Twitter'
];

class HomeView extends React.Component {
  state = {
    anchorEl: '',
    SteamVisible: false,
    WeatherVisible: false,
    YoutubeAnalyticsVisible: false,
    CinemaVisible: false,
    TwitterVisible: false,
    playerIdValue: '',
    city: '',
    videoId: '',
    filmName: '',
    accountName: '',
    dialog: false,
    tab: tables,
  }

  handleClose = (event) => {
    this.setState({anchorEl: null});
    this.setState({SteamVisible: false});
    this.setState({WeatherVisible: false});
    this.setState({YoutubeAnalyticsVisible: false});
    this.setState({CinemaVisible: false});
    this.setState({TwitterVisible: false});
    this.setState({dialog: false});
  };

  createSteamWidget = (pId) => {
    tables.steamIds.push(pId);
    this.setState({SteamVisible: false, tab: tables});
    this.handleClose()
  }

  createWeatherWidget = (cityVal) => {
    tables.citys.push(cityVal)
    this.setState({WeatherVisible: false, tab: tables});
    this.handleClose()
  }

  createYoutubeAWidget = (videoIdVal) => {
    tables.youtubeIds.push(videoIdVal)
    this.setState({YoutubeAnalyticsVisible: false, tab: tables});
    this.handleClose()
  }

  
  createCinemaWidget = (filmName) => {
    tables.filmNames.push(filmName)
    this.setState({CinemaVisible: false,tab: tables});
    this.handleClose()
  }
  
  createTwitterWidget = (account) => {
    tables.twitterName.push(account)
    this.setState({TwitterVisible: false, tab: tables});
    this.handleClose();
  }
  handleOption = (event) => {
    if (event.currentTarget.textContent === "Steam") {
      this.handleClose();
      this.setState({SteamVisible: true});
    }
    if (event.currentTarget.textContent === "Weather") {
      this.handleClose();
      this.setState({WeatherVisible: true});
    }
    if (event.currentTarget.textContent === "Youtube Analytics") {
      this.handleClose();
      this.setState({YoutubeAnalyticsVisible: true});
    }
    if (event.currentTarget.textContent === "Cinema") {
      this.handleClose();
      this.setState({CinemaVisible: true});
    }
    if (event.currentTarget.textContent === "Twitter") {
      this.handleClose();
      this.setState({TwitterVisible: true});
    }
  }
  handleClick = (event) => {
    if (sessionStorage.getItem('NameUser') === undefined || sessionStorage.getItem('NameUser') === '')
      this.setState({dialog: true})
    else
      this.setState({anchorEl: event.currentTarget});
  };
  
  handleChangeID = (e) => this.setState({ 
		playerIdValue: e.target.value
  }) 

  handleChangeCity = (e) => this.setState({ 
		city: e.target.value
  }) 
  
  handleChangeFilm = (e) => this.setState({ 
		filmName: e.target.value
  }) 
  
  handleChangeAccount = (e) => this.setState({ 
		accountName: e.target.value
  }) 

  handleChangeVideo = (e) => this.setState({ 
		videoId: e.target.value
  }) 

  Citydelete = (city) => {
    var tmp = tables.citys.filter(item => item !== city)
    tables.citys = tmp;
    console.log(tables);
    this.setState({tab: tables});
  }
  Steamdelete = (id) => {
    var tmp = tables.steamIds.filter(item => item !== id)
    tables.steamIds = tmp;
    console.log(tables);
    this.setState({tab: tables});
  }
  Cinemadelete = (name) => {
    var tmp = tables.filmNames.filter(item => item !== name)
    tables.filmNames = tmp;
    console.log(tables);
    this.setState({tab: tables});
  }
  Youtubedelete = (id) => {
    var tmp = tables.youtubeIds.filter(item => item !== id)
    tables.youtubeIds = tmp;
    console.log(tables);
    this.setState({tab: tables});
  }
  Twitterdelete = (name) => {
    var tmp = tables.twitterName.filter(item => item !== name)
    tables.twitterName = tmp;
    console.log(tables);
    this.setState({tab: tables});
  }
  render() {
    const {
      classes,
    } = this.props

    const {
      anchorEl,
      SteamVisible,
      WeatherVisible,
      YoutubeAnalyticsVisible,
      CinemaVisible,
      TwitterVisible,
      playerIdValue,
      city,
      videoId,
      filmName,
      accountName,
      dialog,
      tab,
    } = this.state
    
    const open = Boolean(anchorEl);
    
    return (
      <View
        history={this.props.history}
      >
      <IconButton  aria-label="add" className={classes.absolute} onClick={this.handleClick}>
          <AddIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={this.handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={this.handleOption}>
            {option}
          </MenuItem>
        ))}
      </Menu>

      <Dialog open={SteamVisible} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Steam Widget</DialogTitle>
        <DialogContent>
          <DialogContentText> Give your Steam player ID</DialogContentText>
          <TextField autoFocus fullWidth id="name" label="Player Id" variant="outlined" value={this.state.playerIdValue} onChange={this.handleChangeID}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.createSteamWidget(playerIdValue)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={WeatherVisible} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Weather Widget</DialogTitle>
        <DialogContent>
          <DialogContentText> Give a city</DialogContentText>
          <TextField autoFocus fullWidth id="name" label="City" variant="outlined" value={this.state.city} onChange={this.handleChangeCity}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.createWeatherWidget(city)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={YoutubeAnalyticsVisible} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Youtube Analytics Widget</DialogTitle>
        <DialogContent>
          <DialogContentText> Give an Id of a video</DialogContentText>
          <TextField autoFocus fullWidth id="name" label="Video Id" variant="outlined" value={this.state.videoId} onChange={this.handleChangeVideo}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.createYoutubeAWidget(videoId)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={TwitterVisible} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Twitter Widget</DialogTitle>
        <DialogContent>
          <DialogContentText> Give an @ </DialogContentText>
          <TextField autoFocus fullWidth id="name" label="@ of an account" variant="outlined" value={this.state.accountName} onChange={this.handleChangeAccount}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.createTwitterWidget(accountName)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={CinemaVisible} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cinema Widget</DialogTitle>
        <DialogContent>
          <DialogContentText> Give a film name</DialogContentText>
          <TextField autoFocus fullWidth id="name" label="Film name" variant="outlined" value={this.state.filmName} onChange={this.handleChangeFilm}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.createCinemaWidget(filmName)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialog}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">{"You need to log in first"}</DialogTitle>
      </Dialog>
      <Grid container spacing={2}>
      <Grid item xs={3}>
      {tab.citys.map(Id => (
        <Weather city={Id} onDelete={this.Citydelete} />
      ))}
      </Grid>
      <Grid item xs={3}>
      {tab.filmNames.map(Id => (
        <Cinema name={Id} onDelete={this.Cinemadelete} />
      ))}
      </Grid>
      <Grid item xs={3}>
      {tab.twitterName.map(Id => (
        <Twitter account={Id} onDelete={this.Twitterdelete} />
      ))}
      </Grid>
      <Grid item xs={3}>
      {tab.youtubeIds.map(Id => (
        <YoutubeAnalytics videoId={Id} onDelete={this.Youtubedelete} />
      ))}
      </Grid>
      <Grid item xs={3}>
      {tab.steamIds.map(Id => (
        <Steam playerId={Id} onDelete={this.Steamdelete} />
      ))}
      </Grid>
      </Grid>
      </View>
    )
  }
}

HomeView.propTypes = {
}

HomeView.defaultProps = {
}

export default withStyles(styles)(HomeView)


