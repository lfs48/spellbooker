import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import Root from './components/root';

import * as SpellsAPIUtil from './util/api/spells_api_util';
import * as SpellActions from './actions/spell_actions';

const cb = () => {

    let preloadedState = {};
    const store = configureStore(preloadedState);

    const root = document.getElementById("root");
    
    ReactDOM.render(<Root store={store} />, root);

    $.ajaxSetup({
      headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') }
    });
};

document.addEventListener("DOMContentLoaded", cb);