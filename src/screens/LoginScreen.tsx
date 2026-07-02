import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '@components/Button';
import Input from '@components/Input';
import Header from '@components/Header';
import { loginSchema } from '@utils/validationSchemas';
import { getErrorMessage } from '@utils/errorHandler';
import { ROUTES } from '@constants/routes';
import { AuthStackParamList } from '@navigation/types';
import { colors } from '@theme/colors';
import { useLogin } from '@/hooks/useAuth';
import Toast from 'react-native-toast-message';
import { getDeviceInfo } from '@/services/deviceService';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@features/auth/authSlice';
import { authStorage } from '@/services/authStorage';
import { Text } from 'react-native';
import { Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect } from 'react';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.LOGIN>;
type LoginForm = {
  phone: string;
  password: string;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log('Redux Auth:', auth);
  }, [auth]);
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
    },
  });

  const onSubmit = async (data: LoginForm) => {
    const deviceInfo = await getDeviceInfo();

    const payload = {
      phone: data.phone,
      password: data.password,
      ...deviceInfo,
    };

    loginUser(payload, {
      onSuccess: async response => {
        if (!response.success) {
          console.log('login error response ', response);
          Toast.show({
            type: 'error',
            text1: response.message,
          });

          return;
        }

        const token =
          response.data?.token ??
          response.data?.access_token ??
          response.token ??
          response.accessToken;

        if (!token) {
          console.log('No token in login response:', response);
          Toast.show({
            type: 'error',
            text1: 'Login succeeded but no token was returned',
          });
          return;
        }

        const refreshToken = response.data?.refresh_token ?? response.data?.refreshToken ?? null;

        await authStorage.saveToken(token);
        console.log('✅ Token Saved');

        dispatch(
          setCredentials({
            accessToken: token,
            refreshToken,
            user: response.data ?? null,
          }),
        );

        console.log('✅ Redux Dispatch Done');

        const savedToken = await authStorage.getToken();

        console.log('📦 Token in Keychain:', savedToken);
        Toast.show({
          type: 'success',
          text1: response.message,
        });
      },

      onError: error => {
        console.log('LOGIN ERROR', error);

        Toast.show({
          type: 'error',
          text1: getErrorMessage(error),
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
          <Button title="Login" loading={isPending} onPress={handleSubmit(onSubmit)} />
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>{"Don't have an account?"}</Text>

            <Pressable onPress={() => navigation.navigate(ROUTES.REGISTER)}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
  flex: { backgroundColor: colors.background, flex: 1 },
  form: { padding: 24 },
  signupContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  signupLink: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 4,
  },

  signupText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
});

export default LoginScreen;
