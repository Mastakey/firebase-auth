import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//redux
import {logoutUser} from '../redux/actions/userActions';

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
}

class Logout extends Component {
    componentDidMount(){
        this.props.logoutUser();
    }
    render() {
        return (
            <Fragment>
            {this.props.user && !this.props.user.authenticated ? (
                <Fragment>You are logged out</Fragment>
            ) : <Fragment>Still logged in</Fragment>}
            </Fragment>
        )
    }
}

Logout.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, {logoutUser})(withStyles(styles)(Logout));