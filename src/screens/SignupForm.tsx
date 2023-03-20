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
import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {setUser} from '../features/auth/authSlice';
import {FormScreenProps} from '../navgation/types';

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}></Text>
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
            <Button title="Next" onPress={handleSubmit(onSubmit)} />
          </View>
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
});
