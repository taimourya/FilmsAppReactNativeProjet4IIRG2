import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default class Avatar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      avatar: require('../assets/images/avatar.png'),
    }
    this.avatarClicked = this.avatarClicked.bind(this);
  }

  avatarClicked() {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('L\'utilisateur a annulé')
      }
      else if (response.error) {
        console.log('Erreur : ', response.error)
      }
      else {
        console.log('Photo : ', response.uri )
        let requireSource = { uri: response.uri }
        this.setState({
          avatar: requireSource
        })
      }
    })
  }

  render() {
    console.log("picker : " + launchImageLibrary);
    return(
        <View>
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={this.avatarClicked}>
                <Image style={styles.avatar} source={this.state.avatar} />
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2
  }
})

