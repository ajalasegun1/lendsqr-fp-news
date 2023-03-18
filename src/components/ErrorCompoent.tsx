import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ErrorCompoent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ooops! Something went wrong :(</Text>
    </View>
  );
};

export default ErrorCompoent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
});
