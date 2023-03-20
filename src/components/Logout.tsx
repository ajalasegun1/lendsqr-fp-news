import {Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {logout} from '../features/auth/authSlice';
import Config from 'react-native-config';
GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
});
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Logout = () => {
  const dispatch = useDispatch();
  const signout = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      dispatch(logout());
    } catch (error) {
      console.log({error});
    }
  };
  return <Button title="Logout" onPress={signout} />;
};

export default Logout;
