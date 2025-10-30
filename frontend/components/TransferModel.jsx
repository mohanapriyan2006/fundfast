import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors';
import { Picker } from '@react-native-picker/picker';

const TransferModal = () => {

    return (
        <View style={{ paddingBottom: 140 }}>
            {/* My Wallets Modal Content */}
            <View style={styles.headingContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Transfer Money</Text>
                <View style={styles.headingUnderLine}></View>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Select Your Wallet:</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={"wallet1"}
                        // onValueChange={setFromWallet}
                        mode="dropdown"
                        dropdownIconColor="#fff"
                        style={styles.picker}          
                        itemStyle={styles.pickerItem}   
                    >
                        <Picker.Item label="Wallet 1" value="wallet1" />
                        <Picker.Item label="Wallet 2" value="wallet2" />
                    </Picker>
                </View>


                <Text style={styles.formLabel}>Select Recipient Wallet:</Text>
                <View style={styles.amountInput}>
                    <TextInput
                        placeholder="Enter recipient username"
                        style={{ fontSize: 16, color: 'black' }}
                    />
                </View>
                 <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={"wallet1"}
                        // onValueChange={setFromWallet}
                        mode="dropdown"
                        dropdownIconColor="#fff"
                        style={styles.picker}          
                        itemStyle={styles.pickerItem}   
                    >
                        <Picker.Item label="Wallet 1" value="wallet1" />
                        <Picker.Item label="Wallet 2" value="wallet2" />
                    </Picker>
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
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Transfer</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default TransferModal;

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

    pickerWrapper: {
        height: 50,
        backgroundColor: primary.mid,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        justifyContent: 'center',
    },

    picker: {
        color: 'white',
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
    },

    pickerItem: {
        color: 'white',
        fontSize: 16,
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