import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  textField: {},
  header: {
    marginBottom: 10
  },
  submit: {}
};

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      username: this.state.username
    };
    await this.props.signUp(userData, this.props.history);
  };
  render() {
    const classes = this.props.classes;
    return (
      <Grid item xs={12} sm={6}>
        {this.props.isConfirmPage ? (
          <Fragment>
            <p>Success! Check your email to verify you email.</p>
            <Button color="inherit" component={Link} to="/login">Login</Button>
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
            <TextField
              required
              fullWidth
              id="outlined-username-input"
              label="Username"
              className={classes.textField}
              type="text"
              name="username"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
            />
            <TextField
              required
              fullWidth
              id="outlined-password-input-1"
              name="password"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
            />
            <TextField
              required
              fullWidth
              id="outlined-password-input-2"
              name="confirmPassword"
              label="Confirm Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
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
              disabled={this.props.loading}
            >
              Sign Up
              {this.props.loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
        )}
      </Grid>
    );
  }
}

SignupForm.propTypes = {
  signUp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isConfirmPage: PropTypes.bool.isRequired
};

export default withStyles(styles)(SignupForm);
