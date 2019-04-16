import React from 'react';
import { Button, View, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
   };

  login() {
      Actions.replace("login");
  }

  photo() {
      Actions.replace("photo");
  }

 render() {
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>

   <Button title="Go back to Login"
   onPress={() => this.login()} 
   />
   <Button title="Go take picture"
   onPress={() => this.photo()}
   />
  </View>
);
}
}

export default Home;