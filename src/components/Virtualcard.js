import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { useParams, useHistory, Route } from "react-router-dom";
import Card from "./Card";
import { data } from "../utitliy/data";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 18,
    backgroundColor: theme.palette.background.paper,
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#fff",
      color: "#000",
    },
    "& .MuiTab-wrapper": {
      alignItems: "flex-start",
    },
  },
}));

function Virtualcard() {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const [value, setValue] = React.useState("Your");
  const [blocked, setBlocked] = useState([]);
  const [OwnerId, setOwnerId] = useState([]);

  useEffect(() => {
    let blocked = data.filter((e) => e.status === "blocked");
    let ownerId = data.filter((e) => e.owner_id === 1);
    setBlocked(blocked);
    setOwnerId(ownerId);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/${newValue}`);
  };
  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Your" value="Your" />
            <Tab label="All" value="All" />
            <Tab label="Blocked" value="Blocked" />
          </TabList>
        </AppBar>
        <TabPanel value="Your">
          <Card data={OwnerId} />
        </TabPanel>
        <TabPanel value="All">
          <Card data={data} />
        </TabPanel>
        <TabPanel value="Blocked">
          <Card data={blocked} />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default Virtualcard;
