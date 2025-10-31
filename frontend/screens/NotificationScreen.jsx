import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../theme/colors'
import OtherHeader from '../components/OtherHeader'

const NotificationScreen = () => {

    const notifications = [
        {
            id: 1,
            title: 'Payment Received',
            message: 'You have received a payment of $250 from John Doe.',
            time: '10/2/2024 14:30',
            type: 'received'
        },
        {
            id: 2,
            title: 'Daily Cashback',
            message: 'You have received a cashback of $5.',
            time: '8/2/2024 14:30',
            type: 'gift'
        },
        {
            id: 3,
            title: 'Payment Sended',
            message: 'Your payment of $100 to Alex Johnson has been sent.',
            time: '8/2/2024 12:00',
            type: 'sent'
        },
        {
            id: 4,
            title: 'Friday Offer',
            message: 'Get 25% off on all recharges every Friday.',
            time: '8/2/2024 14:30',
            type: 'offer',
        },
        {
            id: 5,
            title: 'Payment Sended',
            message: 'Your payment of $20 to Alex Johnson has been sent.',
            time: '8/2/2024 8:10',
            type: 'sent'
        },
    ];


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

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ flex: 1 }}>
                {/* Header */}
                <OtherHeader title='Notification' />

                {/* Notification Content */}
                <View style={styles.notificationContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: accent.darker }}>NOTIFICATIONS</Text>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: primary.dark }}>Clear All</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Notification Items */}
                    <View style={{ flexDirection: 'column', gap: 10, marginHorizontal: 10, marginBottom: 50 }}>
                        {notifications.map((item) => (
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
                        ))}
                    </View>

                </View>

            </ScrollView >
        </View >
    )
}

export default NotificationScreen;


const styles = StyleSheet.create({
    notificationContent: {
        padding: 20,
        backgroundColor: accent.DEFAULT,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
