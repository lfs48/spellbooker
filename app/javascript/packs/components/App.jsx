import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Spellbook from './spellbook/spellbook';
import Splash from './splash';
import Modal from './modal/modal';
import Footer from './footer';
import About from './about';

const App = () => (
    <main id="app-container">
        <Modal />
        <Switch>
            <Route path="/spellbook/edit/:url" component={Spellbook} />
            <Route path="/spellbook/view/:url" component={Spellbook} />
            <Route path="/about" component={About} />
            <Route exact path="/spellbook">
                <Redirect to="/spellbook/srd"/>
            </Route>
            <Route path="/" component={Splash} />
        </Switch>
        <Footer />
    </main>
);

export default App;