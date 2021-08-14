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

function CardComponent() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Grid container xs={12}>
      {[1, 2].map((e) => (
        <Grid xs={6} className={classes.root}>
          <Card>
            <CardContent>
              <Grid container justifyContent="space-between">
                <Grid>
                  <Typography variant="h5" component="h2">
                    Mixmax
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    adjective {bull} Software Subscription
                  </Typography>
                </Grid>
                <Grid className={classes.iconCover}>
                  <WhatshotIcon color="secondary" />
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between">
                <Chip label="Burner" variant="outlined" />
                <Typography className={classes.pos} color="textSecondary">
                  Expires: &nbsp;9 &nbsp;Feb
                </Typography>
              </Grid>
              <BorderLinearProgress variant="determinate" value={50} />
              <List dense>
                {[0, 1].map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return (
                    <ListItem key={value} button>
                      <ListItemAvatar>
                        <FiberManualRecordIcon />
                      </ListItemAvatar>
                      <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                      <ListItemSecondaryAction>{value} SGD</ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default CardComponent;
