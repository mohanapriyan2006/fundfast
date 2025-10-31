import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { primary } from '../../theme/colors';
import { Image } from 'expo-image';
import DataContext from '../../context/DataContext';

const HomeModal = () => {

    const { paymentList, promoAndDiscounts } = useContext(DataContext);

    return (
        <View>
            {/* payment list */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Payment List</Text>
                <View style={styles.paymentRow}>
                    {paymentList.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.paymentItem}>
                            <View style={styles.paymentIconWrap}>
                                <Image source={item.logo} style={styles.paymentIcon} />
                            </View>
                            <Text style={styles.paymentLabel}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* promo & discount */}
            <View style={styles.sectionPadding}>
                <Text style={styles.sectionTitle}>Promo & Discounts</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.promoScrollContent}>
                    {promoAndDiscounts.map((item) => (
                        <View style={styles.promoCard} key={item.id}>
                            <View style={styles.promoTextWrap}>
                                <Text style={styles.promoHeader}>{item.header}</Text>
                                <Text style={styles.promoName}>{item.name}</Text>
                                <Text style={styles.promoDescription}>{item.description}</Text>
                            </View>
                            <View style={styles.promoImageWrap}>
                                <Image source={item.logo} style={styles.promoImage} />
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default HomeModal;


const styles = StyleSheet.create({
    flex1: { flex: 1 },

    sectionContainer: {
        marginTop: 120,
        paddingHorizontal: 10,
    },

    sectionPadding: {
        marginTop: 16,
        paddingHorizontal: 16,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
    },

    paymentRow: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
    },

    paymentItem: {
        alignItems: 'center',
        marginBottom: 16,
    },

    paymentIconWrap: {
        padding: 16,
        marginBottom: 4,
        backgroundColor: 'rgba(76, 208, 128, 0.2)', // primary lighter at 20%
        borderRadius: 12,
    },

    paymentIcon: {
        height: 30,
        width: 30,
    },

    paymentLabel: {
        fontSize: 14,
    },

    promoScrollContent: {
        marginTop: 8,
        paddingHorizontal: 16,
        columnGap: 8,
    },

    promoCard: {
        width: 300,
        height: 160,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: primary.dark,
        borderRadius: 12,
        marginBottom: 16,
        // Shadow (iOS) + elevation (Android)
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 6,
    },

    promoTextWrap: {
        width: '60%',
        paddingHorizontal: 8,
    },

    promoHeader: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    promoName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginTop: 4,
    },

    promoDescription: {
        fontSize: 14,
        color: '#FFFFFF',
        marginTop: 4,
    },

    promoImageWrap: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    promoImage: {
        height: 60,
        width: '100%',
    },
});