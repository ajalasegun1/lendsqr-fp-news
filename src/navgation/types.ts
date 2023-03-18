import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {News} from '../features/api/types';
export type RootStackParamList = {
  Home: undefined;
  Details: News;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;
