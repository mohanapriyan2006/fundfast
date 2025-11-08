
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../../theme/colors';
import { Picker } from '@react-native-picker/picker';
import { useContext, useState } from 'react';
import DataContext from '../../context/DataContext';


const DepositModal = ({ setShowConfirmModal }) => {

    const { myWallets, depositWalletState, setDepositWalletState } = useContext(DataContext);

    const [error, setError] = useState('');

    const handleWalletChange = (walletId) => {
        setDepositWalletState((prevState) => ({ ...prevState, id: walletId }));
    };

    const handleDepsitSubmit = () => {
        if (!depositWalletState.id) {
            setError('Please select a wallet.');
            return;
        }
        if (!depositWalletState.amount || isNaN(depositWalletState.amount) || Number(depositWalletState.amount) <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        if (setShowConfirmModal) setShowConfirmModal(p => ({ ...p, deposit: true }));
    }

    return (
        <View style={{ paddingBottom: 140 }}>
            {/* My Wallets Modal Content */}
            <View style={styles.headingContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Deposit Money</Text>
                <View style={styles.headingUnderLine}></View>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Select Wallet :</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={depositWalletState.id}
                        onValueChange={handleWalletChange}
                        mode="dropdown"
                        dropdownIconColor="#fff"
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label="Select Wallet" value={0} />
                        {myWallets.map((wallet) => (
                            <Picker.Item
                                key={wallet.id}
                                label={wallet.walletName}
                                value={wallet.id}
                            />
                        ))}
                    </Picker>
                </View>


                <Text style={styles.formLabel}>Amount :</Text>
                <View style={styles.amountInput}>
                    <TextInput
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        style={{ fontSize: 16, color: 'black' }}
                        value={depositWalletState.amount}
                        onChangeText={(text) => setDepositWalletState((prevState) => ({ ...prevState, amount: text }))}
                    />
                </View>

                {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleDepsitSubmit}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Deposit</Text>
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
        marginTop: 80,
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
        color: accent.darker,
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


})