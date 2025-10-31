import { Image } from 'expo-image'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors'

const QRScanScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: primary.mid, paddingBottom: 40 }}>
            <ScrollView style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backIcon]}>
                        <Image source={require('../assets/images/back-light.png')} style={{ width: 30, height: 30, }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', zIndex: 99 }}>QR Scan</Text>
                </View>

                {/* QR Scanner */}
                <View>
                    {/* wave image */}
                    <Image
                        source={require('../assets/images/wave.png')}
                        style={styles.wave}
                    />

                    
                </View>

                {/* QR Footer */}
                <View style={styles.qrFooter}>
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Payment with QR Code</Text>
                    <Text style={{ color: accent.darker, fontSize: 14, fontWeight: '400', marginTop: 5 }}>Hold the code inside the frame, it will be scanned automatically</Text>
                    <TouchableOpacity style={styles.scanBtn}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Scan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default QRScanScreen;

const styles = StyleSheet.create({
    backIcon: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 999,
    },


    qrFooter: {
        padding: 30,
        backgroundColor: accent.DEFAULT,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        top: 470,
    },

    scanBtn: {
        marginTop: 20,
        marginBottom: 40,
        backgroundColor: primary.DEFAULT,
        paddingVertical: 10,
        marginHorizontal: 80,
        borderRadius: 10,
        alignItems: 'center'
    },

    wave: {
        height: 160,
        width: '120%',
        position: 'absolute',
        top: 80,
        left: 0,
        zIndex: -1,
    },
});