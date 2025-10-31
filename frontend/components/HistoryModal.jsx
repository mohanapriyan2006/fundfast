import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors';
import { Picker } from '@react-native-picker/picker';

const TransactionHistory = [
    { id: 1, date: '2024-06-01', type: 'TRANSFER', amount: 100, formWallet: 'Wallet 1', toWallet: 'Wallet 2' },
    { id: 2, date: '2024-06-01', type: 'TRANSFER', amount: 70, formWallet: 'Wallet 2', toWallet: 'Wallet 1' },
    { id: 3, date: '2024-06-01', type: 'DEPOSIT', amount: 1000, formWallet: 'Wallet 1', toWallet: null },
    { id: 4, date: '2024-06-01', type: 'TRANSFER', amount: 80, formWallet: 'Wallet 1', toWallet: 'Wallet 2' },
    { id: 5, date: '2024-06-01', type: 'TRANSFER', amount: 700, formWallet: 'Wallet 2', toWallet: 'Wallet 1' },
]

const HistoryModal = () => {

    const [selectedWallet, setSelectedWallet] = useState("Wallet 1");

    const [sortBy, setSortBy] = useState("Time");
    const [sortOrder, setSortOrder] = useState("ASC");

    return (
        <View style={{ paddingBottom: 20 }}>
            {/* My Wallets Modal Content */}
            <View style={styles.headingContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Transaction History</Text>
                <View style={styles.headingUnderLine}></View>
            </View>

            <View style={styles.historyContainer}>

                <View style={styles.historySortContainer}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <TouchableOpacity
                            style={sortBy === "Time" ? styles.activeBtn : styles.inactiveBtn}
                            onPress={() => setSortBy("Time")}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: sortBy === "Time" ? 'white' : 'black' }}>Time</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={sortBy === "Amount" ? styles.activeBtn : styles.inactiveBtn}
                            onPress={() => setSortBy("Amount")}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: sortBy === "Amount" ? 'white' : 'black' }}>Amt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={() => setSortOrder((p) => p === "DESC" ? "ASC" : "DESC")}
                        >
                            <Image
                                source={require("../assets/images/arrow.png")}
                                style={[styles.arrowIcon, { tintColor: sortOrder === "DESC" ? primary.mid : accent.dark }, { transform: [{ rotate: '180deg' }] }]}
                            />
                            <Image
                                source={require("../assets/images/arrow.png")}
                                style={[styles.arrowIcon, { tintColor: sortOrder === "ASC" ? primary.mid : accent.dark }]}
                            />
                        </TouchableOpacity>
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
                                <Text style={{ fontWeight: '600', fontSize: 20, color: (transaction.type === 'DEPOSIT' || transaction.toWallet === selectedWallet) ? 'green' : 'red' }}>
                                    {(transaction.type === 'DEPOSIT' || transaction.toWallet === selectedWallet) ? '+' : '-'}${transaction.amount}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ flexDirection: 'row', gap: 10 , justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                    <TouchableOpacity style={styles.activeBtn}>
                        <Text style={{ color: 'white' }}>Prev</Text>
                    </TouchableOpacity>
                    <View>
                        <Text>1 2 3 ... 10</Text>
                    </View>
                    <TouchableOpacity style={styles.activeBtn}>
                        <Text style={{ color: 'white' }}>Next</Text>
                    </TouchableOpacity>
                </View>

            </View>

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
        marginTop: 30,
        paddingBottom: 20,
    },

    historySortContainer: {
        borderBottomWidth: 1,
        borderBottomColor: accent.dark,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },

    pickerWrapper: {
        height: 35,
        width: 150,
        backgroundColor: primary.mid,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
    },

    picker: {
        color: 'white',
        backgroundColor: 'transparent',
    },

    pickerItem: {
        color: 'white',
        fontSize: 16,
    },

    activeBtn: {
        backgroundColor: primary.mid,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,
    },

    inactiveBtn: {
        borderWidth: 2,
        borderColor: primary.mid,
        backgroundColor: 'transparent',
        paddingVertical: 1,
        paddingHorizontal: 8,
        borderRadius: 5,
    },

    arrowIcon: {
        height: 25,
        width: 20,
        marginRight: -10,
    },

    transactionList: {
        marginVertical: 20,
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