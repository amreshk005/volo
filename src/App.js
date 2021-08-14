import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Route, Switch } from "react-router-dom";
import Virtualcard from "./components/Virtualcard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#fff",
      color: "#000",
      boxShadow: "none",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: "#fff",
    boxShadow: "none",
    textTransform: "capitalize",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Virtual Cards
          </Typography>
          <Button variant="contained" className={classes.button} startIcon={<AddIcon />}>
            Virtual Card
          </Button>
        </Toolbar>
      </AppBar>
      <Virtualcard />
    </div>
  );
}

export default App;
