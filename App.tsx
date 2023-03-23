import React from 'react';
import {store} from './src/app/store';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import codePush from 'react-native-code-push';
import RootStack from './src/navgation/RootStack';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </Provider>
  );
};

export default codePush(App);
