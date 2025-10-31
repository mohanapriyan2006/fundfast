import { ScrollView, View } from 'react-native'
import { accent } from '../theme/colors'
import { useContext } from 'react'
import DataContext from '../context/DataContext'
import HomeModal from '../components/HomeComponents/HomeModal'
import MyWalletsModal from '../components/HomeComponents/MyWalletsModal'
import DepositModal from '../components/HomeComponents/DepositModal'
import TransferModal from '../components/HomeComponents/TransferModel'
import HistoryModal from '../components/HomeComponents/HistoryModal'
import HomeHeaderModal from '../components/HomeComponents/HomeHeaderModal'


const HomeScreen = () => {

    const { pathname, activeModal } = useContext(DataContext);

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT }}>
            <ScrollView style={{ flex: 1 }}>

                {/* Header */}
                {(pathname.includes('/home') || pathname === "/main" || pathname === '') && <HomeHeaderModal />}

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