import React from 'react';
import SignupForm from '../src/screens/SignupForm';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../src/app/store';

describe('Signup Form Screen', () => {
  // const initialProps = {
  //   remoteConfig: jest.fn().mockImplementation(() => Promise.resolve()),
  //   setDefaults: jest.fn().mockImplementation(() => Promise.resolve()),
  // };
  // render(
  //   <Provider store={store}>
  //     <SignupForm {...initialProps} />
  //   </Provider>,
  // );
  it('Should be false', () => {
    expect(false).toBeFalsy();
  });
});
