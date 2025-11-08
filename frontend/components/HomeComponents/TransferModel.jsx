import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../../theme/colors';
import { Picker } from '@react-native-picker/picker';
import { useContext, useState } from 'react';
import DataContext from '../../context/DataContext';

const TransferModal = ({ setShowConfirmModal }) => {

    const { transferState, setTransferState, myWallets, fetchWalletByUsername } = useContext(DataContext);

    const [toWallets, setToWallets] = useState([]);
    const [walletFound, setWalletFound] = useState(false);
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const handleRecipientUsernameSubmit = async () => {
        if (!username) {
            setError("Please enter a username.");
            return;
        }
        try {
            const wallets = await fetchWalletByUsername(username.toLowerCase().trim());
            setToWallets(wallets.length > 0 ? wallets : []);
            setError(wallets.length > 0 ? "" : "No wallets found for this username.");
            setWalletFound(wallets.length > 0);
        } catch (error) {
            setWalletFound(false);
            setError(error.toString() || "Failed to fetch recipient wallet.");
            // console.log("Error fetching recipient wallet:", error);
        }
    };

    const handleTransferSubmit = () => {
        // Basic validation
        if (transferState.from === 0) {
            setError("Please select a wallet to transfer from.");
            return;
        }
        if (transferState.to === 0) {
            setError("Please select a wallet to transfer to.");
            return;
        }
        if (transferState.amount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }
        setError("");
        if (setShowConfirmModal) setShowConfirmModal(p => ({ ...p, transfer: true }));
    };

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
                <View style={[styles.pickerWrapper, { backgroundColor: primary.mid }]}>
                    <Picker
                        selectedValue={transferState.from}
                        onValueChange={(v) => { setTransferState({ ...transferState, from: v }); setError(""); }}
                        mode="dropdown"
                        dropdownIconColor="#fff"
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label="Select Wallet" value={0} />
                        {myWallets.map(wallet => (
                            <Picker.Item key={wallet.id} label={wallet.walletName} value={wallet.id} />
                        ))}
                    </Picker>
                </View>


                <Text style={styles.formLabel}>Select Recipient Wallet:</Text>
                <View style={styles.amountInput}>
                    <TextInput
                        placeholder="Search Wallet by username"
                        style={{ fontSize: 16, color: 'black' }}
                        value={username}
                        placeholderTextColor={accent.dark}
                        onChangeText={(v) => setUsername(v)}
                        onSubmitEditing={handleRecipientUsernameSubmit}
                    />
                    <TouchableOpacity onPress={handleRecipientUsernameSubmit} style={{ position: 'absolute', right: 10, top: 12 }}>
                        <Text style={{ color: primary.DEFAULT, fontWeight: 'bold' }}>Fetch</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.pickerWrapper, { backgroundColor: walletFound ? primary.mid : accent.dark }]}>
                    <Picker
                        selectedValue={transferState.to}
                        onValueChange={(v) => { setTransferState({ ...transferState, to: v }); setError(""); }}
                        mode="dropdown"
                        dropdownIconColor="#fff"
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label={walletFound ? "Select Wallet" : "No Wallets Found"} value={0} />
                        {toWallets.length > 0 && toWallets.map(wallet => (
                            <Picker.Item key={wallet.id} label={wallet.walletName} value={wallet.id} />
                        ))}
                    </Picker>
                </View>


                <Text style={styles.formLabel}>Amount:</Text>
                <View style={styles.amountInput}>
                    <TextInput
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        placeholderTextColor={accent.dark}
                        style={{ fontSize: 16, color: 'black' }}
                        value={transferState.amount}
                        onChangeText={(v) => { setTransferState({ ...transferState, amount: v }); setError(""); }}
                    />
                </View>

                {/* error */}
                {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleTransferSubmit}
                >
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

    pickerWrapper: {
        height: 50,
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