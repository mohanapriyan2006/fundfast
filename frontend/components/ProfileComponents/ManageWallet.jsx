import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../../theme/colors'
import OtherHeader from '../OtherHeader'
import { TextInput } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import DataContext from '../../context/DataContext'
import { useNavigation } from '@react-navigation/native'



const ManageWallet = () => {

    const { myWallets, updateWalletState, setUpdateWalletState, updateWallet, deleteWallet } = useContext(DataContext);

    const navigation = useNavigation();

    const [isEditing, setIsEditing] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedWallet, setSelectedWallet] = useState(myWallets[0] || { id: 1, walletName: "wallet1" });

    useEffect(() => {
        setUpdateWalletState({ name: selectedWallet.walletName });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedWallet]);

    const handleUpdateWallet = async () => {
        try {
            await updateWallet(selectedWallet.id);
            navigation.goBack();
        } catch (err) {
            console.log("Error updating wallet:", err);
        }
    }

    const handleDeleteWallet = async () => {
        try {
            await deleteWallet(selectedWallet.id);
            navigation.goBack();
        } catch (err) {
            console.log("Error deleting wallet:", err);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ height: 500 }}>
                {/* Header */}
                <OtherHeader title='Manage Wallet' />

                <View style={styles.ManageWalletContent}>
                    <Text style={{ color: primary.dark, fontSize: 16, marginVertical: 20 }}>
                        Here you can manage your wallets.
                    </Text>

                    {/* Form Container */}
                    {myWallets.length > 0 ?
                        <View style={styles.formContainer}>

                            <Text style={styles.formLabel}>Select Wallet:</Text>
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={selectedWallet}
                                    onValueChange={(itemValue) => setSelectedWallet(itemValue)}
                                    mode="dropdown"
                                    dropdownIconColor="#fff"
                                    style={styles.picker}
                                    itemStyle={styles.pickerItem}
                                >
                                    {myWallets.map((w, ind) => (
                                        <Picker.Item key={ind} value={w} label={w.walletName} />
                                    ))}
                                </Picker>
                            </View>


                            {!isEditing && <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                                <TouchableOpacity
                                    style={[styles.btn, { backgroundColor: '#009dffff', }]}
                                    onPress={() => setIsEditing(true)}
                                >
                                    <Image style={{ height: 24, width: 24, tintColor: 'white' }} source={require("../../assets/images/edit.png")} />
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.btn, { backgroundColor: '#dd0000ff', }]}
                                    onPress={() => setShowDeleteModal(true)}
                                >
                                    <Image style={{ height: 20, width: 20, tintColor: 'white' }} source={require("../../assets/images/trash.png")} />
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Delete</Text>
                                </TouchableOpacity>

                            </View>}

                            {isEditing && <View>
                                <TextInput
                                    placeholder="Enter wallet's name"
                                    value={updateWalletState?.name}
                                    onChangeText={(v) => setUpdateWalletState({ ...updateWalletState, name: v })}
                                    style={styles.inputBox}
                                />

                                {updateWalletState?.error &&
                                    <Text style={{ color: 'red', marginBottom: 10 }}>{updateWalletState.error.toString()}</Text>}

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                                    <TouchableOpacity
                                        style={{ backgroundColor: accent.dark, width: '40%', borderRadius: 10, padding: 10, alignSelf: 'center', alignItems: 'center' }}
                                        onPress={() => setIsEditing(false)}
                                    >
                                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ backgroundColor: primary.DEFAULT, width: '40%', borderRadius: 10, padding: 10, alignSelf: 'center', alignItems: 'center' }}
                                        onPress={handleUpdateWallet}
                                    >
                                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Update</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>}


                        </View>
                        :
                        <Text style={{ color: accent.darker, fontSize: 16, marginVertical: 20, textAlign: 'center' }}>
                            You have no wallets to manage. Please create a wallet first.
                        </Text>
                    }

                </View>

            </ScrollView >

            {showDeleteModal && <ConfirmDeleteModal item={selectedWallet?.walletName + " wallet"} onConfirm={handleDeleteWallet} onCancel={() => setShowDeleteModal(false)} />}

        </View >
    )
}

export default ManageWallet;


const styles = StyleSheet.create({
    ManageWalletContent: {
        padding: 20,
        backgroundColor: accent.DEFAULT,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: -20,
    },

    formContainer: {
        marginVertical: 20,
        paddingHorizontal: 30,
    },

    formLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
        color: accent.darker,
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

    btn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        gap: 10,
        width: '40%',
        borderRadius: 10,
        marginTop: 10,
    },

    inputBox: {
        height: 50,
        backgroundColor: '#FFFFFF',
        borderColor: primary.dark,
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },


});
