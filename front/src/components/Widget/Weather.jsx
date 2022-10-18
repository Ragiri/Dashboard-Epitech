import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import tables from '../../js/tables';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    appbar: {
      boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.25)',
    },
}

class Weather extends React.Component {
    interval;
    state = {
        desc: '',
        temp: '',
        country: '',
        type: '',
    }

    load = () => {
        const apikey = '7ff376560f6e36972524846e365b9164';
        const {city, } = this.props;
        this.interval = setInterval(() => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apikey)
        .then((response)=> {return response.json()})
        .then(res=> {
            this.setState({desc: res.weather[0].description, temp: Math.round(parseFloat(res.main.temp)-273.15), country: res.name, type: res.weather[0].main});
        })
        }, 5000);
    }

    componentDidMount() {
        this.load();
    }
    componentWillUnmount() {
        clearInterval(this.interval);
      }
    render() {
        const {
            desc,
            temp,
            country,
            type,
        } = this.state


        const {
            city,
            onDelete,
        } = this.props

        return (
            <Card bg="primary" style={{ width: '18rem', backgroundColor: '#0bcfec'}}>
            <CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{color: '#ffffff'}}>
                    {country + " temperature " + temp + "°"}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{color: '#ffffff'}}>
                    {type + " " + desc}
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" style={{color: '#ffffff'}} onClick={() => onDelete(city)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
        )
    }
}

Weather.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  city: PropTypes.string,
  onDelete: PropTypes.func,
}

Weather.defaultProps = {
    city: '',
    onDelete: () => null,
}

export default withStyles(styles)(Weather)