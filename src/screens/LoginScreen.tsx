import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '@components/Button';
import Input from '@components/Input';
import Header from '@components/Header';
import { loginSchema } from '@utils/validationSchemas';
import { ROUTES } from '@constants/routes';
import { AuthStackParamList } from '@navigation/types';
import { colors } from '@theme/colors';
import { useLogin } from '@/hooks/useAuth';
import Toast from 'react-native-toast-message';
import { getDeviceInfo } from '@/services/deviceService';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.LOGIN>;
type LoginForm = {
  phone: string;
  password: string;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { mutate: loginUser, isPending } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
    }
  });

  const onSubmit = async (data: LoginForm) => {
    const deviceInfo = await getDeviceInfo();

    const payload = {
      phone: `90${data.phone}`,
      password: data.password,
      ...deviceInfo,
    };

    loginUser(payload, {
      onSuccess: response => {
        console.log('LOGIN SUCCESS', response);

        if (!response.success) {
          Toast.show({
            type: 'error',
            text1: response.message,
          });

          return;
        }

        Toast.show({
          type: 'success',
          text1: response.message,
        });
      },

      onError: error => {
        console.log('LOGIN ERROR', error);

        Toast.show({
          type: 'error',
          text1:
            (error as any)?.response?.data?.message ??
            'Something went wrong',
        });
      },
    });
  };
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Header title="Welcome Back" subtitle="Sign in to continue" />
        <View style={styles.form}>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Phone Number"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="phone-pad"
                leftText="+90"
                error={errors.phone?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                secureTextEntry
              />
            )}
          />
          <Button
            title="Login"
            loading={isPending}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1 },
  form: { padding: 24 },
  mt: { marginTop: 12 },
});

export default LoginScreen;
