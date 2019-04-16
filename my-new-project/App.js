import React, {Component} from "react";
import Routes from "./Routes";
import {TabNavigator} from 'react-navigation'
//const App = () => <Routes/>

export default class App extends React.Component {
    render() {
       return (
          <Routes/>
       )
    }
}

/*import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default class App extends React.Component {
 
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
            placeholder="Pseudo ou mail"/>
        <TextInput style={styles.input}
        placeholder="Mot de passe"/>
        <Button title="Log In" 
        onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: { width:300, height:40, backgroundColor:'rgba(0, 0, 0, 0.7)', color:'#fff', marginBottom: 10 }
});

*/