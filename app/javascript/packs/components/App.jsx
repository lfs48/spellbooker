import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Spellbook from './spellbook/spellbook';
import Splash from './splash';
import Modal from './modal';

const App = () => (
    <main id="app-container">
        <Modal />
        <Switch>
            <Route path="/spellbook" component={Spellbook} />
            <Route path="/" component={Splash} />
        </Switch>
    </main>
);

export default App;