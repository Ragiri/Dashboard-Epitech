import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import tables from '../../js/tables';
import { Timeline } from 'react-twitter-widgets'
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

class Twitter extends React.Component {

    render() {

        const {
            account,
            onDelete,
        } = this.props

        return (
            <Card style={{ width: '18rem'}}>
            <CardActionArea>
            <Timeline
                dataSource={{
                  sourceType: 'profile',
                  screenName: account
                }}
                options={{height: "400" }}
            />
            </CardActionArea>
            <CardActions>
                <Button size="small" onClick={() => onDelete(account)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
        )
    }
}

Twitter.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  account: PropTypes.string,
  onDelete: PropTypes.func,
}

Twitter.defaultProps = {
    account: '',
    onDelete: () => null,
}

export default withStyles(styles)(Twitter)