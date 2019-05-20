import React from 'react';
import { Button, View, Text, Alert, AsyncStorage, ToastAndroid, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        picture: null,
        token: '',
        email: ''
    };
    this.init_token();
    this.profile = this.profile.bind(this)
  }

  componentWillMount() { this.init_token }

  init_token() {
    AsyncStorage.getItem('token', (err, getToken) => {
        this.setState(
            { token : getToken }
        )
        this.profile(this.state.token);
    });
  }

  profile = (token) => {
    axios.get('http://10.0.2.2:3000/user/profile', {headers: {
      'Content-Type': 'application/json',
      'token': token
    }})
    .then(response => {
      let obj = response.data
      console.log(obj);
      this.setState({ email: obj['email']})
      this.setState({ picture: obj['picture'] });
    }).catch(error => {
      console.log(error.response.data + "test");
  })
  }

static navigationOptions = {
      title: 'Profile'
};

updateprofile() {
  Actions.replace("updateprofile");
}

render() {
  let { picture } = this.state;
 return (

  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
  <Text>Photo du profil</Text>
  {picture && <Image source={{ uri: 'http://10.0.2.2:3000/' + picture }}
  style={{width: 100, height: 100, borderRadius: 100/ 2}} /> }
  <Text>Nom</Text>
  <Text>Mon code QR</Text>
  <Text onPress= {() => this.updateprofile()}>Plus</Text>
  <Text
   value={this.state.email}>
    email : {this.state.email}
    </Text>
  </View>
);
}
}

export default Profile;