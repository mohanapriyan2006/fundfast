import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { primary, accent } from '../theme/colors'
import RoundMenu from '../components/RoundMenu'
import RoundMenuHeader from '../components/RoundMenuHeader'


const HomeScreen = () => {

    const paymentList = [
        {
            id: 1,
            name: 'Electricity',
            logo: require('../assets/images/electricity.png'),
        },
        {
            id: 2,
            name: 'Recharge',
            logo: require('../assets/images/recharge.png'),
        },
        {
            id: 3,
            name: 'Vouchers',
            logo: require('../assets/images/voucher.png'),
        },
        {
            id: 4,
            name: 'DTH',
            logo: require('../assets/images/dth.png'),
        }
    ];

    const promoAndDiscounts = [
        {
            id: 1,
            header: "25% OFF",
            name: 'Every Friday deal',
            description: "Get 25% off on all recharges every Friday.",
            logo: require('../assets/images/wallet2.png'),
        },
        {
            id: 2,
            header: "40% OFF",
            name: 'Special Credit Card Offer',
            description: "Get 40% off on every payment via credit card.",
            logo: require('../assets/images/creditcard.png'),
        },
        {
            id: 3,
            header: "Upto $100",
            name: 'Refer a Friend & Earn',
            description: "Get $100 for every friend you refer.",
            logo: require('../assets/images/giftbox.png'),
        }
    ];

    return (
        <SafeAreaView style={[styles.flex1, { backgroundColor: accent.DEFAULT }]}>
            <StatusBar barStyle="light-content" backgroundColor={primary.dark} />
            <ScrollView>

                {/* Header */}
                <View style={[styles.headerContainer]}>

                    <View style={styles.headerRow}>
                        <View style={styles.headerTextGroup}>
                            <Text style={styles.helloText}>hello !</Text>
                            <Text style={styles.nameText}>Tony stark,</Text>
                        </View>
                        <View style={styles.walletImageWrap}>
                            <Image
                                source={require('../assets/images/wallet1.png')}
                                style={styles.walletImage}
                            />
                        </View>
                    </View>

                    {/* Round menu */}
                    <RoundMenuHeader />
                    <RoundMenu />

                    {/* Coins Images */}
                    <View>
                        <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { top: 0, left: 0 }]} />
                        <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { bottom: -65, left: 20 }]} />
                        <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { top: 70, left: 0 }]} />
                        <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { bottom: -135, left: 20 }]} />
                        <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { top: 0, right: 0 }]} />
                        <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: -65, right: 20 }]} />
                        <Image source={require('../assets/images/coin2.png')} style={[styles.coin, { top: 70, right: 0 }]} />
                        <Image source={require('../assets/images/coin1.png')} style={[styles.coin, { bottom: -135, right: 20 }]} />
                    </View>

                    {/* wave image */}
                    <Image
                        source={require('../assets/images/wave.png')}
                        style={styles.wave}
                    />

                </View>

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
                <View style={[styles.sectionPadding, { marginBottom: 100 }]}>
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

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    flex1: { flex: 1 },

    headerContainer: {
        height: 220,
        width: '100%',
        position: 'relative',
        backgroundColor: primary.mid,
        padding: 16,
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    headerTextGroup: {
        // replace gap-2
        rowGap: 8,
    },

    helloText: {
        fontStyle: 'italic',
        color: '#FFFFFF',
        fontSize: 18,
    },

    nameText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '600',
        textTransform: 'capitalize',
    },

    walletImageWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    walletImage: {
        height: 120,
        width: 120,
    },

    coin: {
        height: 30,
        width: 30,
        position: 'absolute',
    },

    wave: {
        height: 160,
        width: '120%',
        position: 'absolute',
        top: 220,
        left: -40,
        zIndex: -1,
    },

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