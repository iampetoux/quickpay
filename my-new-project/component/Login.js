import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, ToastAndroid, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login'
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
          placeholder="Email"
          onChangeText={this.onChangeEmail}
          value={this.state.email}
        />
        <TextInput style={styles.input}
          placeholder="Password"
          onChangeText={this.onChangePassword}
          value={this.state.password}
        />
        <Button title="Create an account !"
          onPress={() => this.register()} 
        />

        <Button title="Log In !"
        onPress={() => this.home()} 
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

  register() {
      Actions.replace("register");
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
    axios.post('http://10.0.2.2:3000/user/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            let obj = response.data
            console.log(obj);
            if (obj != null) {
              let email = obj["login"];
              let token = obj["token"];
              AsyncStorage.setItem('email', email, () => {
                  AsyncStorage.mergeItem('email', email);
              });
              AsyncStorage.setItem('token', token, () => {
                AsyncStorage.mergeItem('token', token);
              });
              Actions.replace("home");
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