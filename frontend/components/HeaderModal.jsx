import React, { act, useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import RoundMenuHeader from './RoundMenuHeader';
import RoundMenu from './RoundMenu';
import { Image } from 'expo-image';
import { primary } from '../theme/colors';
import DataContext from '../context/DataContext';

const HeaderModal = () => {

    const { pathname, activeModal, setActiveModal } = useContext(DataContext);

    useEffect(() => {
        console.log(activeModal, " Clicked !");
    }, [activeModal])

    return (
        <View style={[styles.headerContainer]}>

            {(pathname === '/home' || pathname === '')&& <View style={styles.headerRow}>
                <View style={styles.headerTextGroup}>
                    <Text style={styles.helloText}>hello !</Text>
                    <Text style={styles.nameText}>Tony stark,</Text>
                </View>
                <View style={styles.walletImageWrap}>
                    <Image
                        source={require('../assets/images/wallet1.png')}
                        style={styles.walletImage}
                    />
                </View>
            </View>}

            {/* Round menu */}
            {activeModal !== 'home' && <RoundMenuHeader />}
            <RoundMenu />

            {/* Coins Images */}
            <View>
                <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { top: 0, left: 0 }]} />
                <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { bottom: -65, left: 20 }]} />
                <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { top: 70, left: 0 }]} />
                <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { bottom: -135, left: 20 }]} />
                <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { top: 0, right: 0 }]} />
                <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: -65, right: 20 }]} />
                <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { top: 70, right: 0 }]} />
                <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: -135, right: 20 }]} />
            </View>

            {/* wave image */}
            <Image
                source={require('../assets/images/wave.png')}
                style={styles.wave}
            />

        </View>
    )
}

export default HeaderModal;


const styles = StyleSheet.create({
    flex1: { flex: 1 },

    headerContainer: {
        height: 220,
        width: '100%',
        position: 'relative',
        backgroundColor: primary.mid,
        padding: 16,
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    headerTextGroup: {
        // replace gap-2
        rowGap: 8,
    },

    helloText: {
        fontStyle: 'italic',
        color: '#FFFFFF',
        fontSize: 18,
    },

    nameText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '600',
        textTransform: 'capitalize',
    },

    walletImageWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    walletImage: {
        height: 120,
        width: 120,
    },

    coin: {
        height: 30,
        width: 30,
        position: 'absolute',
    },

    wave: {
        height: 160,
        width: '120%',
        position: 'absolute',
        top: 220,
        left: -40,
        zIndex: -1,
    }
});