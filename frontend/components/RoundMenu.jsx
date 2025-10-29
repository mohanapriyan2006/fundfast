import { Image } from 'expo-image'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const RoundMenu = () => {
    return (
        <View style={{ position: 'absolute', top: 120, left: '50%', transform: [{ translateX: '-40%' }, { rotate: '45deg' }], zIndex: 99 }} className="shadow-2xl">

            <View className="h-[220px] w-[220px] relative bg-primary rounded-full flex items-center justify-center">
                <View className="h-[100px] w-[100px] bg-primary-mid rounded-full flex items-center justify-center">
                    <TouchableOpacity>
                        <Image source={require('../assets/images/qrscan.png')} style={{ height: 80, width: 80 }} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ position: 'absolute', top: 5, left: '50%', transform: [{ translateX: '-50%' }], zIndex: 999 }}>
                    <Image
                        source={require('../assets/images/wallet-icon.png')}
                        style={{ height: 50, width: 50 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', top: 90, right: 5, zIndex: 999 }}>
                    <Image
                        source={require('../assets/images/cash-icon.png')}
                        style={{ height: 50, width: 50 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', bottom: 5, left: '50%', transform: [{ translateX: '-50%' }], zIndex: 999 }}>
                    <Image
                        source={require('../assets/images/transfer-icon.png')}
                        style={{ height: 50, width: 50 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', top: 90, left: 10, zIndex: 999 }}>
                    <Image
                        source={require('../assets/images/history-icon.png')}
                        style={{ height: 50, width: 50 }}
                    />
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default RoundMenu