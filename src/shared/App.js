import React, {Component} from 'react';
import routes from './routes';
import {Route, Switch} from 'react-router-dom';
import NoMatch from './NoMatch';
import {withStyles} from '@material-ui/core/styles';
import withRoot from './withRoot';
import PageLayout from './pages/PageLayout';

class App extends Component {
    render() {
        return (
            <div>
                <PageLayout/>
                <Switch>
                    {routes.map(({path, exact, component: Component, ...rest}) => (
                        <Route key={path} path={path} exact={exact} render={(props) => (
                            <Component {...props} {...rest} />
                        )}/>
                    ))}
                    <Route render={(props) => <NoMatch {...props} />}/>
                </Switch>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
});
export default withRoot(withStyles(styles)(App));