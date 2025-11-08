import React, { useContext, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import { accent, primary } from '../theme/colors'
import OtherHeader from '../components/OtherHeader'
import { BarChart } from 'react-native-chart-kit'
import { Picker } from '@react-native-picker/picker'
import DataContext from '../context/DataContext'

const StatsScreen = () => {

    const { myWallets } = useContext(DataContext);

    const [period, setPeriod] = useState(myWallets.length > 0 ? myWallets[0].id : '');

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Jun'],
        datasets: [{
            data: [1200, 800, 3200, 1500, 1800, 1200, 4500, 2100],
            colors: [
                () => primary.DEFAULT,  // Jan Income
                () => primary.dark,      // Jan Expense
                () => primary.DEFAULT,  // Feb Income
                () => primary.dark,      // Feb Expense
                () => primary.DEFAULT,  // Mar Income
                () => primary.dark,      // Mar Expense
                () => primary.DEFAULT,  // Jun Income
                () => primary.dark,      // Jun Expense
            ]
        }],
    };

    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ flex: 1 }}>
                {/* Header */}
                <OtherHeader title='Statistics' />

                {/* Statistics Content */}
                <View style={styles.statContent}>
                    {/* Total Balance */}
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: accent.darker }}>Total Balance</Text>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>$51,430.65</Text>
                    </View>

                    {/* Overview stats */}
                    <View style={{ marginVertical: 20 }}>
                        <View style={styles.overviewHeader}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Overview</Text>
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={period}
                                    onValueChange={(itemValue) => setPeriod(itemValue)}
                                    mode="dropdown"
                                    dropdownIconColor="#fff"
                                    style={styles.picker}
                                    itemStyle={styles.pickerItem}
                                >
                                    {myWallets.length > 0 ? myWallets.map((wallet) => (
                                        <Picker.Item
                                            key={wallet.id}
                                            label={wallet.walletName}
                                            value={wallet.id}
                                        />
                                    )) : (
                                        <Picker.Item
                                            label="No Wallets Available"
                                            value=""
                                        />
                                    )}
                                </Picker>
                            </View>
                        </View>

                        {/* Bar Chart */}
                        <BarChart
                            data={chartData}
                            width={screenWidth - 60}
                            height={200}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            chartConfig={{
                                backgroundColor: accent.DEFAULT,
                                backgroundGradientFrom: accent.DEFAULT,
                                backgroundGradientTo: accent.DEFAULT,
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0.1})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0.5})`,
                                propsForBackgroundLines: {
                                    strokeDasharray: '',
                                    stroke: '#e0e0e0',
                                    strokeWidth: 1,
                                },
                                barPercentage: 0.5,
                            }}
                            style={{ marginVertical: 8, borderRadius: 16 }}
                            fromZero
                            withInnerLines={true}
                            showBarTops={false}
                            withCustomBarColorFromData={true}
                            flatColor={true}
                        />

                        {/* Legend */}
                        <View style={styles.legend}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: primary.DEFAULT }]} />
                                <Text style={styles.legendText}>Income</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: primary.dark }]} />
                                <Text style={styles.legendText}>Expense</Text>
                            </View>
                        </View>
                    </View>

                    {/* Income & Expenses */}
                    <View style={styles.statBoxContainer}>
                        <View style={[styles.statBox, { backgroundColor: primary.DEFAULT }]}>
                            <Text style={{ fontSize: 16, color: 'white', marginBottom: 4 }}>Income</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>$14,560.30</Text>
                            <Image
                                source={require("../assets/images/back-light.png")}
                                style={[styles.statBoxImage, { transform: [{ rotate: '-90deg' }] }]}
                            />
                        </View>
                        <View style={[styles.statBox, { backgroundColor: primary.dark }]}>
                            <Text style={{ fontSize: 16, color: 'white', marginBottom: 4 }}>Expenses</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>$5,240.42</Text>
                            <Image
                                source={require("../assets/images/back-light.png")}
                                style={[styles.statBoxImage, { transform: [{ rotate: '90deg' }] }]}
                            />
                        </View>
                    </View>
                </View>

            </ScrollView >
        </View >
    )
}

export default StatsScreen;


const styles = StyleSheet.create({
    statContent: {
        padding: 20,
        backgroundColor: accent.DEFAULT,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: -30,
    },

    // overviewContainer: {
    //     marginTop: 20,
    // },

    overviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    // periodBtn: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     gap: 8,
    //     paddingHorizontal: 16,
    //     paddingVertical: 8,
    //     borderRadius: 20,
    //     borderWidth: 1,
    //     borderColor: '#ddd',
    //     backgroundColor: 'white',
    // },


    pickerWrapper: {
        height: 30,
        width: 140,
        backgroundColor: primary.mid,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 2,
    },

    picker: {
        color: 'white',
        backgroundColor: 'transparent',
    },

    pickerItem: {
        color: 'white',
        fontSize: 16,
    },

    // chart: {
    //     marginVertical: 8,
    //     borderRadius: 16,
    // },

    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
        marginTop: 10,
    },

    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 3,
    },

    legendText: {
        fontSize: 14,
        color: accent.darker,
    },

    statBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        gap: 20,
    },

    statBox: {
        width: 150,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },

    statBoxImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        position: 'absolute',
        top: 10,
        right: 10
    },

});