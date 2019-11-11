import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//redux
import { forgotPassword } from "../redux/actions/userActions";

//components
import ForgotForm from "../components/user/ForgotForm";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {};

class Forgot extends Component {
  render() {
    const loading = this.props.UI.loading;
    const errors = this.props.UI.errors;
    const errorKeys = errors ? Object.keys(errors) : [];
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
            <Typography variant="h2">Forgot Password</Typography>
          </Grid>
          <ForgotForm
            loading={loading}
            forgotPassword={this.props.forgotPassword}
            isConfirmPage={this.props.user.forgot.isConfirmPage}
          />
          <Grid item xs={12}>
            <Typography variant="body1" color="secondary">
              {this.props.UI.errors &&
                errorKeys.map(key => {
                  return <div id={key}>{errors[key]}</div>
                })}
            </Typography>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Forgot.propTypes = {
  forgotPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { forgotPassword }
)(withStyles(styles)(Forgot));
