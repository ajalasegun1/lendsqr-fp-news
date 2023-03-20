import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../app/store';
import crashlytics from '@react-native-firebase/crashlytics';

const Header = () => {
  const user = useSelector((state: RootState) => state.authReducer.googleUser);
  const crash = async () => {
    crashlytics().log('Crash button cliked');
    crashlytics().crash();
  };
  useEffect(() => {
    crashlytics().log('Home screen mounted');
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Button title="Crash" onPress={crash} />
      </View>
      <View style={styles.left}>
        <Text style={styles.welcome}>
          Welcome,{'\n'}
          {user?.name}
        </Text>
        <View style={styles.imgHolder}>
          <Image source={{uri: user?.picture}} style={styles.imgHolder} />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgHolder: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: 'white',
  },
  welcome: {
    marginRight: 10,
    color: 'black',
  },
});
