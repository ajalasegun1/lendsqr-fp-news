import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setGoogleUser, setToken} from '../features/auth/authSlice';
GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
});

const Login = () => {
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      console.log({idToken});
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const result = await auth().signInWithCredential(googleCredential);
      console.log({result});
      if (result.additionalUserInfo?.profile) {
        const {email, name, picture} = result.additionalUserInfo?.profile;
        dispatch(setGoogleUser({name, email, picture}));
        if (idToken) {
          dispatch(setToken(idToken));
        }
      }
    } catch (error) {
      console.log({error});
      //   if ((error as any).code === statusCodes.SIGN_IN_CANCELLED) {
      //     // user cancelled the login flow
      //   } else if ((error as any).code === statusCodes.IN_PROGRESS) {
      //     // operation (e.g. sign in) is in progress already
      //   } else if (
      //     (error as any).code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      //   ) {
      //     // play services not available or outdated
      //   } else {
      //     // some other error happened
      //   }
    }
  };
  return (
    <View style={styles.container}>
      <Button title={'Login with Google'} onPress={signIn} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
