import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Button,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {setUser} from '../features/auth/authSlice';
import {FormScreenProps} from '../navgation/types';
import crashlytics from '@react-native-firebase/crashlytics';
import remoteConfig from '@react-native-firebase/remote-config';

const schema = yup
  .object({
    fullName: yup.string().trim().required('Full name is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .trim()
      .required('Email is required'),
    phoneNumber: yup
      .string()
      .min(11, 'Phone number must be 11 digits long')
      .trim()
      .required('Phone number is required'),
  })
  .required();

const SignupForm: FC<FormScreenProps> = ({navigation}) => {
  const [useBlue, setUseBlue] = useState(true);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
  });
  const onSubmit = (data: {
    fullName: string;
    email: string;
    phoneNumber: string;
  }) => {
    console.log(data);
    dispatch(setUser(data));
    navigation.push('Signup');
  };

  const goToLogin = () => navigation.push('Login');

  // Simple react config to change the color of the button
  useEffect(() => {
    remoteConfig()
      .setDefaults({
        button_color_blue: true,
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          console.log('Configs were retrieved from the backend and activated.');
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
        const blueFeature = remoteConfig().getValue('button_color_blue');
        if (blueFeature.asBoolean() === true) {
          setUseBlue(true);
        } else {
          setUseBlue(false);
        }
      });
  }, []);

  useEffect(() => {
    crashlytics().log('App mounted with user not signed up or logged in');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          style={styles.scroll}
          keyboardShouldPersistTaps="always"
          showsHorizontalScrollIndicator={false}>
          <Text style={styles.title}>FP News Signup</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Full Name"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.fullName && (
                  <Text style={styles.error}>{errors.fullName.message}</Text>
                )}
              </View>
            )}
            name="fullName"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email.message}</Text>
                )}
              </View>
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Phone Number"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="number-pad"
                />
                {errors.phoneNumber && (
                  <Text style={styles.error}>{errors.phoneNumber.message}</Text>
                )}
              </View>
            )}
            name="phoneNumber"
          />

          <View style={styles.btnContainer}>
            <Button
              title="Next"
              onPress={handleSubmit(onSubmit)}
              color={useBlue ? '#1F75FE' : '#BEDBED'}
            />
          </View>

          <Text style={styles.or}>OR</Text>

          <Text style={styles.login} onPress={goToLogin}>
            Login with Google
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scroll: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  btnContainer: {
    marginTop: 50,
  },
  title: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 15,
  },
  inputContainer: {
    marginVertical: 12,
  },
  error: {
    fontSize: 11,
    color: 'red',
  },
  or: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 12,
  },
  login: {
    color: 'black',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
