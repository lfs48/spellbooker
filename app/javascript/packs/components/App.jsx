import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Spellbook from './spellbook';

const App = () => (
    <main id="app-container">
        <Switch>
            <Route path="/" component={Spellbook} />
        </Switch>
    </main>
);

export default App;