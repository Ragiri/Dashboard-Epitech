import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import tables from '../../js/tables';

const styles = {
    appbar: {
      boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.25)',
    },
    media: {
        height: 140,
      },
}

class Cinema extends React.Component {
    interval;
    state = {
        title: '',
        note: '',
        imageUrl: '',
        desc: '',
        releaseDate: '',
    }

    load = () => {
        const {name, } = this.props;
        const apikey = '8943a8d22d6a57cbd56344247b60640c';
        this.interval = setInterval(() => {
        fetch('https://api.themoviedb.org/3/search/movie?api_key=' + apikey + '&query=' + name)
        .then((response)=> {return response.json()})
        .then(res=> {
            var info = res.results[0];
            console.log(res);
            this.setState({desc: info.overview, title: info.original_title, note: info.vote_average , imageUrl: "http://image.tmdb.org/t/p/w300" + info.poster_path, releaseDate: info.release_date});
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
            note,
            imageUrl,
            title,
            releaseDate,
        } = this.state


        const {
            classes,
            name,
            onDelete,
        } = this.props

        console.log(imageUrl);

        return (
            <Card style={{ width: '18rem', backgroundColor: '#9763ea'}}>
            <CardActionArea>
            <CardMedia className={classes.media} image={imageUrl}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{color: '#ffffff'}} >{title} </Typography>
                <Typography gutterBottom variant="h6" component="h2" style={{color: '#ffffff'}} >{"Release:" + releaseDate + " Note:" + note} </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{color: '#ffffff'}}>{desc}</Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" style={{color: '#ffffff'}} onClick={() => onDelete(name)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
        )
    }
}

Cinema.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  name: PropTypes.string,
  onDelete: PropTypes.func,
}

Cinema.defaultProps = {
    name: '',
    onDelete: () => null,
}

export default withStyles(styles)(Cinema)