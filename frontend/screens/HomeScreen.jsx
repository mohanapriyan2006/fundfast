import { ScrollView, StatusBar, View } from 'react-native'
import { primary, accent } from '../theme/colors'
import HeaderModal from '../components/HomeHeaderModal'
import { useContext } from 'react'
import DataContext from '../context/DataContext'
import HomeModal from '../components/HomeModal'
import MyWalletsModal from '../components/MyWalletsModal'
import DepositModal from '../components/DepositModal'
import TransferModal from '../components/TransferModel'
import HistoryModal from '../components/HistoryModal'
import HomeHeaderModal from '../components/HomeHeaderModal'


const HomeScreen = () => {

    const { pathname, activeModal } = useContext(DataContext);

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT }}>
            <ScrollView style={{ flex: 1 }}>

                {/* Header */}
                {(pathname === '/home' || pathname === '') && <HomeHeaderModal />}

                {/* Home Modal */}
                {activeModal === 'home' && <HomeModal />}

                {/* My Wallets Modal */}
                {activeModal === 'My wallets' && <MyWalletsModal />}

                {/* Deposit Modal */}
                {activeModal === 'Deposit' && <DepositModal />}

                {/* Transfer Modal */}
                {activeModal === 'Transfer' && <TransferModal />}

                {/* Transfer Modal */}
                {activeModal === 'History' && <HistoryModal />}

                <View style={{ height: 100 }}></View>

            </ScrollView>
        </View>
    )
}

export default HomeScreen;