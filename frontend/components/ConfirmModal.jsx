import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors'

const ConfirmModal = ({ title = "Logout", onConfirm, onCancel }) => {

    return (
        <View style={styles.modal}>
            <View style={styles.modalContent}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: primary.dark }}>Confirm {title}</Text>
                <Text style={{ fontSize: 16, fontWeight: '500', color: accent.darker, marginTop: 20, marginHorizontal: 10 }}>Are you sure you want to {title}?</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        style={[{ backgroundColor: accent.dark }, styles.btn]}
                        onPress={onCancel}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>No</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[{ backgroundColor: primary.DEFAULT }, styles.btn]}
                        onPress={onConfirm}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Yes</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default ConfirmModal;


const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: '#0000008a',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        zIndex: 99999,
    },

    modalContent: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        elevation: 5,
    },

    btn: {
        alignItems: 'center',
        padding: 10,
        width: '40%',
        borderRadius: 10,
        marginTop: 20,
    },

});