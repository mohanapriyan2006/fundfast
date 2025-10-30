import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { accent } from '../theme/colors'
import OtherHeader from '../components/OtherHeader'

const ProfileScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT }}>
            <ScrollView style={{ flex: 1 }}>
                <OtherHeader />
            </ScrollView>
        </View>
    )
}

export default ProfileScreen;


const styles = StyleSheet.create({

});
