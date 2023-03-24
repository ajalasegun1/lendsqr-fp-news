import React from 'react';
import SignupForm from '../src/screens/SignupForm';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../src/app/store';
import Signup from '../src/screens/Signup';
const mockGoogleSignin = require.requireActual(
  '@react-native-community/google-signin',
);

describe('Signup Form Screen', () => {
  const initialProps = {
    // GoogleSignin: {
    //   configure: jest.fn().mockImplementation(() => Promise.resolve()),
    // },
  };
  mockGoogleSignin.GoogleSignin.configure = () => Promise.resolve();
  render(
    <Provider store={store}>
      <Signup {...initialProps} />
    </Provider>,
  );
});
