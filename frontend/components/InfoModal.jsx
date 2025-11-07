import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors'

const InfoModal = ({ type = "info", title = "Logout", msg = "Unable to process request", onConfirm, onCancel }) => {

    return (
        <View style={styles.modal}>
            <View style={styles.modalContent}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' , textDecorationLine: 'underline', color: type === "info" ? primary.dark : '#b00000ff' }}>{type === "error" ? "Error !" : "Info"}</Text>

                <Text style={{ fontSize: 18, fontWeight: '500', color: type === "info" ? primary.dark : '#b00000ff', marginTop: 10, textAlign: 'center' }}>{title}</Text>
                <Text style={{ fontSize: 14, fontWeight: '500', color: accent.darker, marginTop: 10 , textAlign: 'center' }}>{msg}.</Text>

                <TouchableOpacity
                    style={[{ backgroundColor: type === "info" ? primary.DEFAULT : accent.darker }, styles.btn]}
                    onPress={onConfirm}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>OK</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default InfoModal;


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
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
    },

});