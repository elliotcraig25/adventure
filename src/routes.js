import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ViewInterface from './screens/mainScreens/viewInterface';
import BuildInterface from './screens/mainScreens/buildInterface';
import PlayInterface from './screens/mainScreens/playInterface';

export default (
    <Switch>
        <Route exact path='/' component={ViewInterface} />
        <Route path='/build' component={BuildInterface} />
        <Route path='/play' component={PlayInterface} />
    </Switch>
)