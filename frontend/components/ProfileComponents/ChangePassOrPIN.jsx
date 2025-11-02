import React, { useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../../theme/colors'
import OtherHeader from '../OtherHeader'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'


const ChangePassOrPIN = ({ isPin = false }) => {

    const navigation = useNavigation();

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const [formData, setFormData] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const [error, setError] = useState('');

    const handleOnChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (error) {
            setError('');
        }
    };

    const validateFormForPassword = () => {
        const { current: currentPass, new: newPass, confirm: confirmPass } = formData;

        if (!currentPass || !newPass || !confirmPass) {
            setError('All fields are required.');
            return false;
        }

        if (newPass.length < 6 || newPass.length > 8) {
            setError('New Password must be 6-8 characters long.');
            return false;
        }

        if (newPass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,8}$/) === null) {
            setError('New Password must contain at least one uppercase letter, one lowercase letter, and one number.');
            return false;
        }

        if (newPass !== confirmPass) {
            setError('New Password and Confirm Password fields do not match.');
            return false;
        }

        setError('');
        return true;
    }

    const validateFormForPIN = () => {
        const { current: currentPin, new: newPin, confirm: confirmPin } = formData;

        if (!currentPin || !newPin || !confirmPin) {
            setError('All fields are required.');
            return false;
        }

        if (newPin.length !== 4) {
            setError('New PIN must be 4 Digits.');
            return false;
        }

        if (newPin.match(/^[0-9]{4}$/) === null) {
            setError('New PIN must contain only digits.');
            return false;
        }

        if (newPin !== confirmPin) {
            setError('New PIN and Confirm PIN fields do not match.');
            return false;
        }

        setError('');
        return true;
    }

    const handleSubmit = () => {
        if (isPin) {
            if (validateFormForPIN()) {
                // Proceed with changing password or PIN
            }
        } else {
            if (validateFormForPassword()) {
                // Proceed with changing password or PIN
            }
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ flex: 1 }}>
                {/* Header */}
                <OtherHeader title={`Change ${isPin ? "PIN" : "Password"}`} />

                <View style={styles.changePassOrPINContent}>
                    <Text style={{ color: primary.dark, fontSize: 16, marginVertical: 20 }}>
                        Here you can change your {isPin ? "wallet PIN" : "Password"}.
                    </Text>

                    {/* Form Container */}
                    <View style={styles.formContainer}>

                        <View>

                            {/* Current */}
                            <Text style={styles.formLabel}>Current {isPin ? "PIN" : "Password"} :</Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    placeholder={`Enter your current ${isPin ? "PIN" : "Password"}`}
                                    style={styles.inputBox}
                                    secureTextEntry={!showPassword}
                                    onChangeText={(text) => handleOnChange('current', text)}
                                    maxLength={isPin ? 4 : 8}
                                    keyboardType={isPin ? "numeric" : "default"}
                                />
                                <Pressable onPress={() => setShowPassword(!showPassword)} style={{ padding: 10, zIndex: 999, position: 'absolute', right: 0, top: 3 }}>
                                    <Image source={showPassword ? require('../../assets/images/eye.png') : require('../../assets/images/hidden.png')} style={{ width: 25, height: 25, tintColor: primary.dark }} />
                                </Pressable>
                            </View>

                            {/* New  */}
                            <Text style={styles.formLabel}>New {isPin ? "PIN" : "Password"} :</Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    placeholder={`Enter your new ${isPin ? "PIN" : "Password"}`}
                                    style={styles.inputBox}
                                    secureTextEntry={!showNewPassword}
                                    onChangeText={(text) => handleOnChange('new', text)}
                                    maxLength={isPin ? 4 : 8}
                                    keyboardType={isPin ? "numeric" : "default"}
                                />
                                <Pressable onPress={() => setShowNewPassword(!showNewPassword)} style={{ padding: 10, zIndex: 999, position: 'absolute', right: 0, top: 3 }}>
                                    <Image source={showNewPassword ? require('../../assets/images/eye.png') : require('../../assets/images/hidden.png')} style={{ width: 25, height: 25, tintColor: primary.dark }} />
                                </Pressable>
                            </View>

                            {/* Confirm */}
                            <Text style={styles.formLabel}>Confirm {isPin ? "PIN" : "Password"} :</Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    placeholder={`Enter your confirm ${isPin ? "PIN" : "Password"}`}
                                    style={styles.inputBox}
                                    secureTextEntry={!showCPassword}
                                    onChangeText={(text) => handleOnChange('confirm', text)}
                                    maxLength={isPin ? 4 : 8}
                                    keyboardType={isPin ? "numeric" : "default"}
                                />
                                <Pressable onPress={() => setShowCPassword(!showCPassword)} style={{ padding: 10, zIndex: 999, position: 'absolute', right: 0, top: 3 }}>
                                    <Image source={showCPassword ? require('../../assets/images/eye.png') : require('../../assets/images/hidden.png')} style={{ width: 25, height: 25, tintColor: primary.dark }} />
                                </Pressable>
                            </View>

                            {error ? <Text style={styles.errorText}>{error}</Text> : null}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                                <TouchableOpacity
                                    style={{ backgroundColor: accent.dark, width: '40%', borderRadius: 10, padding: 10, alignSelf: 'center', alignItems: 'center' }}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ backgroundColor: primary.DEFAULT, width: '40%', borderRadius: 10, padding: 10, alignSelf: 'center', alignItems: 'center' }}
                                    onPress={handleSubmit}
                                >
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Change</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>

                </View>

            </ScrollView >
        </View >
    )
}

export default ChangePassOrPIN;


const styles = StyleSheet.create({
    changePassOrPINContent: {
        padding: 20,
        backgroundColor: accent.DEFAULT,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: -20,
    },

    formContainer: {
        marginVertical: 20,
        paddingHorizontal: 30,
    },

    formLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
        color: accent.darker,
    },

    btn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        gap: 10,
        width: '40%',
        borderRadius: 10,
        marginTop: 10,
    },

    inputBox: {
        height: 50,
        backgroundColor: '#FFFFFF',
        borderColor: primary.dark,
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    errorText: {
        color: '#ff3b30',
        fontSize: 14,
        marginBottom: 10,
        marginLeft: 5,
    },


});
