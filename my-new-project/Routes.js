import React , { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Login from './component/Login';
import Home from './component/Home';
import Register from './component/Register';
import Photo from './component/Photo';

export default class Routes extends Component {
    render() {
        return (
    <Router>
        <Stack key="root" hideNavBar={true}>
            <Scene key="login" component={Login} title="Login"/>
            <Scene key="home" component={Home} title="Home"/>
            <Scene key="register" component={Register} title="Register"/>
            <Scene key="photo" component={Photo} title="Photo"/>
        </Stack>
    </Router>
        )
    }
}