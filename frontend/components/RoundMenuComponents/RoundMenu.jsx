import { Image } from 'expo-image'
import React, { useContext, useEffect, useRef } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { primary } from "../../theme/colors";
import DataContext from '../../context/DataContext';
import { useNavigation } from '@react-navigation/native';

const RoundMenu = () => {

    const { activeModal, setActiveModal } = useContext(DataContext);

    const navigation = useNavigation();

    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        rotateAnim.setValue(5);
    }, [rotateAnim]);

    useEffect(() => {
        const getRotateValue = () => {
            switch (activeModal) {
                case 'home': return 0;
                case 'My wallets': return 1;
                case 'Deposit': return 2;
                case 'Transfer': return 3;
                case 'History': return 4;
                default: return 5;
            }
        };

        Animated.timing(rotateAnim, {
            toValue: getRotateValue(),
            duration: 1000,
            useNativeDriver: true,
        }).start();

    }, [activeModal, rotateAnim]);

    const handleClick = (modalName) => {
        setActiveModal(modalName);
    }

    return (
        <Animated.View style={[styles.container, { transform: [{ rotate: rotateAnim.interpolate({ inputRange: [0, 1, 2, 3, 4, 5], outputRange: ['0deg', '-45deg', '-135deg', '-225deg', '-315deg', '-360deg'] }) }] }]}>
            <View style={styles.outerCircle}>
                <View style={styles.innerCircle}>
                    <TouchableOpacity onPress={() => navigation.navigate("scan")}>
                        <Image source={require('../../assets/images/qrscan.png')} style={styles.centerIcon} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.iconTopCenter]}
                    onPress={() => handleClick("My wallets")}
                >
                    <Image source={require('../../assets/images/wallet-icon.png')} style={styles.menuIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconRight}
                    onPress={() => handleClick("Deposit")}
                >
                    <Image source={require('../../assets/images/cash-icon.png')} style={styles.menuIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconBottomCenter}
                    onPress={() => handleClick("Transfer")}
                >
                    <Image source={require('../../assets/images/transfer-icon.png')} style={styles.menuIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconLeft}
                    onPress={() => handleClick("History")}
                >
                    <Image source={require('../../assets/images/history-icon.png')} style={styles.menuIcon} />
                </TouchableOpacity>
            </View>
        </Animated.View>
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
        zIndex: 99,
    },
    outerCircle: {
        transform: [{ rotate: '45deg' }],
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