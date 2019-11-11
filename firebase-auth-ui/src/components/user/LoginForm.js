import React, { Component } from "react";
import PropTypes from "prop-types";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleSubmit = async event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    await this.props.loginUser(userData, this.props.history);
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
            id="outlined-password-input"
            name="password"
            label="Password"
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
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </form>
      </Grid>
    );
  }
}

LoginForm.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(LoginForm);
