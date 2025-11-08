import React, { useEffect, useState } from 'react'
import { Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'

const QRScanner = ({ setQrData, onClose }) => {
    const [permission, requestPermission] = useCameraPermissions()
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        if (permission && !permission.granted) requestPermission()
    }, [permission])

    // if (Platform.OS === 'web') {
    //     return <View style={styles.center}><Text>QR scanning not supported on web.</Text></View>
    // }
    if (!permission) {
        return <View style={styles.center}><Text>Requesting camera permission…</Text></View>
    }
    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <Text>Camera permission is required.</Text>
                <TouchableOpacity style={styles.btn} onPress={requestPermission}>
                    <Text style={styles.btnText}>Allow Camera</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const onScanned = ({ data }) => {
        // console.log("QR:", data)
        setScanned(true)
        setQrData?.(data)
        onClose?.()
    }

    return (
        <View style={styles.fill}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={scanned ? undefined : onScanned}
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            />
            <View style={styles.frame} pointerEvents="none" />
            {scanned && (
                <TouchableOpacity style={styles.rescan} onPress={() => setScanned(false)}>
                    <Text style={styles.btnText}>Scan again</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    fill: {
        ...Platform.select({
            web: { backgroundColor: '#000', height: '50vh', width: '60vw' },
            default: { backgroundColor: '#000', height: 200, width: 300 }
        })
    },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
    frame: {
        position: 'absolute', top: '18%', left: '12%', right: '12%', height: '60%',
        borderWidth: 3, borderColor: '#2ecc71', borderRadius: 14,
    },
    rescan: {
        position: 'absolute', bottom: 28, alignSelf: 'center',
        backgroundColor: '#2ecc71', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10,
    },
    btn: { marginTop: 12, backgroundColor: '#2ecc71', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8 },
    btnText: { color: '#fff', fontWeight: '600' },
})

export default QRScanner