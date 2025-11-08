import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../../theme/colors'
import OtherHeader from '../OtherHeader'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import { useContext, useEffect } from 'react'
import DataContext from '../../context/DataContext'
import AuthContext from '../../context/AuthContext'


const EditProfile = () => {

    const navigation = useNavigation();

    const { editProfileState, setEditProfileState, updateUserProfile } = useContext(DataContext);

    const { userDetails } = useContext(AuthContext);

    useEffect(() => {
        setEditProfileState({
            name: userDetails?.name || '',
            username: userDetails?.username || '',
            email: userDetails?.email || '',
            error: ''
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetails]);

    const handleUpdateProfile = async () => {
        try {
            await updateUserProfile();
            navigation.goBack();
        } catch (e) {
            console.log("Error updating profile:", e);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ height: 500 }}>
                {/* Header */}
                <OtherHeader title='Edit Profile' />

                <View style={styles.editProfileContent}>
                    <Text style={{ color: primary.dark, fontSize: 16, marginVertical: 20 }}>
                        Here you can update your profile.
                    </Text>

                    {/* Form Container */}
                    <View style={styles.formContainer}>

                        <View>
                            {/* Name */}
                            <Text style={styles.formLabel}>Name :</Text>
                            <TextInput
                                placeholder="Enter your name"
                                style={styles.inputBox}
                                value={editProfileState.name}
                                onChangeText={(text) => setEditProfileState({ ...editProfileState, name: text })}
                            />
                            {/* Username */}
                            <Text style={styles.formLabel}>Username :</Text>
                            <TextInput
                                placeholder="Enter username"
                                style={styles.inputBox}
                                value={editProfileState.username}
                                onChangeText={(text) => setEditProfileState({ ...editProfileState, username: text })}
                            />
                            {/* Email */}
                            <Text style={styles.formLabel}>Email :</Text>
                            <TextInput
                                placeholder="Enter email"
                                style={styles.inputBox}
                                value={editProfileState.email}
                                onChangeText={(text) => setEditProfileState({ ...editProfileState, email: text })}
                            />

                            {/* Error Message */}
                            {editProfileState.error &&
                                <Text style={{ color: 'red', marginBottom: 10 }}>{editProfileState.error.toString()}</Text>}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                                <TouchableOpacity
                                    style={{ backgroundColor: accent.dark, width: '40%', borderRadius: 10, padding: 10, alignSelf: 'center', alignItems: 'center' }}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ backgroundColor: primary.DEFAULT, width: '40%', borderRadius: 10, padding: 10, alignSelf: 'center', alignItems: 'center' }}
                                    onPress={() => handleUpdateProfile()}
                                >
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Update</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>

                </View>

            </ScrollView >
        </View >
    )
}

export default EditProfile;


const styles = StyleSheet.create({
    editProfileContent: {
        padding: 20,
        backgroundColor: accent.DEFAULT,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: -20,
    },

    formContainer: {
        marginVertical: 20,
        paddingHorizontal: 30,
    },

    formLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
        color: accent.darker,
    },

    btn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        gap: 10,
        width: '40%',
        borderRadius: 10,
        marginTop: 10,
    },

    inputBox: {
        height: 50,
        backgroundColor: '#FFFFFF',
        borderColor: primary.dark,
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },


});
