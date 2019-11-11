import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//redux
import { signUp, clearUser } from "../redux/actions/userActions";
import { clearErrors } from "../redux/actions/uiActions";

//components
import SignupForm from "../components/user/SignupForm";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const styles = {};

class Signup extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
    this.props.clearUser();
  }
  render() {
    const authenticated = this.props.user.authenticated;
    const loading = this.props.UI.loading;
    return (
      <Grid container alignItems="center" direction="column" justify="center" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2">Signup</Typography>
        </Grid>
        {!authenticated ? (
          <Fragment>
            <SignupForm signUp={this.props.signUp} loading={loading} isConfirmPage={this.props.user.signup.isConfirmPage}/>
            <Grid item xs={12}>
            {this.props.UI.errors && this.props.UI.errors.email ? (
              <Typography variant="body1" color="secondary">{this.props.UI.errors.email}</Typography>
            ) : null}
            {this.props.UI.errors && this.props.UI.errors.username ? (
              <Typography variant="body1" color="secondary">{this.props.UI.errors.username}</Typography>
            ) : null}
            {this.props.UI.errors && this.props.UI.errors.password ? (
              <Typography variant="body1" color="secondary">{this.props.UI.errors.password}</Typography>
            ) : null}
            {this.props.UI.errors && this.props.UI.errors.confirmPassword ? (
              <Typography variant="body1" color="secondary">{this.props.UI.errors.confirmPassword}</Typography>
            ) : null}
            {this.props.UI.errors && this.props.UI.errors.general ? (
              <Typography variant="body1" color="secondary">{this.props.UI.errors.general}</Typography>
            ) : null}
            </Grid>
          </Fragment>
        ) : (
          <Fragment>Already Logged in</Fragment>
        )}
      </Grid>
    );
  }
}

Signup.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { signUp, clearErrors, clearUser }
)(withStyles(styles)(Signup));
