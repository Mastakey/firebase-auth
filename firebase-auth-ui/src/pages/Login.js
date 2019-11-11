import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//actions
import { loginUser } from "../redux/actions/userActions";
import { clearErrors } from "../redux/actions/uiActions";

//components
import LoginForm from "../components/user/LoginForm";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

import { Typography } from "@material-ui/core";

const styles = {};

export class Login extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {
    //const classes = this.props.classes;
    const loading = this.props.UI.loading;
    //Errors
    const errors = this.props.UI.errors;
    const keys = errors ? Object.keys(errors) : [];
    let errorStr = "";
    keys.forEach(key => {
      errorStr += errors[key];
    });
    return (
      <Fragment>
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Typography variant="h2">Login</Typography>
          </Grid>
          <LoginForm
            loading={loading}
            loginUser={this.props.loginUser}
            history={this.props.history}
          />
          <Grid item xs={12}>
            <Typography variant="body1" color="secondary">
              {this.props.UI.errors && errorStr}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" component={Link} to="/forgotpass">
              Forgot Password?
            </Typography>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
