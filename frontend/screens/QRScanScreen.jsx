import { Image } from 'expo-image'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors'
import { useNavigation } from '@react-navigation/native'
import QRScanner from '../components/QRScanner'

const QRScanScreen = () => {

    const navigation = useNavigation();

    const [qrData, setQrData] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const waveAnim = useRef(new Animated.Value(0)).current;

    const [toggleWave, setToggleWave] = useState(false);

    useEffect(() => {
        // Wave animation
        if (!toggleWave) {
            Animated.timing(waveAnim, {
                toValue: -35,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(waveAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }
        setToggleWave(!toggleWave);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waveAnim]);

    return (
        <View style={{ flex: 1, backgroundColor: primary.mid }}>
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
                    <Animated.Image
                        source={require('../assets/images/wave.png')}
                        style={[styles.wave, { top: 80, left: 0, transform: [{ translateX: waveAnim }] }]}
                    />

                    <TouchableOpacity
                        style={styles.qrCodeWrapper}
                        disabled={isScanning}
                        onPress={() => setIsScanning(true)}
                    >
                        {isScanning ? <QRScanner setQrData={setQrData} />
                            :
                            <View>
                                <Image source={require('../assets/images/qrcode.png')} style={styles.qrCode} />
                                <Text style={styles.qrCodeText}>Tap to Scan</Text>
                            </View>
                        }
                    </TouchableOpacity>

                    {/* wave image */}
                    <Animated.Image
                        source={require('../assets/images/wave.png')}
                        style={[styles.wave, { top: 280, left: -20, transform: [{ translateX: waveAnim }] }]}
                    />

                </View>


                {/* Coins Images */}
                <View style={styles.coinsLayer}>
                    <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { top: 5, left: 40 }]} />
                    <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { bottom: 50, left: 70 }]} />
                    <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { top: 5, right: 120 }]} />
                    <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: 40, right: 80 }]} />
                    <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { top: -10, left: 110 }]} />
                    <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: 70, left: 140 }]} />
                    <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { top: -10, right: 40 }]} />
                    <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: 90, right: 40 }]} />
                    <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { bottom: 60, right: 120 }]} />
                    <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { bottom: 140, right: 20 }]} />
                    <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: 220, right: 50 }]} />
                    <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { bottom: 270, right: 20 }]} />
                    <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: 300, right: 60 }]} />
                    <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { bottom: 140, left: 20 }]} />
                    <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: 220, left: 50 }]} />
                    <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { bottom: 270, left: 20 }]} />
                    <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: 300, left: 60 }]} />
                </View>

                {/* QR Footer */}
                <View style={styles.qrFooter}>
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Payment with QR Code</Text>
                    <Text style={{ color: accent.darker, fontSize: 14, fontWeight: '400', marginTop: 5 }}>Hold the code inside the frame, then tap scan to proceed payment.</Text>
                    <TouchableOpacity
                        style={[styles.scanBtn, { backgroundColor: qrData ? primary.DEFAULT : accent.dark }]}
                        onPress={() => { if (qrData || true) navigation.navigate("enter-money"); }}
                        // disabled={!qrData}
                    >
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

    qrCode: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        opacity: 0.4,
    },

    qrCodeWrapper: {
        padding: 20,
        alignSelf: 'center',
        backgroundColor: primary.dark,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: primary.DEFAULT,
        position: 'relative',
        zIndex: 9999,
    },

    qrCodeText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: "50%",
        alignSelf: 'center',
    },

    qrFooter: {
        padding: 30,
        backgroundColor: accent.DEFAULT,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        top: 600,
    },

    scanBtn: {
        marginTop: 20,
        marginBottom: 40,
        paddingVertical: 10,
        marginHorizontal: 80,
        borderRadius: 10,
        alignItems: 'center'
    },

    wave: {
        height: 160,
        width: '120%',
        position: 'absolute',
        zIndex: -1,
    },

    coinsLayer: {
        position: 'absolute',
        top: 120,
        left: 0,
        right: 0,
        height: 380,
        pointerEvents: 'none',
    },

    coin: {
        position: 'absolute',
        width: 24,
        height: 24,
        zIndex: -1,
    },
});