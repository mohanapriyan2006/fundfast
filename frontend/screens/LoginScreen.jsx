import React, { useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

    const [showPassword, setShowPassword] = useState(true);

    const navigation = useNavigation();

    const handleLogin = () => {
        // Handle login logic here
        navigation.navigate('main');
    }

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
                    <TextInput placeholder='Username' placeholderTextColor={"#6e6e6eff"} style={styles.input} />
                    <TextInput placeholder='Password' placeholderTextColor={"#6e6e6eff"} secureTextEntry={!showPassword} style={styles.input} />
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Image source={showPassword ? require('../assets/images/eye.png') : require('../assets/images/hidden.png')} style={{ width: 25, height: 25, tintColor: primary.dark, position: 'absolute', right: 12, top: -38 }} />
                    </Pressable>
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
