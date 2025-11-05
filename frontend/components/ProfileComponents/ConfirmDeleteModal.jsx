import React, { useContext, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../../theme/colors'
import { TextInput } from 'react-native-gesture-handler'
import DataContext from '../../context/DataContext'

const ConfirmDeleteModal = ({ item = "Your Account", onConfirm, onCancel }) => {

    const { verifyPassword } = useContext(DataContext);

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handlePasswordSubmit = async () => {
        try {
            await verifyPassword(password);
            onConfirm();
            setError("");
        } catch (err) {
            setError(err.toString());
            console.log("Error verifying password:", err);
        }
    }

    return (
        <View style={styles.modal}>
            <View style={styles.modalContent}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: "#860000ff" }}>Confirm Delete</Text>
                <Text style={{ fontSize: 16, fontWeight: '500', color: accent.darker, marginTop: 20, marginHorizontal: 10 }}>Enter your password to delete {item}?</Text>
                <View style={styles.formContainer}>
                    <View style={{ position: 'relative' }}>
                        <TextInput
                            placeholder="Enter your password"
                            style={styles.inputBox}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <Pressable onPress={() => setShowPassword(!showPassword)} style={{ padding: 10, zIndex: 999, position: 'absolute', right: 0, top: 3 }}>
                            <Image source={showPassword ? require('../../assets/images/eye.png') : require('../../assets/images/hidden.png')} style={{ width: 25, height: 25, tintColor: primary.dark }} />
                        </Pressable>
                    </View>
                    <Text style={{ marginTop: 6, marginBottom: 10, textAlign: 'center' }}>Username: johndoe</Text>

                    {error && <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{error}</Text>}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                        <TouchableOpacity
                            style={[{ backgroundColor: accent.dark }, styles.btn]}
                            onPress={onCancel}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: '#dd0000ff', }]}
                            onPress={handlePasswordSubmit}
                        >
                            <Image style={{ height: 20, width: 20, tintColor: 'white' }} source={require("../../assets/images/trash.png")} />
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Delete</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default ConfirmDeleteModal;


const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: '#0000008a',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center'
    },

    modalContent: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        elevation: 5,
    },

    formContainer: {
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
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
        justifyContent: 'center',
        paddingHorizontal: 10,
    },

});