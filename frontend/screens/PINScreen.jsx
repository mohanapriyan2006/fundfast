import { Image } from 'expo-image'
import { useContext, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Pressable } from 'react-native'
import { accent, primary } from '../theme/colors'
import { useNavigation } from '@react-navigation/native'
import DataContext from '../context/DataContext'

const PINScreen = () => {
    const navigation = useNavigation();

    const type = navigation.getState().routes[navigation.getState().index].params?.type || 'payment';

    const { handleDepositWallet , handleTransferWallet } = useContext(DataContext);

    const [pin, setPin] = useState('');
    const [secure, setSecure] = useState(true);
    const inputRef = useRef(null);

    const onChange = (val) => {
        const digits = val.replace(/[^0-9]/g, '').slice(0, 4);
        setPin(digits);
    };

    const handlePINSubmit = async () => {
        // Handle PIN submission logic here
        if (type === 'deposit') {
            await handleDepositWallet();
            navigation.navigate("Home", { screen: "DepositConfirmation" });
        } else if (type === 'transfer') {
            await handleTransferWallet();
            navigation.navigate("Home", { screen: "TransferConfirmation" });
        } else {
            navigation.navigate("Home", { screen: "PaymentConfirmation" });
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backIcon]}>
                        <Image source={require('../assets/images/back-dark.png')} style={{ width: 30, height: 30, }} />
                    </TouchableOpacity>
                    <View style={styles.headingContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, zIndex: 99 }}>Enter PIN</Text>
                        <View style={styles.headingUnderLine}></View>
                    </View>
                </View>
                <View style={styles.amtContainer}>
                    <Text style={{ color: primary.dark, fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>$230</Text>
                </View>

                {/* PIN input */}
                <Pressable style={styles.pinRow} onPress={() => inputRef.current?.focus()}>
                    {[0, 1, 2, 3].map((i) => (
                        <View key={i} style={[styles.digitBox, pin.length === i && styles.digitBoxActive]}>
                            <Text style={styles.digitText}>{pin[i] ? (secure ? '•' : pin[i]) : ''}</Text>
                        </View>
                    ))}
                    <Pressable style={styles.eyeBtn} onPress={() => setSecure(s => !s)}>
                        <Image source={secure ? require('../assets/images/hidden.png') : require('../assets/images/eye.png')} style={{ width: 22, height: 22, tintColor: accent.darker }} />
                    </Pressable>
                </Pressable>

                {/* Hidden input (captures the digits) */}
                <TextInput
                    ref={inputRef}
                    value={pin}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                    maxLength={4}
                    style={styles.hiddenInput}
                    autoFocus
                />

                <TouchableOpacity
                    style={[styles.confirmBtn, pin.length !== 4 && { opacity: 0.5 }]}
                    disabled={pin.length !== 4}
                    onPress={handlePINSubmit}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Confirm</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

export default PINScreen;

const styles = StyleSheet.create({
    backIcon: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 999,
    },
    headingContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 50,
    },
    headingUnderLine: {
        width: 80,
        height: 2,
        backgroundColor: primary.DEFAULT,
        marginTop: 2,
    },
    amtContainer: {
        alignSelf: 'center',
        marginTop: 30,
        width: 180,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: primary.DEFAULT,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },

    pinRow: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
    },
    digitBox: {
        width: 44,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: accent.darker,
        paddingVertical: 6,
    },
    digitBoxActive: {
        borderColor: primary.dark,
    },
    digitText: {
        fontSize: 26,
        color: primary.dark,
        lineHeight: 28,
    },
    eyeBtn: {
        marginLeft: 8,
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        height: 0,
        width: 0,
    },
    confirmBtn: {
        marginTop: 30,
        marginHorizontal: 80,
        backgroundColor: primary.DEFAULT,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
});