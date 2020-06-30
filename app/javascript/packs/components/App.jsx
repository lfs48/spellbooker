import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Spellbook from './spellbook/spellbook';
import Splash from './splash';

const App = () => (
    <main id="app-container">
        <Switch>
            <Route path="/spellbook" component={Spellbook} />
            <Route path="/" component={Splash} />
        </Switch>
    </main>
);

export default App;