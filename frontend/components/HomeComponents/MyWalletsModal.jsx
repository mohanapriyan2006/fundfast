import { useContext, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../../theme/colors';
import DataContext from '../../context/DataContext';
import { Image } from 'expo-image';

const MyWalletsModal = ({ setShowConfirmModal }) => {

    const { wallets } = useContext(DataContext);

    const [showAddWallet, setShowAddWallet] = useState(false);

    return (
        <View style={{ paddingBottom: 50 }}>
            {/* My Wallets Modal Content */}
            <View style={[styles.headingContainer, { marginTop: 80}]}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>My Wallets</Text>
                <View style={[styles.headingUnderLine, { width: 80 }]}></View>
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
                            <Image source={require('../../assets/images/wallet2.png')} style={{ width: 150, height: 150 }} />
                        </View>
                    </View>
                ))}
            </View>


            {showAddWallet ? <View>
                <View style={[styles.headingContainer, { marginBottom: 20 }]}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Add a new wallet</Text>
                    <View style={[styles.headingUnderLine, { width: 130 }]}></View>
                </View>
                <TextInput
                    placeholder="Enter wallet's name"
                    style={styles.inputBox}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>

                    <TouchableOpacity
                        style={{ backgroundColor: accent.dark, width: '40%', borderRadius: 10, padding: 10, alignSelf: 'center', alignItems: 'center' }}
                        onPress={() => setShowAddWallet(false)}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ backgroundColor: primary.DEFAULT, width: '40%', borderRadius: 10, padding: 10, alignSelf: 'center', alignItems: 'center' }}
                        onPress={() => { setShowConfirmModal(p => ({ ...p, wallet: true })); }}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Add</Text>
                    </TouchableOpacity>

                </View>

            </View>
                :
                <TouchableOpacity
                    style={[{ backgroundColor: primary.DEFAULT, marginHorizontal: 20 }, styles.btn]}
                    onPress={() => setShowAddWallet(true)}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}> + Add New Wallet</Text>
                </TouchableOpacity>

            }


        </View>
    )
}

export default MyWalletsModal;

const styles = StyleSheet.create({

    headingContainer: {
        display: 'flex',
        alignItems: 'center',
    },

    headingUnderLine: {
        height: 2,
        backgroundColor: primary.DEFAULT,
        marginTop: 2,
    },

    walletsList: {
        gap: 4,
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
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

    btn: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
    },

    inputBox: {
        height: 50,
        backgroundColor: '#FFFFFF',
        borderColor: primary.dark,
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 20,
        marginHorizontal: 30,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },



})