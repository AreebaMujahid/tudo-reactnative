import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useVerifyOtp } from '@/hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import Header from '@components/Header';
import Input from '@components/Input';
import Button from '@components/Button';
import { ROUTES } from '@constants/routes';
import { AuthStackParamList } from '@navigation/types';
import { colors } from '@theme/colors';
import { setCredentials } from '@features/auth/authSlice';
import { authStorage } from '@/services/authStorage';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.OTP>;

type OtpForm = {
  otp: string;
};

const OtpScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { phone, userType } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpForm>({
    defaultValues: {
      otp: '',
    },
  });

  const { mutate: verifyOtp, isPending } = useVerifyOtp();

  const onSubmit = (data: OtpForm) => {
    const payload = {
      phone,
      otp: data.otp,
      user_type: userType,
    };

    console.log('========== VERIFY OTP ==========');

    console.log('VERIFY OTP PAYLOAD:', payload);

    verifyOtp(payload, {
      onSuccess: async response => {
        console.log('VERIFY OTP RESPONSE:', response);

        if (!response.success) {
          Toast.show({
            type: 'error',
            text1: response.message,
          });

          return;
        }

        const token = response.token;

        if (token) {
          await authStorage.saveToken(token);

          dispatch(
            setCredentials({
              accessToken: token,
              refreshToken: null,
              user: { phone },
            }),
          );
        }

        Toast.show({
          type: 'success',
          text1: response.message,
        });

        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.LOGIN }],
        });
      },

      onError: error => {
        console.log('VERIFY OTP ERROR:', error);

        Toast.show({
          type: 'error',
          text1: error instanceof Error ? error.message : 'Something went wrong',
        });
      },
    });
  };

  const handleResendOtp = () => {
    console.log('========== RESEND OTP ==========');

    console.log({
      phone,
      user_type: userType,
    });

    /**
     * TODO:
     *
     * resendOtp({
     *   phone,
     *   user_type: userType,
     * });
     */

    Toast.show({
      type: 'info',
      text1: 'OTP resent successfully',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Verify OTP" subtitle="Enter the code sent to your phone" showBack />

      <View style={styles.phoneContainer}>
        <Text style={styles.label}>Phone Number</Text>

        <Text style={styles.phone}>+{phone}</Text>
      </View>

      <Controller
        control={control}
        name="otp"
        rules={{
          required: 'OTP is required',

          minLength: {
            value: 5,
            message: 'OTP must be 5 digits',
          },

          maxLength: {
            value: 5,
            message: 'OTP must be 5 digits',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="OTP"
            value={value}
            onChangeText={onChange}
            keyboardType="number-pad"
            maxLength={5}
            error={errors.otp?.message}
          />
        )}
      />

      <Button title="Verify OTP" loading={isPending} onPress={handleSubmit(onSubmit)} />

      <Button
        title="Resend OTP"
        variant="outline"
        onPress={handleResendOtp}
        style={styles.resendButton}
      />
    </ScrollView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexGrow: 1,
    padding: 24,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },

  phone: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },

  phoneContainer: {
    marginBottom: 24,
  },

  resendButton: {
    marginTop: 16,
  },
});
