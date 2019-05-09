import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

class Register extends React.Component {
  static navigationOptions = {
    title: 'Register'
   };

   constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
    };
  };

  render() {
    return (
    <View style={styles.container}>
        <TextInput style={styles.input}
            placeholder="Entrez votre email"
            onChangeText={this.onChangeEmail}
          value={this.state.email}/>
        <TextInput style={styles.input}
        placeholder="Mot de passe"
        onChangeText={this.onChangePassword}
          value={this.state.password}/>
        <Button title="Sign Up !"
        onPress={() => this.home()} 
        />
        <Button title="Log In !"
        onPress={() => this.login()} 
        />
    </View>
    );
  }

  onChangeEmail = (email) => {
      this.setState({email})
  };

  onChangePassword = (password) => {
     this.setState({password})
  };

  login() {
    Actions.replace("login")
  }

  home() {
    if (this.state.email.length < 1 || this.state.password.length < 1) {
      ToastAndroid.showWithGravity(
          'Email or password field is empty !',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
      );
      return
    }
    axios.post('http://10.0.2.2:3000/user/register', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            let obj = response.data
            console.log(response.data)
            if (obj["register"] != null) {
              ToastAndroid.showWithGravity(
                obj["message"],
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
              Actions.replace("login");
            }
        }).catch(error => {
            ToastAndroid.showWithGravity(
              "Invalid email or password.",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
        })
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