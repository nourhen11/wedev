import React from 'react';
import ReactDOM from 'react-dom';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


// Mes Assets
import './assets/sass/helpers/variables.js';
import './assets/sass/style.scss';

import {BrowserRouter} from 'react-router-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
