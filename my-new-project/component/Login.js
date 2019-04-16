import React from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login'
   };

  render() {
    return (
    <View style={styles.container}>
        <TextInput style={styles.input}
            placeholder="Pseudo ou mail"/>
        <TextInput style={styles.input}
        placeholder="Mot de passe"/>
        <Button title="Go take picture"
        onPress={() => this.photo()}
        />
        <Button title="Log In !"
        onPress={() => this.home()} 
        />
    </View>
    );
  }

  photo() {
    Actions.replace("photo");
  }

  home() {
    Actions.replace("home");
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: { width:300, height:40, backgroundColor:'rgba(0, 0, 0, 0.7)', color:'#fff', marginBottom: 10 }
});