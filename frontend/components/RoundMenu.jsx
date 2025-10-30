import { Image } from 'expo-image'
import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { primary } from "../theme/colors";
import DataContext from '../context/DataContext';
import { useRouter } from 'expo-router';

const RoundMenu = () => {

    const { setActiveModal } = useContext(DataContext);

    const router = useRouter();

    const handleClick = (modalName) => {
        setActiveModal(modalName);
    }

    return (
        <View style={styles.container}>
            <View style={styles.outerCircle}>
                <View style={styles.innerCircle}>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/qrscan.png')} style={styles.centerIcon} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.iconTopCenter]}
                    onPress={() => handleClick("My wallets")}
                >
                    <Image source={require('../assets/images/wallet-icon.png')} style={styles.menuIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconRight}
                    onPress={() => handleClick("Deposit")}
                >
                    <Image source={require('../assets/images/cash-icon.png')} style={styles.menuIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconBottomCenter}
                    onPress={() => handleClick("Transfer")}
                >
                    <Image source={require('../assets/images/transfer-icon.png')} style={styles.menuIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconLeft}
                    onPress={() => handleClick("History")}
                >
                    <Image source={require('../assets/images/history-icon.png')} style={styles.menuIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RoundMenu;

const SIZE = 210;
const HALF = SIZE / 2;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 140,
        left: '50%',
        marginLeft: -HALF * 0.8,
        transform: [{ rotate: '45deg' }],
        zIndex: 99,
    },
    outerCircle: {
        borderColor: primary.light,
        borderWidth: 0.5,
        height: SIZE,
        width: SIZE,
        position: 'relative',
        backgroundColor: primary.DEFAULT,
        borderRadius: HALF,
        alignItems: 'center',
        justifyContent: 'center',
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 12,
    },
    innerCircle: {
        height: 100,
        width: 100,
        backgroundColor: primary.mid,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerIcon: {
        height: 80,
        width: 80,
        transform: [{ rotate: '-45deg' }],
    },
    menuIcon: {
        height: 40,
        width: 40,
    },
    iconTopCenter: {
        position: 'absolute',
        top: 5,
        left: '50%',
        marginLeft: -25,
        zIndex: 999,
    },
    iconRight: {
        position: 'absolute',
        top: 90,
        right: 5,
        zIndex: 999,
    },
    iconBottomCenter: {
        position: 'absolute',
        bottom: 5,
        left: '50%',
        marginLeft: -25,
        zIndex: 999,
    },
    iconLeft: {
        position: 'absolute',
        top: 90,
        left: 10,
        zIndex: 999,
    },
});