import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { WhastAppBanner } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
    top: "50%",
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    backgroundColor: "#00BFA5",
    minHeight: "60%",
    minWidth: "80%",
  },
}));

export default function Logout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <WhastAppBanner />
            <h1>You are Logged out!</h1>
            <hr />
            <Link to="/login">
              <h1>Login</h1>
            </Link>{" "}
            <Link to="/register">
              <h1>Sign Up</h1>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
