import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {News} from '../features/api/types';
export type RootStackParamList = {
  Home: undefined;
  Details: News;
  SignupForm: undefined;
  Signup: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;
export type FormScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignupForm'
>;
export type SignupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Signup'
>;
