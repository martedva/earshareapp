/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';
import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyC0ebOlU07pnzkS0VhLrOQGgJDgQnj85UE',
  authDomain: 'earshare-database.firebaseapp.com/',
  databaseURL: 'https://earshare-database.firebaseio.com/'
}

const firebaseRef = firebase.initializeApp(config);

export default class earshareapp extends Component {
  _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function(result) {
      if (result.isCancelled) {
        console.log('Login was cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then((AccessTokenData) => {
          const credential = firebase.auth.FacebookAuthProvider.credential(AccessTokenData.AccessToken)
          firebase.auth().signInWithCredential(credential).then((result) => {
            //Promise succesful
          }, (error) => {
            //Promise rejected
            console.log(error)
          })
        }, (error) => {
          console.log('Some error occured: ' + error)
        })
      }
    }, 
    function(error) {
      console.log('An error occured: ' + error);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._fbAuth()}>
          <text>Login With Facebook</text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('earshareapp', () => earshareapp);
