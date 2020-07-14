import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import Root from './components/root';

const cb = () => {

    let preloadedState = {
      ui: {
        filters: {
          classFilter: null,
          levelFilter: null,
          schoolFilter: null
        }
      }
    };
    const store = configureStore(preloadedState);

    const root = document.getElementById("root");
    
    ReactDOM.render(<Root store={store} />, root);

    $.ajaxSetup({
      headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') }
    });
    $('meta[name="csrf-token"]').remove();
    $('meta[name="authenticity-token"]').remove();

    document.addEventListener("dragstart", function( event ) {
      var img = new Image();
      event.dataTransfer.setDragImage(img, 0, 0);
    }, false);

};

document.addEventListener("DOMContentLoaded", cb);