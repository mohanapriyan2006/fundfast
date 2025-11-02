import React, { useEffect, useState } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'

let Scanner = null
let askPermission = null
try {
    if (Platform.OS !== 'web') {
        const mod = require('expo-barcode-scanner')
        Scanner = mod.BarCodeScanner
        askPermission = mod.requestPermissionsAsync
    }
} catch { /* noop */ }

const QRScanner = ({ setQRData, onClose }) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        let mounted = true
            ; (async () => {
                if (!Scanner || !askPermission) {
                    if (mounted) setHasPermission(false)
                    return
                }
                const { status } = await askPermission()
                if (mounted) setHasPermission(status === 'granted')
            })()
        return () => { mounted = false }
    }, [])

    if (!Scanner) {
        return (
            <View style={styles.center}>
                <Text style={{ color: 'white' }}>QR scanning not supported here. Use Android/iOS build.</Text>
            </View>
        )
    }
    if (hasPermission === null) {
        return <View style={styles.center}><Text style={{ color: 'white' }}>Requesting camera permission…</Text></View>
    }
    if (hasPermission === false) {
        return <View style={styles.center}><Text style={{ color: 'white' }}>No access to camera</Text></View>
    }

    return (
        <View style={styles.fill}>
            <Scanner
                onBarCodeScanned={scanned ? undefined : ({ data }) => {
                    setScanned(true)
                    setQRData?.(data)
                    onClose?.()
                }}
                style={StyleSheet.absoluteFillObject}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    fill: { flex: 1 },
})

export default QRScanner