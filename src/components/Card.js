import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Grid, Typography, Chip } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { green } from "@material-ui/core/colors";
import LoopIcon from "@material-ui/icons/Loop";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#07925c",
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 25,
    boxSizing: "border-box",
    "& .MuiChip-root": {
      borderRadius: "7px",
      height: "26px",
    },
    "& .MuiListItem-secondaryAction": {
      padding: "0px",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  iconCover: {
    height: "32px",
    width: "32px",
    padding: "10px",
    borderRadius: "50%",
    textAlign: "center",
    boxShadow: "0px 5px 9px 0px #ded4d4",
  },
});

function CardComponent(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Grid container xs={12}>
      {props.data.map((e) => (
        <Grid xs={6} className={classes.root}>
          <Card>
            <CardContent>
              <Grid container justifyContent="space-between">
                <Grid>
                  <Typography variant="h5" component="h2">
                    {e.name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {e.owner_name} {bull} {e.budget_name}
                  </Typography>
                </Grid>
                <Grid className={classes.iconCover}>
                  <WhatshotIcon color="secondary" />
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between">
                <Chip label={e.card_type} variant="outlined" />
                <Typography className={classes.pos} color="textSecondary">
                  {e.expiry}&nbsp; Limit: &nbsp;{e.limit}SGD
                </Typography>
              </Grid>
              <BorderLinearProgress variant="determinate" value={50} />
              <List dense>
                <ListItem button>
                  <ListItemAvatar>
                    <FiberManualRecordIcon color="secondary" />
                  </ListItemAvatar>
                  <ListItemText primary="Spent" />
                  <ListItemSecondaryAction>0 SGD</ListItemSecondaryAction>
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <FiberManualRecordIcon style={{ color: green[500] }} />
                  </ListItemAvatar>
                  <ListItemText primary="Available to spend" />
                  <ListItemSecondaryAction>9 SGD</ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default CardComponent;
