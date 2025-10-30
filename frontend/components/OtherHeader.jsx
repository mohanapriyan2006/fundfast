import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { primary } from '../theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';

const OtherHeader = ({ title = 'Home' }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>

            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backIcon]}>
                <Image source={require('../assets/images/back-light.png')} style={{ width: 30, height: 30, }} />
            </TouchableOpacity>

            <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', zIndex: 99 }}>{title}</Text>

            {/* Coins Images */}
            <View>
                <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { top: 5, left: 40 }]} />
                <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { bottom: 10, left: 70 }]} />
                <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { top: 5, right: 120 }]} />
                <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: 10, right: 80 }]} />
                <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { top: -10, left: 110 }]} />
                <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: 25, left: 140 }]} />
                <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { top: -10, right: 40 }]} />
                <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: 20, right: 0 }]} />
                <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { bottom: 30, right: 120 }]} />

            </View>

        </View>
    )
}

export default OtherHeader;

const styles = StyleSheet.create({

    headerContainer: {
        height: 150,
        width: '100%',
        position: 'relative',
        backgroundColor: primary.mid,
        padding: 16,
        paddingTop: 60,
    },

    backIcon: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 999,
    },

    coin: {
        height: 30,
        width: 30,
        position: 'absolute',
    },
});
