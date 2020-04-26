import React, { Component } from "react";
import { withStyles, Typography, Link } from '@material-ui/core';
import { withRouter } from "react-router-dom";

const styles = theme => ({
    footer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: '#fe7f09',
        color: '#000',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            paddingLeft: '250px'
        },
    },
});

class Footer extends Component {

    render() {
        const { classes } = this.props;

        return(                      
            <div className={classes.footer}>
                <Typography variant="subtitle2">Criado por: Alan Teixeira</Typography>                
                <Typography variant="subtitle2">
                    Github: <Link href="https://github.com/alanfrnk/" target="_blank" rel="noopener noreferrer">https://github.com/alanfrnk</Link>
                    &nbsp; 
                    LinkedIn: <Link href="https://www.linkedin.com/in/alan-teixeira/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/alan-teixeira</Link>
                </Typography>
            </div>              
        );
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(Footer));