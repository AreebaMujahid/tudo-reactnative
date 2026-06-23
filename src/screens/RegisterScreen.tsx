import React from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '@components/Button';
import Input from '@components/Input';
import Header from '@components/Header';
import { registerSchema } from '@utils/validationSchemas';
import { useAuth } from '@hooks/useAuth';
import { ROUTES } from '@constants/routes';
import { AuthStackParamList } from '@navigation/types';
import { colors } from '@theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.REGISTER>;
type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register, isRegistering } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Header
          title="Create Account"
          subtitle="Join us today"
          showBack
          onBack={() => navigation.goBack()}
        />
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Full Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
            />
          )}
        />
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
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Confirm Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
              secureTextEntry
            />
          )}
        />
        <Button
          title="Register"
          onPress={handleSubmit(({ name, email, password }) => register({ name, email, password }))}
          loading={isRegistering}
        />
        <Button
          title="Already have an account?"
          variant="outline"
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
          style={styles.mt}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, flexGrow: 1 },
  mt: { marginTop: 12 },
});

export default RegisterScreen;
