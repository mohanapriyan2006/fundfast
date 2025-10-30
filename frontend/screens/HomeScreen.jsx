import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { primary, accent } from '../theme/colors'
import HeaderModal from '../components/HeaderModal'
import { useContext } from 'react'
import DataContext from '../context/DataContext'
import HomeModal from '../components/HomeModal'
import MyWalletsModal from '../components/MyWalletsModal'
import DepositModal from '../components/DepositModal'
import TransferModal from '../components/TransferModel'


const HomeScreen = () => {

    const { pathname, activeModal } = useContext(DataContext);

    return (
        <SafeAreaView style={[styles.flex1, { backgroundColor: accent.DEFAULT }]}>
            <StatusBar barStyle="light-content" backgroundColor={primary.dark} />
            <ScrollView style={styles.flex1}>

                {/* Header */}
                {(pathname === '/home' || pathname === '') && <HeaderModal />}

                {/* Home Modal */}
                {activeModal === 'home' && <HomeModal />}

                {/* My Wallets Modal */}
                {activeModal === 'My wallets' && <MyWalletsModal />}

                {/* Deposit Modal */}
                {activeModal === 'Deposit' && <DepositModal />}

                {/* Transfer Modal */}
                {activeModal === 'Transfer' && <TransferModal />}

                <View style={{ height: 100 }}></View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    flex1: { flex: 1 },
});