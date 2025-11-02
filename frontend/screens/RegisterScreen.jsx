import React, { useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup';

const RegisterScreen = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const [showPIN, setShowPIN] = useState(false);
    const [showCPIN, setShowCPIN] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        pin: '',
        confirmPin: '',
    });

    const [errors, setErrors] = useState({});

    const handleOnChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const navigation = useNavigation();


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must not exceed 50 characters'),
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must not exceed 20 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscore'),
        email: Yup.string()
            .required('Email is required')
            .email('Please enter a valid email address'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(8, 'Password must not exceed 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number'),
        confirmPassword: Yup.string()
            .required('Please confirm your password')
            .oneOf([Yup.ref('password')], 'Passwords do not match'),
        pin: Yup.string()
            .required('PIN is required')
            .matches(/^\d{4}$/, 'PIN must be exactly 4 digits'),
        confirmPin: Yup.string()
            .required('Please confirm your PIN')
            .oneOf([Yup.ref('pin')], 'PINs do not match'),
    });

    const handleRegister = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});

            console.log('Registration successful!', formData);
            navigation.navigate('login');

        } catch (err) {
            if (err.name === 'ValidationError') {
                const validationErrors = {};
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ marginTop: 50, marginBottom: 20 }}>
                    <Image source={require('../assets/images/logo-name.png')} style={{ height: 50, width: 200, alignSelf: 'center' }} />
                </View>

                <View style={styles.formContainer}>
                    <View style={{ padding: 10, alignSelf: 'center', borderRadius: 50, elevation: 2, backgroundColor: 'white', position: 'absolute', top: -40 }}>
                        <Image source={require('../assets/images/profile-icon.png')} style={{ width: 50, height: 50 }} />
                    </View>

                    <Text style={{ fontSize: 18, color: primary.dark, fontWeight: 'semi-bold', textAlign: 'center', marginTop: 20, textDecorationLine: 'underline' }}>REGISTER</Text>

                    {/* Name */}
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={"#6e6e6eff"}
                        style={[styles.input, errors.name && styles.inputError]}
                        onChangeText={(value) => handleOnChange('name', value)}
                        value={formData.name}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                    {/* Username */}
                    <TextInput
                        placeholder='Username'
                        placeholderTextColor={"#6e6e6eff"}
                        style={[styles.input, errors.username && styles.inputError]}
                        onChangeText={(value) => handleOnChange('username', value)}
                        value={formData.username}
                    />
                    {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                    {/* Email */}
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor={"#6e6e6eff"}
                        style={[styles.input, errors.email && styles.inputError]}
                        onChangeText={(value) => handleOnChange('email', value)}
                        value={formData.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    {/* Password */}
                    <View style={{ position: 'relative' }}>
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor={"#6e6e6eff"}
                            secureTextEntry={!showPassword}
                            style={[styles.input, errors.password && styles.inputError]}
                            maxLength={8}
                            onChangeText={(value) => handleOnChange('password', value)}
                            value={formData.password}
                        />
                        <Pressable onPress={() => setShowPassword(!showPassword)} style={{ padding: 10, zIndex: 999, position: 'absolute', right: 0, top: 17 }}>
                            <Image source={showPassword ? require('../assets/images/eye.png') : require('../assets/images/hidden.png')} style={{ width: 25, height: 25, tintColor: primary.dark }} />
                        </Pressable>
                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                    {/* Confirm Password */}
                    <View style={{ position: 'relative' }}>
                        <TextInput
                            placeholder='Confirm Password'
                            placeholderTextColor={"#6e6e6eff"}
                            secureTextEntry={!showCPassword}
                            style={[styles.input, errors.confirmPassword && styles.inputError]}
                            maxLength={8}
                            onChangeText={(value) => handleOnChange('confirmPassword', value)}
                            value={formData.confirmPassword}
                        />
                        <Pressable onPress={() => setShowCPassword(!showCPassword)} style={{ padding: 10, zIndex: 999, position: 'absolute', right: 0, top: 17 }}>
                            <Image source={showCPassword ? require('../assets/images/eye.png') : require('../assets/images/hidden.png')} style={{ width: 25, height: 25, tintColor: primary.dark }} />
                        </Pressable>
                    </View>
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                    {/* Wallet PIN */}
                    <Text style={{ fontSize: 16, color: primary.dark, fontWeight: '500', marginTop: 10 }}>Wallet PIN</Text>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        {/* PIN */}
                        <View style={{ width: '48%', position: 'relative' }}>
                            <TextInput
                                placeholder='4-digit PIN'
                                placeholderTextColor={"#6e6e6eff"}
                                secureTextEntry={!showPIN}
                                style={[styles.pinInput, errors.pin && styles.inputError]}
                                onChangeText={(value) => handleOnChange('pin', value)}
                                maxLength={4}
                                keyboardType="numeric"
                                value={formData.pin}
                            />
                            <Pressable onPress={() => setShowPIN(!showPIN)} style={{ padding: 10, zIndex: 999, position: 'absolute', right: 0, top: 17 }}>
                                <Image source={showPIN ? require('../assets/images/eye.png') : require('../assets/images/hidden.png')} style={{ width: 25, height: 25, tintColor: primary.dark }} />
                            </Pressable>
                        </View>

                        {/* Confirm PIN */}
                        <View style={{ width: '48%', position: 'relative' }}>
                            <TextInput
                                placeholder='Confirm PIN'
                                placeholderTextColor={"#6e6e6eff"}
                                secureTextEntry={!showCPIN}
                                style={[styles.pinInput, errors.confirmPin && styles.inputError]}
                                onChangeText={(value) => handleOnChange('confirmPin', value)}
                                maxLength={4}
                                keyboardType="numeric"
                                value={formData.confirmPin}
                            />
                            <Pressable onPress={() => setShowCPIN(!showCPIN)} style={{ padding: 10, zIndex: 999, position: 'absolute', right: 0, top: 17 }}>
                                <Image source={showCPIN ? require('../assets/images/eye.png') : require('../assets/images/hidden.png')} style={{ width: 25, height: 25, tintColor: primary.dark }} />
                            </Pressable>
                        </View>
                    </View>
                    {errors.pin && <Text style={styles.errorText}>{errors.pin}</Text>}
                    {errors.confirmPin && <Text style={styles.errorText}>{errors.confirmPin}</Text>}

                    <TouchableOpacity onPress={handleRegister} style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 20, marginBottom: 150 }}>
                    <Text>{`Already have an account?`}</Text>
                    <Pressable
                        onPress={() => { navigation.navigate('login') }}
                    ><Text style={{ color: '#007AFF', textDecorationLine: 'underline' }}>Login</Text></Pressable>
                </View>

            </ScrollView >
        </View >
    )
}

export default RegisterScreen;


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
    pinInput: {
        height: 50,
        borderColor: primary.dark,
        color: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
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
