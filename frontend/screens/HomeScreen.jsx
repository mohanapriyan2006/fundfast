import { ScrollView, View } from 'react-native'
import { accent } from '../theme/colors'
import { useContext, useEffect, useState } from 'react'
import DataContext from '../context/DataContext'
import HomeModal from '../components/HomeComponents/HomeModal'
import MyWalletsModal from '../components/HomeComponents/MyWalletsModal'
import DepositModal from '../components/HomeComponents/DepositModal'
import TransferModal from '../components/HomeComponents/TransferModel'
import HistoryModal from '../components/HomeComponents/HistoryModal'
import HomeHeaderModal from '../components/HomeComponents/HomeHeaderModal'
import ConfirmModal from '../components/ConfirmModal'
import { useNavigation } from '@react-navigation/native'
import ErrorModal from '../components/ErrorModal'


const HomeScreen = () => {

    const { pathname, activeModal, handleAddWallet, depositWalletState, transferWalletState } = useContext(DataContext);

    const navigation = useNavigation();

    const screenName = navigation.getState().routes[navigation.getState().index].params?.screenName || 'Home';

    const [showConfirmModal, setShowConfirmModal] = useState(
        {
            wallet: false,
            deposit: false,
            transfer: false,
            info: false,
        }
    );

    const [infoTitle, setInfoTitle] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [isInfoError, setIsInfoError] = useState(false);

    useEffect(() => {
        if (screenName === "Home") return;
        if (screenName === 'DepositConfirmation' && depositWalletState.error) {
            setInfoTitle('Deposit Failed');
            setInfoMessage(depositWalletState.error || 'There was an error processing your deposit. Please try again.');
            setIsInfoError(true);
        } else if (screenName === 'TransferConfirmation' && transferWalletState.error) {
            setInfoTitle('Transfer Failed');
            setInfoMessage(transferWalletState.error || 'There was an error processing your transfer. Please try again.');
            setIsInfoError(true);
        }
        setShowConfirmModal(p => ({ ...p, info: true }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (screenName === "Home") return;
        if (screenName === 'DepositConfirmation' && !depositWalletState.error) {
            setInfoTitle('Deposit Successful');
            setInfoMessage('Your deposit was successful.');
            setIsInfoError(false);
        } else if (screenName === 'TransferConfirmation' && !transferWalletState.error) {
            setInfoTitle('Transfer Successful');
            setInfoMessage('Your transfer was successful.');
            setIsInfoError(false);
        }
        setShowConfirmModal(p => ({ ...p, info: true }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const handleAddWalletSubmit = () => {
        handleAddWallet();
        setShowConfirmModal(p => ({ ...p, wallet: false }));
    };


    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT }}>
            <ScrollView style={{ flex: 1 }}>

                {/* Header */}
                {(pathname.includes('/Home') || pathname === "/main" || pathname === '') && <HomeHeaderModal />}

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

            {showConfirmModal.wallet && <ConfirmModal title='Add Wallet' onConfirm={handleAddWalletSubmit} onCancel={() => setShowConfirmModal(p => ({ ...p, wallet: false }))} />}

            {showConfirmModal.deposit && <ConfirmModal title='Deposit' onConfirm={() => { setShowConfirmModal(p => ({ ...p, deposit: false })); navigation.navigate("pin", { type: "deposit" }); }} onCancel={() => setShowConfirmModal(p => ({ ...p, deposit: false }))} />}

            {showConfirmModal.transfer && <ConfirmModal title='Transfer' onConfirm={() => { setShowConfirmModal(p => ({ ...p, transfer: false })); navigation.navigate("pin", { type: "transfer" }); }} onCancel={() => setShowConfirmModal(p => ({ ...p, transfer: false }))} />}


            {/* Error Modal */}
            {showConfirmModal.info && <ErrorModal type={isInfoError ? "error" : "info"} title={infoTitle} msg={infoMessage} onConfirm={() => { setShowConfirmModal(p => ({ ...p, info: false })); setInfoMessage(''); }} />}

        </View>
    )
}

export default HomeScreen;