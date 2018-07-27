
import React, {Component} from 'react';

import Page from '../Page';
import createRoutes from "../../routes";
import {title, meta, link} from '../assets';
const Routes = createRoutes();

class App extends Component {

    render() {
        return (
            <div id="app">

                <Page title={title} meta={meta} link={link}>
                </Page>
                <div id="content">
                    <Routes/>
                </div>
            </div>
        );
    }
}
export default App;
