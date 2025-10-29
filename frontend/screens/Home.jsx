import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RoundMenu from '../components/RoundMenu';


const Home = () => {

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
        <SafeAreaView className="flex-1 bg-accent">
            <StatusBar barStyle="light-content" backgroundColor="#005631" />
            <ScrollView>

                {/* Header */}
                <View style={{ height: 220, width: '100%', position: 'relative' }} className="bg-primary-mid p-4">

                    <View className="flex flex-row justify-around items-center">
                        <View className="flex gap-2">
                            <Text className="text-white italic text-lg">Hello !</Text>
                            <Text className="text-white text-2xl font-semibold capitalize">Tony stark,</Text>
                        </View>
                        <View className="flex items-center justify-center ">
                            <Image
                                source={require('../assets/images/wallet1.png')}
                                style={{ height: 120, width: 120 }}
                            />
                        </View>
                    </View>

                    {/* Round menu */}
                    {/* <View>
                        <Image
                            source={require('../assets/images/round-menu.png')}
                            style={{ height: 200, width: 200, position: 'absolute', top: 0, right: 50, left: 50, zIndex: 9999 , transform: [{rotate: '45deg'}] }}
                        />
                    </View> */}

                    {/* Coins Images */}
                    <View>
                        <Image source={require('../assets/images/coin1.png')}
                            style={{ height: 30, width: 30, position: 'absolute', top: 0, left: 0 }}
                        />
                        <Image source={require('../assets/images/coin2.png')}
                            style={{ height: 30, width: 30, position: 'absolute', bottom: -65, left: 20 }}
                        />
                        <Image source={require('../assets/images/coin1.png')}
                            style={{ height: 30, width: 30, position: 'absolute', top: 70, left: 0 }}
                        />
                        <Image source={require('../assets/images/coin2.png')}
                            style={{ height: 30, width: 30, position: 'absolute', bottom: -135, left: 20 }}
                        />
                        <Image source={require('../assets/images/coin2.png')}
                            style={{ height: 30, width: 30, position: 'absolute', top: 0, right: 0 }}
                        />
                        <Image source={require('../assets/images/coin1.png')}
                            style={{ height: 30, width: 30, position: 'absolute', bottom: -65, right: 20 }}
                        />
                        <Image source={require('../assets/images/coin2.png')}
                            style={{ height: 30, width: 30, position: 'absolute', top: 70, right: 0 }}
                        />
                        <Image source={require('../assets/images/coin1.png')}
                            style={{ height: 30, width: 30, position: 'absolute', bottom: -135, right: 20 }}
                        />
                    </View>

                    {/* wave image */}
                    <Image
                        source={require('../assets/images/wave.png')}
                        style={{ height: 160, width: '120%', position: 'absolute', top: 220, left: -40, zIndex: -1 }}
                    />

                    {/* Round Menu   */}
                    <RoundMenu />


                </View>


                {/* payment list */}
                <View style={{ marginTop: 120, paddingHorizontal: 10 }} className="px-4">
                    <Text className="text-lg font-semibold">Payment List</Text>
                    <View className="mt-2 flex flex-row justify-between mx-4">
                        {paymentList.map((item) => (
                            <TouchableOpacity key={item.id} className="flex items-center mb-4">
                                <View className="p-4 mb-1 bg-primary-lighter/20 rounded-lg">
                                    <Image source={item.logo}
                                        style={{ height: 30, width: 30 }} />
                                </View>
                                <Text className="text-sm">{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* promo & discount */}
                <View className="mt-4 px-4">
                    <Text className="text-lg font-semibold">Promo & Discounts</Text>
                    <ScrollView horizontal className="mt-2 flex flex-row mx-4">
                        {promoAndDiscounts.map((item) => (
                            <View style={{ width: 300, height: 150 }} key={item.id} className="flex flex-row items-center p-4 bg-primary-dark rounded-lg shadow-xl mb-4 mr-4">
                                <View className="w-2/3 px-2">
                                    <Text className="text-xl font-bold text-white">{item.header}</Text>
                                    <Text className="text-md font-semibold text-white mt-1">{item.name}</Text>
                                    <Text className="text-sm text-white mt-1">{item.description}</Text>
                                </View>
                                <View className="w-1/3 items-center justify-center">
                                    <Image source={item.logo} style={{ height: 100, width: 100 }} />
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View className="mt-10 items-center justify-center mb-10">
                    <Text className=" text-primary-dark">Thank you for using our app!</Text>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Home