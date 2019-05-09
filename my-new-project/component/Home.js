import React from 'react';
import { Button, View, Text, Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
    };
    this.init_email();
  }

  init_email() {
    AsyncStorage.getItem('email', (err, getEmail) => {
        this.setState(
            { email : getEmail }
        )
    });
}
  static navigationOptions = {
    title: 'Home'
   };

  login() {
      Actions.replace("login");
  }

 render() {
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>

  <Text
   value={this.state.email}>
    welcome {this.state.email}
    </Text>

   <Button title="Go back to Login"
   onPress={() => this.login()} 
   />
  </View>
);
}
}

export default Home;