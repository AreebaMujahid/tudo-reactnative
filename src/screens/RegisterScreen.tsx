import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import Input from '@components/Input';
import Button from '@components/Button';
import UserTypeSelector from '../components/TypeSelector/UserTypeSelector';
import { USER_TYPES } from '@constants/userTypes';
import Header from '@/components/Header';
import { usePhoneRegistration } from '@hooks/useAuth';
import Toast from 'react-native-toast-message';
import { PHONE_REGISTRATION_MESSAGES } from '@constants/authMessages';
import { ROUTES } from '@/constants/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@navigation/types';
import { getDeviceInfo } from '@/services/deviceService';

type SignupForm = {
  phone: string;
  password: string;
  userType: number;
};
type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.REGISTER>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { mutate: registerPhone, isPending } = usePhoneRegistration();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    defaultValues: {
      phone: '',
      password: '',
      userType: 0,
    },
  });

  const onSubmit = (data: SignupForm) => {
    console.log('========== SIGNUP STARTED ==========');

    console.log('Form Data:', data);

    const payload = {
      phone: data.phone,
      user_type: data.userType,
    };

    console.log('Phone Registration Payload:', payload);

    registerPhone(payload, {
      onSuccess: async response => {
        if (!response.success) {
          Toast.show({
            type: 'error',
            text1: response.message,
          });

          return;
        }
        switch (response.message) {
          case PHONE_REGISTRATION_MESSAGES.USER_NOT_FOUND: {
            console.log('User not foundd');
            const deviceInfo = await getDeviceInfo();
            console.log('device info', deviceInfo);

            navigation.navigate(ROUTES.PASSWORD, {
              phone: payload.phone,
              userType: payload.user_type,

              deviceType: deviceInfo.device_type,

              deviceToken: deviceInfo.device_token,

              deviceModel: deviceInfo.device_model,

              hash: deviceInfo.hash,
            });

            break;
          }

          default:
            Toast.show({
              type: 'info',
              text1: response.message,
            });
        }
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Signup" />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Phone Number"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
            leftText="+90"
            error={errors.phone?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="userType"
        render={({ field: { onChange, value } }) => (
          <UserTypeSelector options={USER_TYPES} selectedValue={value} onSelect={onChange} />
        )}
      />

      <Button title="Continue" loading={isPending} onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
  },
});
