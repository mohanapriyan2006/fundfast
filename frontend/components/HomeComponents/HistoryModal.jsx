import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../../theme/colors';
import { Picker } from '@react-native-picker/picker';
import DataContext from '../../context/DataContext';


const HistoryModal = () => {

    const { transactions, myWallets, fetchAllTransactionsByWallet } = useContext(DataContext);

    const [selectedWallet, setSelectedWallet] = useState(myWallets[0]?.id || 0);

    const [pageNo, setPageNo] = useState(0);

    const [sortBy, setSortBy] = useState("time");
    const [sortOrder, setSortOrder] = useState("ASC");

    useEffect(() => {
        fetchAllTransactionsByWallet(selectedWallet, pageNo, sortBy, sortOrder);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedWallet, sortBy, sortOrder, pageNo]);

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
                            selectedValue={selectedWallet}
                            onValueChange={(v) => { setSelectedWallet(v); }}
                            mode="dropdown"
                            dropdownIconColor="#fff"
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                        >
                            {myWallets.map((wallet) => (
                                <Picker.Item key={wallet.id} label={wallet.walletName} value={wallet.id} />
                            ))}
                        </Picker>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <TouchableOpacity
                            style={sortBy === "time" ? styles.activeBtn : styles.inactiveBtn}
                            onPress={() => setSortBy("time")}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: sortBy === "time" ? 'white' : 'black' }}>Time</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={sortBy === "amount" ? styles.activeBtn : styles.inactiveBtn}
                            onPress={() => setSortBy("amount")}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: sortBy === "amount" ? 'white' : 'black' }}>Amt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={() => setSortOrder((p) => p === "DESC" ? "ASC" : "DESC")}
                        >
                            <Image
                                source={require("../../assets/images/arrow.png")}
                                style={[styles.arrowIcon, { tintColor: sortOrder === "ASC" ? primary.mid : accent.dark }, { transform: [{ rotate: '180deg' }] }]}
                            />
                            <Image
                                source={require("../../assets/images/arrow.png")}
                                style={[styles.arrowIcon, { tintColor: sortOrder === "DESC" ? primary.mid : accent.dark }]}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.transactionList}>
                    {transactions.length > 0 ? transactions.map((transaction) => (
                        <View key={transaction.id} style={styles.transactionItem}>
                            <View style={styles.transactionDetails}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: primary.dark }}>
                                    {transaction.type === 'TRANSFER' ? `${transaction.fromWallet.walletName} to ${transaction.toWallet.walletName}` : 'Deposit'}
                                </Text>
                                <Text style={{ color: 'black' }}>
                                    {transaction.type === 'TRANSFER' ? `${transaction.fromWallet?.owner?.name} to ${transaction.toWallet?.owner?.name}` : `${transaction.toWallet?.owner?.name}`}
                                </Text>
                                <Text style={{ color: '#666' }}>{new Date(transaction.timestamp).toLocaleString()}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ fontWeight: '600', fontSize: 20, color: (transaction.type === 'DEPOSIT' || transaction.toWallet.id === selectedWallet) ? 'green' : 'red' }}>
                                    {(transaction.type === 'DEPOSIT' || transaction.toWallet.id === selectedWallet) ? '+' : '-'}${transaction.amount}
                                </Text>
                            </View>
                        </View>
                    ))
                : <Text style={{ textAlign: 'center' , fontSize: 20, color: accent.darker }}>No transactions found.</Text>}
                </View>

                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                    <TouchableOpacity
                        style={styles.activeBtn}
                        onPress={() => setPageNo((p) => Math.max(p - 1, 0))}
                    >
                        <Text style={{ color: 'white' }}>Prev</Text>
                    </TouchableOpacity>
                    <View>
                        <Text>1 2 3 ... 10</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.activeBtn}
                        onPress={() => setPageNo((p) => p + 1)}
                    >
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
        marginTop: 80,
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