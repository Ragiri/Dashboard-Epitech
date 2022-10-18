import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import tables from '../../js/tables';

const styles = {

    media: {
        height: 140,
      },
}

class Steam extends React.Component {
    state = {
        avatarURL: '',
        PlayerName: '',
        PlayerCity: '',
        profileUrl: '',
        PlayerState: '',
    }

    load = () => {
        const apikey = '173C4BA9633392B4374D9FF67962DD8B';
        const {playerId, } = this.props;
        this.interval = setInterval(() => {
        fetch('https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + apikey + '&steamids=' + playerId)
        .then((response)=> {return response.json()})
        .then(res=> {
            const r = res.response.players[0];
            this.setState({avatarURL: r.avatar, PlayerName: r.personaname, PlayerCity: r.loccountrycode, profileUrl: r.profileurl});
            if (r.personastate === 0)
                this.setState({PlayerState: 'Offline'});
            else
                this.setState({PlayerState: 'Online'});
        })

    }, 5000);
    }

    componentDidMount() {
        this.load();
    }
    render() {
        const {
            avatarURL,
            PlayerName,
            PlayerCity,
            PlayerState,
            profileUrl,
        } = this.state

        const {
            classes,
            playerId,
            onDelete,
        } = this.props

        return (
            <Card style={{ width: '18rem', backgroundColor: '#323232'}}>
                <CardActionArea href={profileUrl}>
                    <CardMedia
                      className={classes.media}
                      image={avatarURL}
                      title={PlayerName + " avatar"}
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{color: '#ffffff'}}>
                        {PlayerName + "'s profile"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{color: '#ffffff'}}>
                        {PlayerCity + " " + PlayerState}
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" style={{color: '#ffffff'}} onClick={() => onDelete(playerId)}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

Steam.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  playerId: PropTypes.string,
  onDelete: PropTypes.func,
}

Steam.defaultProps = {
    playerId: '',
    onDelete: () => null,
}

export default withStyles(styles)(Steam)