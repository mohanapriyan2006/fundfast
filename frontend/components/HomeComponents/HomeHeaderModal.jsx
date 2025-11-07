import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native';
import RoundMenuHeader from '../RoundMenuComponents/RoundMenuHeader';
import RoundMenu from '../RoundMenuComponents/RoundMenu';
import { Image } from 'expo-image';
import { primary } from '../../theme/colors';
import DataContext from '../../context/DataContext';
import AuthContext from '../../context/AuthContext';

const HomeHeaderModal = () => {

    const { activeModal } = useContext(DataContext);

    const { name } = useContext(AuthContext);


    // Animation for sliding up
    const slideUpAnim = useRef(new Animated.Value(0)).current;
    const waveAnim = useRef(new Animated.Value(0)).current;

    const [toggleWave, setToggleWave] = useState(false);

    useEffect(() => {
        if (activeModal !== 'home') {
            // Slide up 
            Animated.timing(slideUpAnim, {
                toValue: -60,
                duration: 800,
                useNativeDriver: true,
            }).start();
        } else {
            // to original position
            Animated.timing(slideUpAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }).start();
        }
    }, [activeModal, slideUpAnim]);

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
    }, [activeModal, waveAnim]);

    return (
        <Animated.View
            style={[
                styles.headerContainer,
                {
                    transform: [{ translateY: slideUpAnim }],
                }
            ]}
        >

            <View style={[styles.headerRow, { opacity: activeModal === 'home' ? 1 : 0, }]}>
                <View style={styles.headerTextGroup}>
                    <Text style={styles.helloText}>hello !</Text>
                    <Text style={styles.nameText}>{name?.substring(0, 10) || "Tony stark"},</Text>
                </View>
                <View style={styles.walletImageWrap}>
                    <Image
                        source={require('../../assets/images/wallet1.png')}
                        style={styles.walletImage}
                    />
                </View>
            </View>

            {/* Round menu */}
            {activeModal !== 'home' && <RoundMenuHeader />}
            <RoundMenu />

            {/* Coins Images */}
            <View style={{ pointerEvents: 'none' }}>
                <Image source={require('../../assets/images/coin1.png')} style={[styles.coin, { top: 0, left: 0 }]} />
                <Image source={require('../../assets/images/coin2.png')} style={[styles.coin, { bottom: -65, left: 20 }]} />
                <Image source={require('../../assets/images/coin1.png')} style={[styles.coin, { top: 70, left: 0 }]} />
                <Image source={require('../../assets/images/coin2.png')} style={[styles.coin, { bottom: -135, left: 20 }]} />
                <Image source={require('../../assets/images/coin2.png')} style={[styles.coin, { top: 0, right: 0 }]} />
                <Image source={require('../../assets/images/coin1.png')} style={[styles.coin, { bottom: -65, right: 20 }]} />
                <Image source={require('../../assets/images/coin2.png')} style={[styles.coin, { top: 70, right: 0 }]} />
                <Image source={require('../../assets/images/coin1.png')} style={[styles.coin, { bottom: -125, right: 20 }]} />
            </View>

            {/* wave image */}
            <Animated.Image
                source={require('../../assets/images/wave.png')}
                style={[styles.wave, { transform: [{ translateX: waveAnim }] }]}
            />

        </Animated.View>
    )
}

export default HomeHeaderModal;


const styles = StyleSheet.create({
    flex1: { flex: 1 },

    headerContainer: {
        height: 220,
        width: '100%',
        position: 'relative',
        backgroundColor: primary.mid,
        padding: 16,
        paddingTop: 30,
        zIndex: 9999
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
        left: 0,
        zIndex: -1,
    }
});