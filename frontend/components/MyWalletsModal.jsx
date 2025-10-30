import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { primary } from '../theme/colors';
import DataContext from '../context/DataContext';
import { Image } from 'expo-image';

const MyWalletsModal = () => {

    const { wallets } = useContext(DataContext);

    return (
        <View>
            {/* My Wallets Modal Content */}
            <View style={styles.headingContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>My Wallets</Text>
                <View style={styles.headingUnderLine}></View>
            </View>

            {/* Wallets List */}
            <View style={styles.walletsList}>
                {wallets.map((wallet) => (
                    <View key={wallet.id} style={styles.walletContainer}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>{wallet.name}</Text>
                            <Text style={{ fontSize: 16, color: 'white' }}>Balance: ${wallet.balance}</Text>
                            <View style={styles.walletActionBtns}>
                                <TouchableOpacity style={styles.walletDepositBtn}>
                                    <Text style={{ fontSize: 14, fontWeight: 'semibold', color: 'white' }}>Deposit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.walletTransferBtn}>
                                    <Text style={{ fontSize: 14, fontWeight: 'semibold', color: 'white' }}>Transfer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Image source={require('../assets/images/wallet2.png')} style={{ width: 150, height: 150 }} />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default MyWalletsModal;

const styles = StyleSheet.create({

    headingContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 140,
    },

    headingUnderLine: {
        width: 80,
        height: 2,
        backgroundColor: primary.DEFAULT,
        marginTop: 2,
    },

    walletsList: {
        gap: 4,
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },

    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: primary.mid,
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 4,
        marginHorizontal: 4,
        justifyContent: 'space-around',
        elevation: 4,
    },

    walletActionBtns: {
        flexDirection: 'row',
        marginTop: 14,
    },

    walletDepositBtn: {
        marginRight: 10,
        backgroundColor: primary.DEFAULT,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,
    },

    walletTransferBtn: {
        borderWidth: 2,
        borderColor: primary.DEFAULT,
        backgroundColor: 'transparent',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,
    },


})