import React , { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Login from './component/Login';
import Home from './component/Home';
import Register from './component/Register';
import Photo from './component/Photo';
import Profile from './component/Profile';

export default class Routes extends Component {
    render() {
        return (
    <Router>
        <Stack key="root" hideNavBar={true}>
            <Scene key="login" component={Login} title="Login"/>
            <Scene key="home" tabs tabBarOptions={{activeTintColor: "#fff",inactiveTintColor: "#601e96", activeBackgroundColor:"#427df4", inactiveBackgroundColor:"#9fa4ad" }}
                           hideNavBar={true}>
                        <Scene key="home" component={Home} title="Home" initial hideNavBar={true}/>
                        <Scene key="photo" component={Photo} title="Photo" hideNavBar={true}/>
                        <Scene key="profile" component={Profile} title="Profile" hideNavBar={true}/>
                    </Scene>
            
            <Scene key="register" component={Register} title="Register"/>
            <Scene key="photo" component={Photo} title="Photo"/>
        </Stack>
    </Router>
        )
    }
}