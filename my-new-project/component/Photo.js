import React from 'react';
import { Button, Image, View, AsyncStorage } from 'react-native';
import { ImagePicker } from 'expo';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

export default class ImagePickerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        image:null,
        token: ''
    };
    this.init_token();
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from your gallery !"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Button
          title="Take a picture"
          onPress={this.camera}
        />
        <Button
          title="Add photo"
          onPress={() => this.addphoto()}
        />
      </View>
    );
  }

  init_token() {
    AsyncStorage.getItem('token', (err, getToken) => {
        this.setState(
            { token : getToken }
        )
    });
  }

  camera = async () => {
    await this.askPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            // allowsEditing: true,
            aspect: [1, 1],
            base64: false,
        });

        if (!result.cancelled) {

        }
  };

  addphoto () {
    console.log(this.state.image);
    const formData = new FormData();
    formData.append('filename', {uri: this.state.image, name:'ok.jpg', type:'image/jpeg'});
    const config = {
      headers: {
          'content-type': 'multipart/form-data',
          'token': this.state.token
      }
    };
    console.log(config);
    axios.post('http://10.0.2.2:3000/user/profile/photo',formData, config).then(response => {
      let obj = response.data
      Actions.replace("home");
  }).catch(error => {
      ToastAndroid.showWithGravity(
        "Invalid email or password.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
  })
  }


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}