import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../../theme/colors'
import OtherHeader from '../OtherHeader'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker'
import ConfirmDeleteModal from './ConfirmDeleteModal'



const ManageWallet = () => {

    const navigation = useNavigation();

    const [walletName, setWalletName] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedWallet, setSelectedWallet] = useState("wallet1");

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ flex: 1 }}>
                {/* Header */}
                <OtherHeader title='Manage Wallet' />

                <View style={styles.ManageWalletContent}>
                    <Text style={{ color: primary.dark, fontSize: 16, marginVertical: 20 }}>
                        Here you can manage your wallets.
                    </Text>

                    {/* Form Container */}
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
                                <Picker.Item label="Wallet 1" value="wallet1" />
                                <Picker.Item label="Wallet 2" value="wallet2" />
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
                                value={walletName}
                                // onValueChange={(value) => setWalletName(prev => prev + value)}
                                style={styles.inputBox}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                                <TouchableOpacity
                                    style={{ backgroundColor: accent.dark, width: '40%', borderRadius: 10, padding: 10, alignSelf: 'center', alignItems: 'center' }}
                                    onPress={() => setIsEditing(false)}
                                >
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ backgroundColor: primary.DEFAULT, width: '40%', borderRadius: 10, padding: 10, alignSelf: 'center', alignItems: 'center' }}
                                    onPress={() => { /* Handle adding a new wallet */ }}
                                >
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Update</Text>
                                </TouchableOpacity>

                            </View>

                        </View>}


                    </View>

                </View>

            </ScrollView >

            {showDeleteModal && <ConfirmDeleteModal item={selectedWallet} onConfirm={() => { /* Handle delete confirmation */ }} onCancel={() => setShowDeleteModal(false)} />}

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
