  import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const Root = ({store}) => (
    <Provider store={store}>
        <CookiesProvider>
            <HashRouter>
                <App />
            </HashRouter>
        </CookiesProvider>
    </Provider>
);

export default Root;