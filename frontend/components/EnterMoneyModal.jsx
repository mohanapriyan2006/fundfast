import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'

const EnterMoneyModal = () => {

    const navigation = useNavigation();

    const item = navigation.getState()?.routes[navigation.getState().index]?.params?.item || null;

    const getImageSource = (itemName) => {
        switch (itemName) {
            case 'Electricity':
                return require("../assets/images/electricity.png");
            case 'Recharge':
                return require("../assets/images/recharge.png");
            case 'Vouchers':
                return require("../assets/images/voucher.png");
            case 'DTH':
                return require("../assets/images/dth.png");
            default:
                return require("../assets/images/cash-icon.png");
        }
    }

    return (
        <View style={styles.modal}>
            <View style={styles.modalContent}>
                <View style={styles.imageWrapper}>
                    <Image style={[styles.modalImage, { tintColor: item ? null : primary.dark }]} source={getImageSource(item)} />
                </View>

                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: primary.dark }}>Payment</Text>
                <Text style={{ fontSize: 16, fontWeight: '500', color: primary.dark, marginTop: 20, marginHorizontal: 10 }}>Enter amount for {item ? item : "Payment"}</Text>

                <View style={styles.formContainer}>

                    <View>
                        <Text style={styles.formLabel}>Select Wallet :</Text>
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
                    </View>

                    <TextInput
                        placeholder="$ Enter amount"
                        style={styles.inputBox}
                        keyboardType="numeric"
                        maxLength={8}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>

                        <TouchableOpacity
                            style={[{ backgroundColor: accent.dark }, styles.btn]}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: primary.DEFAULT, }]}
                            onPress={() => navigation.navigate("pin")}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Pay</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </View>
    )
}

export default EnterMoneyModal;


const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: '#0000008a',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center'
    },

    modalImage: {
        width: 40,
        height: 40,
        alignSelf: 'center',
    },

    imageWrapper: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        marginTop: -50,
        alignSelf: 'center',
    },

    modalContent: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        elevation: 5,
    },

    formContainer: {
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
    },

    formLabel: {
        fontSize: 16,
        marginBottom: 10,
        color: accent.darker,
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
        justifyContent: 'center',
        paddingHorizontal: 10,
    },

    pickerWrapper: {
        height: 50,
        backgroundColor: primary.mid,
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
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

});