import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import tables from "../../js/tables";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  appbar: {
    boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.25)",
  },
};

class YoutubeAnalytics extends React.Component {
  interval;
  state = {
    NbView: "",
    ID: "",
    NbLike: "",
    NbDislike: "",
  };

  load = () => {
    const apikey = "AIzaSyDbB8TFiUCVdenG1rk8ObLdBQFkTIMwtBw";
    const { videoId } = this.props;
    this.interval = setInterval(() => {
      fetch(
        "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" +
          videoId +
          "&key=" +
          apikey
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          this.setState({
            NbView: res.items[0].statistics.viewCount,
            ID: res.items[0].id,
            NbLike: res.items[0].statistics.likeCount,
            NbDislike: res.items[0].statistics.dislikeCount,
          });
        });
    }, 5000);
  };
  componentDidMount() {
    this.load();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { NbView, ID, NbLike, NbDislike } = this.state;

    const { videoId, onDelete } = this.props;

    return (
      <Card style={{ width: "18rem", backgroundColor: "#d61c1c" }}>
        <CardActionArea href={"https://www.youtube.com/watch?v=" + ID}>
          <CardContent>
            <img
              style={{ width: "100%" }}
              src={`https://img.youtube.com/vi/${ID}/0.jpg`}
            />
            <Typography
              gutterBottom
              variant="h5"
              component="h3"
              style={{ color: "#ffffff" }}
            >
              {"Number of View:" + NbView}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h3"
              style={{ color: "#ffffff" }}
            >
              {"Number of Like:" + NbLike}
            </Typography>
            {NbDislike && (
              <Typography
                gutterBottom
                variant="h5"
                component="h3"
                style={{ color: "#ffffff" }}
              >
                {"Number of Dislike:" + NbDislike}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="secondary"
            style={{ backgroundColor: "#ffffff" }}
            onClick={() => onDelete(videoId)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

YoutubeAnalytics.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  videoId: PropTypes.string,
  onDelete: PropTypes.func,
};

YoutubeAnalytics.defaultProps = {
  videoId: "",
  onDelete: () => null,
};

export default withStyles(styles)(YoutubeAnalytics);
