import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors';
import { Picker } from '@react-native-picker/picker';

const TransactionHistory = [
    { id: 1, date: '2024-06-01', type: 'TRANSFER', amount: 100, formWallet: 'Wallet 1', toWallet: 'Wallet 2' },
    { id: 1, date: '2024-06-01', type: 'TRANSFER', amount: 70, formWallet: 'Wallet 2', toWallet: 'Wallet 1' },
    { id: 1, date: '2024-06-01', type: 'DEPOSIT', amount: 1000, formWallet: 'Wallet 1', toWallet: null },
    { id: 1, date: '2024-06-01', type: 'TRANSFER', amount: 80, formWallet: 'Wallet 1', toWallet: 'Wallet 2' },
    { id: 1, date: '2024-06-01', type: 'TRANSFER', amount: 700, formWallet: 'Wallet 2', toWallet: 'Wallet 1' },
]

const HistoryModal = () => {

    const [selectedWallet, setSelectedWallet] = useState("Wallet 1");

    return (
        <View style={{ paddingBottom: 20 }}>
            {/* My Wallets Modal Content */}
            <View style={styles.headingContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Transaction History</Text>
                <View style={styles.headingUnderLine}></View>
            </View>

            <View style={styles.historyContainer}>

                <View>
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
                    <View>
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Fetch History</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Fetch History</Text>
                        </TouchableOpacity>
                        <View>
    
                        </View>
                    </View>

                </View>

                <View style={styles.transactionList}>
                    {TransactionHistory.map((transaction) => (
                        <View key={transaction.id} style={styles.transactionItem}>
                            <View style={styles.transactionDetails}>
                                <Text style={{ fontWeight: '600' }}>
                                    {transaction.type === 'TRANSFER' ? `from ${transaction.formWallet} to ${transaction.toWallet}` : 'Deposit'}
                                </Text>
                                <Text style={{ color: '#666' }}>{transaction.date}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ fontWeight: '600' , fontSize: 20, color: (transaction.type === 'DEPOSIT' || transaction.toWallet === selectedWallet) ? 'green' : 'red' }}>
                                    {(transaction.type === 'DEPOSIT' || transaction.toWallet === selectedWallet) ? '+' : '-'}${transaction.amount}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

            </View>

            {/* Form Container */}
            {/* <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Select Wallet:</Text>
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
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>History</Text>
                </TouchableOpacity>
            </View> */}


        </View>
    )
}

export default HistoryModal;

const styles = StyleSheet.create({

    headingContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 140,
    },

    headingUnderLine: {
        width: 140,
        height: 2,
        backgroundColor: primary.DEFAULT,
        marginTop: 2,
    },

    historyContainer: {
        marginTop: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#020202ff',
        paddingBottom: 20,
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

    transactionList: {
        marginTop: 20,
        marginHorizontal: 20,
        gap: 15,
    },

    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: accent.DEFAULT,
        borderWidth: 2,
        borderColor: primary.DEFAULT,
        borderRadius: 10,
        elevation: 3,
    },


})