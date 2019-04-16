import React from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Register extends React.Component {
  static navigationOptions = {
    title: 'Register'
   };

  render() {
    return (
    <View style={styles.container}>
        <TextInput style={styles.input}
            placeholder="Entrez votre email"/>
        <TextInput style={styles.input}
        placeholder="Mot de passe"/>
        <Button title="Sign Up !"
        onPress={() => this.home()} 
        />
    </View>
    );
  }

  home() {
    Actions.replace("home");
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: { width:300, height:40, backgroundColor:'rgba(0, 0, 0, 0.7)', color:'#fff', marginBottom: 10 }
});