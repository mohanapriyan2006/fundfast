import React, { useContext, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors'
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import AuthContext from '../context/AuthContext';

const LoginScreen = () => {

    const { login } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(true);

    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleOnChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must not exceed 20 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscore'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(8, 'Password must not exceed 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number'),
    });

    const handleLogin = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});

            await login(formData);

            console.log('Login successful!', formData);
            navigation.navigate('main');

        } catch (err) {
            if (err.name === 'ValidationError') {
                const validationErrors = {};
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
                return;
            }
            setErrors({ ...errors, general: err.message || "Invalid username or password" });
            console.log('Login failed:', err);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ marginTop: 130, marginBottom: 20 }}>
                    <Image source={require('../assets/images/logo-name.png')} style={{ height: 50, width: 200, alignSelf: 'center' }} />
                </View>
                <View style={styles.formContainer}>
                    <View style={{ padding: 10, alignSelf: 'center', borderRadius: 50, elevation: 2, backgroundColor: 'white', position: 'absolute', top: -40 }}>
                        <Image source={require('../assets/images/profile-icon.png')} style={{ width: 50, height: 50 }} />
                    </View>

                    <Text style={{ fontSize: 18, color: primary.dark, fontWeight: 'semi-bold', textAlign: 'center', marginTop: 20, textDecorationLine: 'underline' }}>LOGIN</Text>
                    <TextInput
                        placeholder='Username'
                        placeholderTextColor={"#6e6e6eff"}
                        style={[styles.input, errors.username && styles.inputError]}
                        onChangeText={(value) => handleOnChange('username', value)}
                        value={formData.username}
                    />
                    {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                    <View style={{ position: 'relative' }}>
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor={"#6e6e6eff"}
                            secureTextEntry={!showPassword}
                            style={[styles.input, errors.password && styles.inputError]}
                            onChangeText={(value) => handleOnChange('password', value)}
                            value={formData.password}
                            maxLength={8}
                        />
                        <Pressable onPress={() => setShowPassword(!showPassword)} style={{ padding: 10, zIndex: 999, position: 'absolute', right: 0, bottom: 3 }}>
                            <Image source={showPassword ? require('../assets/images/eye.png') : require('../assets/images/hidden.png')} style={{ width: 25, height: 25, tintColor: primary.dark }} />
                        </Pressable>
                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                    {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 20, marginBottom: 100 }}>
                    <Text>{`Don't have an account?`}</Text>
                    <Pressable onPress={() => navigation.navigate("register")}><Text style={{ color: '#007AFF', textDecorationLine: 'underline' }}>Register</Text></Pressable>
                </View>

            </ScrollView >
        </View >
    )
}

export default LoginScreen;


const styles = StyleSheet.create({
    formContainer: {
        marginTop: 30,
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    input: {
        height: 50,
        borderColor: primary.dark,
        color: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 15,
    },
    inputError: {
        borderColor: '#ff3b30',
        borderWidth: 1.5,
    },
    errorText: {
        color: '#ff3b30',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    },
    button: {
        backgroundColor: primary.DEFAULT,
        paddingVertical: 14,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
