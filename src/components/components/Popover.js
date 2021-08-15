import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    "& .MuiFormGroup-root": {
      flexDirection: "row",
    },
    "& .MuiOutlinedInput-input": {
      padding: "11.5px 14px",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
      borderRadius: "5px 5px 0 0",
    },
    "& .MuiFormLabel-root": {
      marginBottom: "10px",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgba(0, 0, 0, 0.54)",
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
  Listroot: {
    // padding: "15px",
    marginTop: "10px",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  Listtitle: {
    margin: theme.spacing(4, 0, 2),
  },
  selectForm: {
    width: "100%",
  },
  button: {
    width: "40%",
    margin: theme.spacing(4, 0, 2, 0),
  },
}));

function Popovers(props) {
  const id = props.open ? "simple-popover" : undefined;
  const classes = useStyles();
  const [state, setState] = useState({
    Subscription: false,
    Burner: false,
  });
  const [select, setSelect] = useState("");

  useEffect(() => {
    setState({
      Subscription: false,
      Burner: false,
    });
    setSelect("");
  }, [props.value]);

  const handleChange = (event) => {
    let updatedData = { ...state, [event.target.name]: event.target.checked };
    setState(updatedData);
    props.handleSearch(updatedData, "checkbox");
    console.log(event.target.name);
    setSelect("");
  };

  const handleSelect = (e) => {
    setState({
      Subscription: false,
      Burner: false,
    });
    setSelect(e.target.value);
    props.handleSearch(e.target.value, "dropdown");
  };

  const { Subscription, Burner } = state;

  return (
    <div>
      <Popover
        id={id}
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Filters
            </Typography>
            <Divider variant="fullWidth" />

            <div className={classes.Listroot}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Type</FormLabel>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={Subscription} onChange={handleChange} name="Subscription" />} label="Subscription" />
                  <FormControlLabel control={<Checkbox checked={Burner} onChange={handleChange} name="Burner" />} label="Burner" />
                </FormGroup>
              </FormControl>
            </div>
            <FormControl variant="outlined" className={classes.selectForm}>
              <FormLabel component="legend">Type</FormLabel>
              <Select
                native
                value={select}
                onChange={handleSelect}
                inputProps={{
                  name: "age",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />

                {props.dropdown.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </Select>
            </FormControl>
            <Grid container justifyContent="space-between">
              <Button variant="contained" color="secondary" className={classes.button}>
                Apply
              </Button>

              <Button variant="contained" color="default" className={classes.button} onClick={props.handleClose}>
                Clear
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
}

export default Popovers;
