import { ScrollView, View, Animated } from 'react-native'
import { accent } from '../theme/colors'
import { useContext, useState, useEffect, useRef } from 'react'
import DataContext from '../context/DataContext'
import HomeModal from '../components/HomeComponents/HomeModal'
import MyWalletsModal from '../components/HomeComponents/MyWalletsModal'
import DepositModal from '../components/HomeComponents/DepositModal'
import TransferModal from '../components/HomeComponents/TransferModel'
import HistoryModal from '../components/HomeComponents/HistoryModal'
import HomeHeaderModal from '../components/HomeComponents/HomeHeaderModal'
import ConfirmModal from '../components/ConfirmModal'
import { useNavigation } from '@react-navigation/native'


const HomeScreen = () => {

    const { pathname, activeModal } = useContext(DataContext);

    const navigation = useNavigation();

    const [showConfirmModal, setShowConfirmModal] = useState(
        {
            wallet: false,
            deposit: false,
            transfer: false,
        }
    );


    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT }}>
            <ScrollView style={{ flex: 1 }}>

                {/* Header */}
                {(pathname.includes('/home') || pathname === "/main" || pathname === '') && <HomeHeaderModal />}

                {/* Home Modal */}
                {activeModal === 'home' && <HomeModal />}

                {/* My Wallets Modal */}
                {activeModal === 'My wallets' && <MyWalletsModal setShowConfirmModal={setShowConfirmModal} />}

                {/* Deposit Modal */}
                {activeModal === 'Deposit' && <DepositModal setShowConfirmModal={setShowConfirmModal} />}

                {/* Transfer Modal */}
                {activeModal === 'Transfer' && <TransferModal setShowConfirmModal={setShowConfirmModal} />}

                {/* Transfer Modal */}
                {activeModal === 'History' && <HistoryModal />}

                <View style={{ height: 100 }}></View>

            </ScrollView>

            {showConfirmModal.wallet && <ConfirmModal title='Add Wallet' onConfirm={() => { setShowConfirmModal(p => ({ ...p, wallet: false })); }} onCancel={() => setShowConfirmModal(p => ({ ...p, wallet: false }))} />}

            {showConfirmModal.deposit && <ConfirmModal title='Deposit' onConfirm={() => { setShowConfirmModal(p => ({ ...p, deposit: false })); navigation.navigate("pin"); }} onCancel={() => setShowConfirmModal(p => ({ ...p, deposit: false }))} />}

            {showConfirmModal.transfer && <ConfirmModal title='Transfer' onConfirm={() => { setShowConfirmModal(p => ({ ...p, transfer: false })); navigation.navigate("pin"); }} onCancel={() => setShowConfirmModal(p => ({ ...p, transfer: false }))} />}

        </View>
    )
}

export default HomeScreen;