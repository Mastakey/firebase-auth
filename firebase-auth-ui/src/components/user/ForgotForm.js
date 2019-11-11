import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {};

class ForgotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  handleSubmit = async event => {
    event.preventDefault();
    const userData = {
      email: this.state.email
    };
    await this.props.forgotPassword(userData);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const classes = this.props.classes;
    const loading = this.props.loading;
    return (
      <Grid item xs={12} sm={6}>
        {this.props.isConfirmPage ? (
          <Fragment>
            <p>Success! Check your email on instructions to reset your password.</p>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Fragment>
        ) : (
          <form>
            <TextField
              required
              fullWidth
              id="outlined-email-input"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
              disabled={loading}
            >
              Reset Password
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
        )}
      </Grid>
    );
  }
}

ForgotForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  isConfirmPage: PropTypes.bool.isRequired
};

export default withStyles(styles)(ForgotForm);
