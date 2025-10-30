import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { accent } from '../theme/colors'

const ProfileScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT }}>
            <ScrollView style={{ flex: 1 }}>
                <Text>Profile Screen</Text>
            </ScrollView>
        </View>
    )
}

export default ProfileScreen;
