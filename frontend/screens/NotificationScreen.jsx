import React, { useContext, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors'
import OtherHeader from '../components/OtherHeader'
import ConfirmModal from '../components/ConfirmModal'
import DataContext from '../context/DataContext'

const NotificationScreen = () => {

    const { notifications, setNotifications } = useContext(DataContext);

    const [showConfirmModal, setShowConfirmModal] = useState(false);


    const getNotificationIcon = (type) => {
        switch (type) {
            case 'received':
                return require('../assets/images/back-light.png');
            case 'sent':
                return require('../assets/images/back-light.png');
            case 'gift':
                return require('../assets/images/gift.png');
            case 'offer':
                return require('../assets/images/discount.png');
            default:
                return require('../assets/images/notification-icon.png');
        }
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'received':
                return '#00b80cff';
            case 'sent':
                return '#0094b9ff';
            case 'gift':
                return '#d30082ff';
            case 'offer':
                return primary.mid;
            default:
                return primary.mid;
        }
    };

    const handleClearNotifications = () => {
        setNotifications([]);
        setShowConfirmModal(false);
    }

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ flex: 1 }}>
                {/* Header */}
                <OtherHeader title='Notification' />

                {/* Notification Content */}
                <View style={styles.notificationContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: accent.darker }}>NOTIFICATIONS</Text>
                        <TouchableOpacity onPress={() => setShowConfirmModal(true)}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: primary.dark }}>Clear All</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Notification Items */}
                    <View style={{ flexDirection: 'column', gap: 10, marginHorizontal: 10, marginBottom: 50 }}>
                        {notifications.length > 0 ? notifications.map((item) => (
                            <View key={item.id} style={styles.notificationItem}>
                                <View style={{ borderRadius: 20, padding: 14, backgroundColor: getNotificationColor(item.type) }}>
                                    <Image source={getNotificationIcon(item.type)} style={{ width: 30, height: 30, transform: [{ rotate: item.type === 'sent' ? '90deg' : item.type === 'received' ? '-90deg' : '0deg' }] }} />
                                </View>
                                <View style={{ alignContent: 'center', width: '80%' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 14, color: '#555555' }}>{item.message}</Text>
                                    <Text style={{ fontSize: 12, color: '#999999' }}>{item.time}</Text>
                                </View>
                            </View>
                        )) : (
                            <Text style={{ fontSize: 14, color: accent.darker, textAlign: 'center', marginTop: 40 }}>No notifications available.</Text>
                        )}
                    </View>

                </View>

            </ScrollView >

            {showConfirmModal && <ConfirmModal title="Clear All Notifications" onConfirm={handleClearNotifications} onCancel={() => setShowConfirmModal(false)} />}

        </View >
    )
}

export default NotificationScreen;


const styles = StyleSheet.create({
    notificationContent: {
        padding: 20,
        backgroundColor: accent.DEFAULT,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: -30,
    },

    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0dac3a12',
        padding: 15,
        borderRadius: 10,
        gap: 15
    },

});
