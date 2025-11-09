import React, { useContext, useEffect, useState, useCallback } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import { accent, primary } from '../theme/colors'
import OtherHeader from '../components/OtherHeader'
import { BarChart } from 'react-native-chart-kit'
import { Picker } from '@react-native-picker/picker'
import { useFocusEffect } from '@react-navigation/native'
import DataContext from '../context/DataContext'

const StatsScreen = () => {

    const { myWallets, transactions, txVersion, fetchAllTransactionsByWallet, buildWalletMonthlyStats } = useContext(DataContext); // ensure transactions in context
    const [walletId, setWalletId] = useState(myWallets[0]?.id || null);
    const [stats, setStats] = useState({
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
        totals: { income: 0, expense: 0 }
    });
    const totalBalance = myWallets.reduce((sum, w) => sum + (w.balance || 0), 0);

    useEffect(() => {
        if (myWallets.length > 0 && !walletId) {
            setWalletId(myWallets[0].id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myWallets]);

    // recompute stats whenever transactions or wallet changes
    useEffect(() => {
        setStats(() => walletId ? buildWalletMonthlyStats(transactions || [], walletId) : {
            labels: ['Jan', 'Feb', 'Mar', 'Jun'],
            datasets: [{
                data: [1200, 800, 3200, 1500, 1800, 1200, 4500, 2100],
                colors: [
                    () => primary.DEFAULT,
                    () => primary.dark,
                    () => primary.DEFAULT,
                    () => primary.dark,
                    () => primary.DEFAULT,
                    () => primary.dark,
                    () => primary.DEFAULT,
                    () => primary.dark,
                ]
            }],
            totals: { income: 0, expense: 0 }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletId, transactions, txVersion]);

    // refresh transactions when wallet changes
    useEffect(() => {
        if (walletId) fetchAllTransactionsByWallet(walletId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletId]);

    // refresh when screen gains focus
    useFocusEffect(
        useCallback(() => {
            if (walletId) fetchAllTransactionsByWallet(walletId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [walletId])
    );

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ flex: 1 }}>
                <OtherHeader title='Statistics' />
                <View style={styles.statContent}>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: accent.darker }}>Total Balance</Text>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>${totalBalance.toFixed(2)}</Text>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                        <View style={styles.overviewHeader}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Overview</Text>
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={walletId}
                                    onValueChange={(v) => setWalletId(v)}
                                    mode="dropdown"
                                    dropdownIconColor="#fff"
                                    style={styles.picker}
                                    itemStyle={styles.pickerItem}
                                >
                                    {myWallets.length
                                        ? myWallets.map(w => <Picker.Item key={w.id} label={w.walletName} value={w.id} />)
                                        : <Picker.Item label="No Wallets" value="" />}
                                </Picker>
                            </View>
                        </View>

                        <BarChart
                            data={stats}
                            width={Dimensions.get('window').width - 60}
                            height={200}
                            yAxisLabel="$"
                            chartConfig={{
                                backgroundColor: accent.DEFAULT,
                                backgroundGradientFrom: accent.DEFAULT,
                                backgroundGradientTo: accent.DEFAULT,
                                decimalPlaces: 0,
                                color: (o = 1) => `rgba(0,0,0,${o * 0.2})`,
                                labelColor: (o = 1) => `rgba(0,0,0,${o * 0.6})`,
                                propsForBackgroundLines: { stroke: '#e0e0e0', strokeDasharray: '', strokeWidth: 1 },
                                barPercentage: 0.5,
                            }}
                            style={{ marginVertical: 8, borderRadius: 16 }}
                            fromZero
                            withInnerLines
                            showBarTops={false}
                            withCustomBarColorFromData
                            flatColor
                        />

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

                    <View style={styles.statBoxContainer}>
                        <View style={[styles.statBox, { backgroundColor: primary.DEFAULT }]}>
                            <Text style={{ fontSize: 16, color: 'white', marginBottom: 4 }}>Income</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>${stats.totals.income.toFixed(2)}</Text>
                            <Image source={require("../assets/images/back-light.png")} style={[styles.statBoxImage, { transform: [{ rotate: '-90deg' }] }]} />
                        </View>
                        <View style={[styles.statBox, { backgroundColor: primary.dark }]}>
                            <Text style={{ fontSize: 16, color: 'white', marginBottom: 4 }}>Expenses</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>${stats.totals.expense.toFixed(2)}</Text>
                            <Image source={require("../assets/images/back-light.png")} style={[styles.statBoxImage, { transform: [{ rotate: '90deg' }] }]} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
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

    overviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

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