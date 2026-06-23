import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '@components/Button';
import Input from '@components/Input';
import Header from '@components/Header';
import { loginSchema } from '@utils/validationSchemas';
import { useAuth } from '@hooks/useAuth';
import { ROUTES } from '@constants/routes';
import { AuthStackParamList } from '@navigation/types';
import { colors } from '@theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.LOGIN>;
type LoginForm = { email: string; password: string };

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, isLoggingIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

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
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
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
            title="Sign In"
            onPress={handleSubmit(data => login(data))}
            loading={isLoggingIn}
          />
          <Button
            title="Create Account"
            variant="outline"
            onPress={() => navigation.navigate(ROUTES.REGISTER)}
            style={styles.mt}
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
