import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";
// Material UI Components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = {
    accountIcon: {

    }
}

export class NavProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          anchorEl: null
        };
        this.handleProfileOpen = this.handleProfileOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }
      handleProfileOpen(event){
        this.setState({
          anchorEl: event.currentTarget
        })
      }
      handleClose(){
          this.setState({
              anchorEl: null
          });
      }
    render() {
        const classes = this.props.classes;
        return (
            <Fragment>
                <Button 
                color="inherit" 
                onClick={this.handleProfileOpen}
                aria-controls="simple-menu" 
                aria-haspopup="true"
              >
                <AccountCircleIcon className={classes.accountIcon} fontSize="large"/>
              </Button>
              <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem component={Link} to="/logout">Logout</MenuItem>
              </Menu>
            </Fragment>
        )
    }
}

export default withStyles(styles)(NavProfile)
