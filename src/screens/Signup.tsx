import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
});
import auth from '@react-native-firebase/auth';

console.log(Config.WEB_CLIENT_ID);

const Signup = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const result = auth().signInWithCredential(googleCredential);
      console.log({result});
    } catch (error) {
      if ((error as any).code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if ((error as any).code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (
        (error as any).code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text>Signup</Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
