import React from 'react'
import { View, Text, Image, Button, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'

const options = {
    title: 'my photo',
    takePhotoButtonTitle: 'take photo with your camera',
    chooseFromLibraryButtonTitle: 'choose photo from library',
}

export default class Photo extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        avatarSource: null
      }
  }

  myfun() {
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', reponse.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', reponse.customButton);
        } else {
          let source = { uri: response.uri };
          this.setState({ avatarSource: source });
        }
    });
    alert('clicked');
  }

  render() {
    const { photo } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <Image source={this.state.avatarSource} style ={{width:'100%', height:200, margin:10}}/>
        <TouchableOpacity style={{backgroundColor: 'green', margin: 10, padding:10}}
        onPress={this.myfun}>
          <Text style={{color:'#fff'}}>Select Image</Text>
        </TouchableOpacity>
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    )
  }
}