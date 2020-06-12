import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import Root from './components/root';

const cb = () => {

    let preloadedState = {};
    const store = configureStore(preloadedState);

    const root = document.getElementById("root");

    ReactDOM.render(<Root store={store} />, root);
};

document.addEventListener("DOMContentLoaded", cb);