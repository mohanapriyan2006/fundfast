import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors'
import OtherHeader from '../components/OtherHeader'
import { useNavigation } from '@react-navigation/native'
import ConfirmDeleteModal from '../components/ProfileComponents/ConfirmDeleteModal'
import ConfirmModal from '../components/ConfirmModal'



const ProfileScreen = () => {

    const navigation = useNavigation();

    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const settings = [
        {
            id: 1,
            label: "Edit Profile",
            icon: require("../assets/images/profile-icon.png"),
            event: () => { navigation.navigate("edit-profile"); },
        },
        {
            id: 2,
            label: "Manage Wallets",
            icon: require("../assets/images/wallet-icon.png"),
            event: () => { navigation.navigate("manage-wallet"); },
        },
        {
            id: 3,
            label: "Change Password",
            icon: require("../assets/images/password.png"),
            event: () => { navigation.navigate("change-password"); },
        },
        {
            id: 4,
            label: "Change Wallet PIN",
            icon: require("../assets/images/pin.png"),
            event: () => { navigation.navigate("change-pin"); },
        },
        {
            id: 5,
            label: "Terms & Conditions",
            icon: require("../assets/images/terms-icon.png"),
            event: () => { navigation.navigate("terms-conditions"); },
        },
        {
            id: 6,
            label: "About",
            icon: require("../assets/images/info-icon.png"),
            event: () => { navigation.navigate("about"); },
        },
    ]

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ flex: 1 }}>
                {/* Header */}
                <OtherHeader title='Profile' />

                {/* Profile Content */}
                <View style={styles.profileContent}>
                    {/* User details */}
                    <View style={styles.userDetailsContainer}>
                        <View style={styles.profileImageWrapper}>
                            <Image style={{ width: 70, height: 70, tintColor: accent.DEFAULT }} source={require("../assets/images/profile-icon.png")} />
                        </View>

                        <View style={{ flexDirection: 'column', gap: 2 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'semibold', color: "black" }}>John Doe</Text>
                            <Text style={{ fontSize: 16, fontWeight: '400', color: "black" }}>username: johndoe</Text>
                            <Text style={{ fontSize: 16, color: accent.darker }}>johndoe@example.com</Text>
                        </View>
                    </View>

                    {/* Settings */}
                    <View style={{ marginVertical: 30, gap: 15 }}>
                        {settings.map((setting) => (
                            <TouchableOpacity
                                key={setting.id}
                                style={styles.settingItem}
                                onPress={setting.event}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Image source={setting.icon} style={{ width: 24, height: 24, tintColor: primary.mid }} />
                                    <Text style={{ fontSize: 16, fontWeight: '500', color: "black" }}>{setting.label}</Text>
                                </View>
                                <Image source={require("../assets/images/right-arrow.png")} style={{ width: 20, height: 20, tintColor: primary.mid }} />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            marginHorizontal: 10,
                            backgroundColor: accent.DEFAULT,
                            borderWidth: 3,
                            borderColor: "#b00000ff",
                            borderRadius: 5,
                        }}
                            onPress={() => setShowConfirmModal(true)}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Image source={require("../assets/images/logout-icon.png")} style={{ width: 24, height: 24, tintColor: "#b00000ff" }} />
                                <Text style={{ fontSize: 16, fontWeight: '500', color: "#b00000ff" }}>Logout</Text>
                            </View>
                            <Image source={require("../assets/images/right-arrow.png")} style={{ width: 20, height: 20, tintColor: "#b00000ff" }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            marginHorizontal: 10,
                            backgroundColor: accent.DEFAULT,
                            borderWidth: 3,
                            borderColor: "#dd0000ff",
                            borderRadius: 5,
                        }}
                            onPress={() => setShowDeleteModal(true)}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Image source={require("../assets/images/trash.png")} style={{ width: 24, height: 24, tintColor: "#dd0000ff" }} />
                                <Text style={{ fontSize: 16, fontWeight: '500', color: "#dd0000ff" }}>Delete Account</Text>
                            </View>
                            <Image source={require("../assets/images/right-arrow.png")} style={{ width: 20, height: 20, tintColor: '#dd0000ff' }} />
                        </TouchableOpacity>

                    </View>
                </View>

            </ScrollView >

            {showConfirmModal && <ConfirmModal title="Logout" onConfirm={() => navigation.navigate("login")} onCancel={() => setShowConfirmModal(false)} />}

            {showDeleteModal && <ConfirmDeleteModal item="Your Account" onConfirm={() => { }} onCancel={() => setShowDeleteModal(false)} />}

        </View >
    )
}

export default ProfileScreen;


const styles = StyleSheet.create({
    profileContent: {
        padding: 20,
        backgroundColor: accent.DEFAULT,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: -30,
    },

    profileImageWrapper: {
        backgroundColor: primary.DEFAULT,
        borderRadius: '50%',
        height: 90,
        width: 90,
        padding: 10
    },

    userDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        borderBottomColor: accent.dark,
        borderBottomWidth: 1,
        paddingBottom: 10
    },

    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: accent.DEFAULT,
        borderWidth: 3,
        borderColor: primary.mid,
        borderRadius: 5,
    },

});
