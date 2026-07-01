import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getDeviceInfo } from '@/services/deviceService';
import Header from '@components/Header';
import Input from '@components/Input';
import Button from '@components/Button';
import { useRegister } from '@hooks/useAuth';
import { ROUTES } from '@constants/routes';
import { AuthStackParamList } from '@navigation/types';
import Toast from 'react-native-toast-message';
type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.PASSWORD>;
type PasswordForm = {
    password: string;
};

const PasswordScreen: React.FC<Props> = ({ route, navigation }) => {
    const { phone, userType } = route.params;
    const { mutate: registerUser, isPending } = useRegister();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordForm>({
        defaultValues: {
            password: '',
        },
    });

    const onSubmit = async (
        data: PasswordForm,
    ) => {
        try {
            console.log(
                '========== REGISTER STARTED =========='
            );

            const deviceInfo =
                await getDeviceInfo();

            const payload = {
                phone,
                password: data.password,
                user_type: userType,
                ...deviceInfo,
            };

            console.log(
                'REGISTER PAYLOAD:',
                payload,
            );

            registerUser(payload, {
                onSuccess: response => {
                    console.log(
                        'REGISTER RESPONSE:',
                        response,
                    );

                    /**
                     * Backend success check
                     */
                    if (!response.success) {
                        Toast.show({
                            type: 'error',
                            text1: response.message,
                        });

                        return;
                    }

                    /**
                     * Show backend message
                     */

                    Toast.show({
                        type: 'success',
                        text1: response.message,
                    });

                    /**
                     * Move user to OTP screen
                     */

                    navigation.replace(
                        ROUTES.OTP,
                        {
                            phone,
                            userType,
                        },
                    );
                },

                onError: error => {
                    console.log(
                        'REGISTER ERROR:',
                        error,
                    );

                    Toast.show({
                        type: 'error',
                        text1:
                            error instanceof Error
                                ? error.message
                                : 'Something went wrong',
                    });
                },
            });
        } catch (error) {
            console.log(
                'DEVICE INFO ERROR:',
                error,
            );

            Toast.show({
                type: 'error',
                text1:
                    'Unable to get device information',
            });
        }
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header title="Create Password" subtitle="Enter a secure password" showBack />

            <Controller
                control={control}
                name="password"
                rules={{
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                    },
                }}
                render={({ field: { onChange, value } }) => (
                    <Input
                        label="Password"
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry
                        error={errors.password?.message}
                    />
                )}
            />

            <Button title="Continue" loading={isPending} onPress={handleSubmit(onSubmit)} />
        </ScrollView>
    );
};

export default PasswordScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
    },
});
