import React from 'react';
import {hydrate} from 'react-dom';
import App from '../shared/App';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from '../shared/registerServiceWorker';
hydrate(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('app')
);
registerServiceWorker();