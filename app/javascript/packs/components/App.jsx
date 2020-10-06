import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Spellbook from './spellbook/spellbook';
import Splash from './splash';
import Modal from './modal';

const App = () => (
    <main id="app-container">
        <Modal />
        <Switch>
            <Route path="/spellbook/edit/:url" component={Spellbook} />
            <Route path="/spellbook/view/:url" component={Spellbook} />
            <Route exact path="/spellbook">
                <Redirect to="/spellbook/srd"/>
            </Route>
            <Route path="/" component={Splash} />
        </Switch>
    </main>
);

export default App;