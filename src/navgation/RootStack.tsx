import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from '../screens/Details';
import Home from '../screens/Home';
import {RootStackParamList} from './types';
import SignupForm from '../screens/SignupForm';
import Signup from '../screens/Signup';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SignupForm" component={SignupForm} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Group>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: 'FP News',
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootStack;
