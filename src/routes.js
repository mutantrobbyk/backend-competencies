import React from "react";
import { Switch, Route } from "react-router-dom";
import Test from './components/Test'
import Users from './components/Users'

export default (
    <Switch>
        <Route path='/test/' component={Test}/>
    </Switch>
)