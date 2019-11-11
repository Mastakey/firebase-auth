import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavProfile from "./NavProfile";

// Material UI Components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

//Icons

const styles = {
  root: {
    flexGrow: 1
  },
  home: {
    flexGrow: 1,
    justifyContent: "flex-start"
  }
};

class NavBar extends Component {
  render() {
    const classes = this.props.classes;
    const authenticated = this.props.authenticated;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className="nav-container">
            <div className={classes.home}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
            </div>
            {!authenticated ? (
              <Fragment>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component={Link} to="/logout">
                  Logout
                </Button>
              </Fragment>
            )}

            <NavProfile />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(NavBar));
