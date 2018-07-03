import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';

class AuthenticationLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={0}
                        alignContent="center"
                        alignItems="center"
                        justify="center">
                        <Grid
                            item
                            xs={10}
                            sm={4}
                            xl={2}>
                            {this.props.children}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default AuthenticationLayout;
