import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { useParams, useHistory } from "react-router-dom";
import Card from "./components/Card";
import { data } from "../utitliy/data";
import { useState } from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import InputBase from "@material-ui/core/InputBase";
import { alpha } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Popover from "./components/Popover";
import InfiniteScroll from "react-infinite-scroll-component";

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
  button: {
    // backgroundColor: "#fff",
    boxShadow: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Virtualcard() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [blocked, setBlocked] = useState([]);
  const [OwnerId, setOwnerId] = useState([]);
  const [All, setAll] = useState([]);
  const [smallblocked, setSmallBlocked] = useState([]);
  const [smallOwnerId, setSmallOwnerId] = useState([]);
  const [smallAll, setSmallAll] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hasmore, setHasmore] = useState({
    blocked: true,
    OwnerId: true,
    All: true,
  });
  const [searchInput, setSearchInput] = useState("");
  const [dropdown, setDropdown] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const setInitialData = () => {
    let blocked = data.filter((e) => e.status === "blocked");
    let ownerId = data.filter((e) => e.owner_id === 1);
    setBlocked(blocked);
    setOwnerId(ownerId);
    setAll(data);
    setSmallOwnerId(ownerId.slice(0, ownerId.length / 2));
    setSmallAll(data.slice(0, data.length / 2));
    setSmallBlocked(ownerId.slice(0, ownerId.length / 2));
    setHasmore({
      blocked: true,
      OwnerId: true,
      All: true,
    });
  };
  useEffect(() => {
    setInitialData();
    setDropdown([...new Set(data.map((e) => e.owner_name))]);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/${newValue}`);
  };

  const handleSearch = (input, type) => {
    if (input === "") {
      setInitialData();
    } else if (type === "input") {
      if (value === "1") {
        let owner_id = data.filter((e) => e.owner_id === 1 && e.name.toLowerCase().includes(input.toLowerCase()));
        setSmallOwnerId(owner_id);
      } else if (value === "2") {
        let owner_id = data.filter((e) => e.name.toLowerCase().includes(input.toLowerCase()));
        setSmallAll(owner_id);
      } else if (value === "3") {
        let owner_id = data.filter((e) => e.status === "blocked" && e.name.toLowerCase().includes(input.toLowerCase()));
        setSmallBlocked(owner_id);
      }
    } else if (type === "checkbox") {
      let getChecked = Object.keys(input).filter((e) => input[e]);
      if (getChecked.length === 1) {
        if (value === "1") {
          let owner_id = data.filter((e) => e.owner_id === 1 && e.card_type.toLowerCase().includes(getChecked[0].toLowerCase()));
          setSmallOwnerId(owner_id);
        } else if (value === "2") {
          let owner_id = data.filter((e) => e.card_type.toLowerCase().includes(getChecked[0].toLowerCase()));
          setSmallAll(owner_id);
        } else if (value === "3") {
          let owner_id = data.filter((e) => e.status === "blocked" && e.card_type.toLowerCase().includes(getChecked[0].toLowerCase()));
          setSmallBlocked(owner_id);
        }
      } else {
        setInitialData();
      }
    } else if (type === "dropdown") {
      if (value === "1") {
        let owner_id = data.filter((e) => e.owner_id === 1 && e.owner_name.toLowerCase().includes(input.toLowerCase()));
        setSmallOwnerId(owner_id);
      } else if (value === "2") {
        let owner_id = data.filter((e) => e.owner_name.toLowerCase().includes(input.toLowerCase()));
        setSmallAll(owner_id);
      } else if (value === "3") {
        let owner_id = data.filter((e) => e.status === "blocked" && e.owner_name.toLowerCase().includes(input.toLowerCase()));
        setSmallBlocked(owner_id);
      }
    }
  };

  const handleInput = (event) => {
    setSearchInput(event.target.value);
    handleSearch(event.target.value, "input");
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setHasmore({
        blocked: false,
        OwnerId: false,
        All: false,
      });
      setSmallOwnerId(OwnerId);
      setSmallAll(data);
      setSmallBlocked(blocked);
    }, 1500);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Your" value="1" />
            <Tab label="All" value="2" />
            <Tab label="Blocked" value="3" />
          </TabList>
        </AppBar>
        <Grid container justifyContent="flex-end">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search???"
              value={searchInput}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleInput}
            />
          </div>
          <Popover anchorEl={anchorEl} handleClose={handleClose} open={open} dropdown={dropdown} data={data} handleSearch={handleSearch} value={value} />
          <Button variant="contained" color="default" className={classes.button} startIcon={<FilterListIcon />} onClick={handleClick}>
            Filter
          </Button>
        </Grid>
        <TabPanel value="1">
          <InfiniteScroll dataLength={smallOwnerId.length} next={fetchMoreData} hasMore={hasmore.OwnerId} loader={<h4>Loading...</h4>}>
            <Card data={smallOwnerId} />
          </InfiniteScroll>
        </TabPanel>
        <TabPanel value="2">
          <InfiniteScroll dataLength={smallAll.length} next={fetchMoreData} hasMore={hasmore.All} loader={<h4>Loading...</h4>}>
            <Card data={smallAll} />
          </InfiniteScroll>
        </TabPanel>
        <TabPanel value="3">
          <InfiniteScroll dataLength={blocked.length} next={fetchMoreData} hasMore={hasmore.blocked} loader={<h4>Loading...</h4>}>
            <Card data={smallblocked} />
          </InfiniteScroll>
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default Virtualcard;
