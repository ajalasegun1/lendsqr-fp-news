import {Button, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setGoogleUser, setToken} from '../features/auth/authSlice';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
});

const Signup = () => {
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
      if (result.additionalUserInfo?.profile) {
        const {email, name, picture} = result.additionalUserInfo?.profile;
        await crashlytics().setUserId(email);
        await analytics().logSignUp({
          method: 'google.com',
        });
        dispatch(setGoogleUser({name, email, picture}));
        if (idToken) {
          dispatch(setToken(idToken));
        }
      }
    } catch (error) {
      console.log({error});
      crashlytics().recordError(error as any);
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
  useEffect(() => {
    crashlytics().log('Signup form screen mounted');
  }, []);
  return (
    <View style={styles.container}>
      <Button title="Sign Up with Google" onPress={signIn} />
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
