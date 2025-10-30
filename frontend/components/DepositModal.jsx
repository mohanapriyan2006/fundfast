import React, { useContext } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors';
import DataContext from '../context/DataContext';
import { Image } from 'expo-image';

const DepositModal = () => {

    return (
        <View>
            {/* My Wallets Modal Content */}
            <View style={styles.headingContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Deposit Money</Text>
                <View style={styles.headingUnderLine}></View>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Select Wallet:</Text>
                <View style={styles.walletPicker}>
                    {/* Wallet Picker Component */}
                </View>

                <Text style={styles.formLabel}>Amount:</Text>
                <View style={styles.amountInput}>
                    <TextInput
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        style={{ fontSize: 16, color: 'black' }}
                    />
                </View>

                <TouchableOpacity style={styles.submitButton}>
                    <Text style={{ color: 'white', fontSize: 18 , fontWeight: 'bold'}}>Deposit</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default DepositModal;

const styles = StyleSheet.create({

    headingContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 140,
    },

    headingUnderLine: {
        width: 100,
        height: 2,
        backgroundColor: primary.DEFAULT,
        marginTop: 2,
    },

    formContainer: {
        marginTop: 20,
        paddingHorizontal: 30,
    },

    formLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: accent.dark,
    },

    walletPicker: {
        height: 50,
        backgroundColor: primary.mid,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },

    amountInput: {
        height: 50,
        backgroundColor: '#FFFFFF',
        borderColor: primary.dark,
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },

    submitButton: {
        backgroundColor: primary.DEFAULT,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },


})