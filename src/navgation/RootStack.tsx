import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from '../screens/Details';
import Home from '../screens/Home';
import {RootStackParamList} from './types';
import SignupForm from '../screens/SignupForm';
import Signup from '../screens/Signup';
import {useSelector} from 'react-redux';
import {RootState} from '../app/store';
import Logout from '../components/Logout';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: 'FP News',
                headerRight: () => <Logout />,
              }}
            />
            <Stack.Screen
              name="Details"
              component={Details}
              options={{
                headerTitle: '',
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="SignupForm" component={SignupForm} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootStack;
