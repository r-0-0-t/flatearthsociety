import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { width } from "@material-ui/system";

const useStyles = makeStyles({
  card: {
    margin: "20px",
    minWidth: 275,
    width: "fit-content"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});
const Post = props => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <strong>{props.data.belongs_to}</strong> wrote
        </Typography>
        <Typography variant="h5" component="h2">
          {props.data.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          5 likes {bull} 4 dislikes
        </Typography>
        <Typography variant="body2" component="p">
          {props.data.body}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
