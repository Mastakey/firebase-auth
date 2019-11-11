import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//Actions
import {getUserData} from '../redux/actions/userActions';

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {
    title: {
        display: "inline-block"
    },
    fullBorder: {
        border: "1px solid"
    }
}

class Home extends Component {
    
    render() {
        //this.props.user
        const classes = this.props.classes;
        return (
            <Fragment>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} className={classes.fullBorder}>
                    <Typography variant="h2" className={classes.title}>
                        Section 1
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.fullBorder}>
                    <Typography variant="h2" className={classes.title}>
                        Section 2
                    </Typography>
                  </Grid>
                </Grid>
                
            </Fragment>
        )
    }
}

Home.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {getUserData})(withStyles(styles)(Home));