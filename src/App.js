import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import './App.css';
import Login from "./pages/Login/Login";
import HomePage from "./pages/HomePage";

class App extends Component {
    render() {
        return (
            <div className={'app'}>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </div>
        )
    }
}

export default App;