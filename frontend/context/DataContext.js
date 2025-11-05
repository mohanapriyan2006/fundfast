import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "expo-router";
import { createWalletByUserId, deleteData, depositToWallet, fetchTransactionsByWalletIdPaginated, getWalletByUserId, loginUser, testHealth, transferToWallet, updateData, verifyPin } from "../service/API";
import AuthContext from "./AuthContext";

const DataContext = createContext();

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

const samplewallets = [
    {
        id: 1,
        walletName: 'Personal Wallet',
        balance: 250
    },
    {
        id: 2,
        walletName: 'Business Wallet',
        balance: 1500
    }
];


const sampleTransactionHistory = [
    {
        id: 1,
        timestamp: '2024-06-01',
        type: 'TRANSFER',
        amount: 100,
        fromWallet: {
            id: 1,
            walletName: 'Personal Wallet',
            owner: { name: 'Alice' }
        },
        toWallet: {
            id: 2,
            walletName: 'Wallet 2',
            owner: { name: 'Bob' }
        }
    },
    {
        id: 2,
        timestamp: '2024-06-01',
        type: 'TRANSFER',
        amount: 70,
        fromWallet: {
            id: 2,
            walletName: 'Wallet 2',
            owner: { name: 'Bob' }
        },
        toWallet: {
            id: 1,
            walletName: 'Personal Wallet',
            owner: { name: 'Alice' }
        }
    },
    {
        id: 3,
        timestamp: '2024-06-01',
        type: 'DEPOSIT',
        amount: 1000
        , fromWallet: {
            id: 1
            , walletName: 'Personal Wallet', owner: { name: 'Alice' }
        }, toWallet: null
    },
    {
        id: 4,
        timestamp: '2024-06-01',
        type: 'TRANSFER',
        amount: 80,
        fromWallet: {
            id: 1,
            walletName: 'Personal Wallet', owner: { name: 'Alice' }
        }, toWallet: { id: 2, walletName: 'Wallet 2', owner: { name: 'Bob' } }
    },
    {
        id: 5,
        timestamp: '2024-06-01',
        type: 'TRANSFER',
        amount: 700
        , fromWallet: {
            id: 2
            , walletName: 'Wallet 2', owner: { name: 'Bob' }
        }, toWallet: { id: 1, walletName: 'Personal Wallet', owner: { name: 'Alice' } }
    },
]

export const DataProvider = ({ children }) => {

    const [activeModal, setActiveModal] = useState("home");

    const pathname = usePathname().substring(6);

    // console.log("Current Pathname:", pathname);

    useEffect(() => {
        setActiveModal("home");
    }, [pathname]);

    const { userId, userDetails, deleteAccount, saveAuth } = useContext(AuthContext);

    const [confirmationScreen, setConfirmationScreen] = useState('Home');

    // const [isAPIConnected, setIsAPIConnected] = useState(true);

    // const fetchTestHealth = async () => {
    //     try {
    //         const res = await testHealth();
    //         setIsAPIConnected(true);
    //         return res;
    //     } catch (error) {
    //         setIsAPIConnected(false);
    //         console.log("Error fetching test health:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchTestHealth();
    // });



    // --------------------------------------------
    // Wallets data
    // --------------------------------------------

    const [myWallets, setMyWallets] = useState(samplewallets);

    // Fetch all wallets from API
    const fetchAllWallets = async (uID = userId) => {
        try {
            const res = await getWalletByUserId(uID);
            // console.log("Fetched wallets:", res);
            setMyWallets(res);
        } catch (error) {
            console.log("Error fetching wallets:", error);
        }
    };

    useEffect(() => {
        fetchAllWallets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    // Add new Wallet
    const [addWalletState, setAddWalletState] = useState({ name: '', error: '' });


    const handleAddWallet = async () => {
        try {
            await createWalletByUserId({ walletName: addWalletState.name, balance: 0 }, userId || 1);
            setAddWalletState({ name: '', error: '' });
            fetchAllWallets();
        } catch (error) {
            console.log("Error adding wallet:", error);
            setAddWalletState({ ...addWalletState, error: "Failed to add wallet. Please try again." });
        }
    };

    // Deposit to Wallet
    const [depositWalletState, setDepositWalletState] = useState({ id: 0, amount: '', error: '' });


    const handleDepositWallet = async () => {
        try {
            await depositToWallet(depositWalletState.amount, depositWalletState.id || 1);
            setDepositWalletState({ amount: '', error: '' });
            fetchAllWallets();
        } catch (error) {
            console.log("Error Depositing wallet:", error);
            setDepositWalletState({ ...depositWalletState, error: "Failed to deposit amount. Please try again." });
        }
    };

    // Transfer between Wallets
    const [transferState, setTransferState] = useState({ from: 0, to: 0, amount: '', error: '' });


    const handleTransferWallet = async () => {
        try {
            await transferToWallet(transferState.amount, transferState.from, transferState.to);
            setTransferState({ from: 0, to: 0, amount: '', error: '' });
            fetchAllWallets();
        } catch (error) {
            console.log("Error Transferring to wallet:", error);
            setTransferState({ ...transferState, error: "Failed to transfer amount. Please try again." });
        }
    };

    // --------------------------------------------
    // Transaction data
    // --------------------------------------------

    const [transactions, setTransactions] = useState(sampleTransactionHistory);

    const fetchAllTransactionsByWallet = async (walletId, pageNo = 0, sortBy = 'time', sortDir = 'desc', pageSize = 3) => {
        try {
            const res = await fetchTransactionsByWalletIdPaginated(walletId, pageNo, pageSize, sortBy, sortDir);
            setTransactions(res);
            // console.log("Fetched transactions:", res);
        } catch (error) {
            console.log("Error fetching transactions by wallet:", error);
        }
    };

    useEffect(() => {
        fetchAllTransactionsByWallet(myWallets[0]?.id || 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);


    // --------------------------------------------
    //  Profile Settings functions
    // --------------------------------------------

    const [passwordVerified, setPasswordVerified] = useState(false);

    const verifyPassword = async (password) => {
        try {
            // console.log("Verifying password for user:", userDetails?.username , " Password: ", password);
            await loginUser({ username: userDetails?.username, password: password });
            setPasswordVerified(true);
        } catch (error) {
            setPasswordVerified(false);
            console.log("Error verifying password:", error);
            throw error;
        }
    };

    const [editProfileState, setEditProfileState] = useState({
        name: userDetails?.name || '',
        username: userDetails?.username || '',
        email: userDetails?.email || '',
        error: ''
    });

    // Update User Profile
    const updateUserProfile = async () => {
        try {
            const { name, username, email } = editProfileState;
            const res = await updateData("user", userId, { name, username, email });
            saveAuth({ user: res });
            setEditProfileState({ ...editProfileState, error: '' });
            // console.log("User profile updated:", res);
        } catch (e) {
            setEditProfileState({ ...editProfileState, error: e || "Failed to update profile. Please try again." });
            console.log("Error updating user profile:", e);
            throw e;
        }
    }

    const [resertPassOrPinState, setResetPassOrPinState] = useState({
        current: '',
        new: '',
        confirm: '',
        error: ''
    })

    // Reset Password
    const resetPassword = async () => {
        try {
            await verifyPassword(resertPassOrPinState.current);
            const res = await updateData("user", userId, { password: resertPassOrPinState.new });
            console.log("Password updated:", res);
        } catch (e) {
            setResetPassOrPinState({ ...resertPassOrPinState, error: e || "Failed to update password. Please try again." });
            console.log("Error updating password:", e);
        }
    }

    // Reset PIN
    const resetPin = async () => {
        try {
            const isValid = await verifyPin({ username: userDetails?.username, pin: resertPassOrPinState.current });
            if (!isValid) {
                setResetPassOrPinState({ ...resertPassOrPinState, error: "Current PIN is incorrect." });
                return;
            }
            const res = await updateData("user", userId, { pin: resertPassOrPinState.new });
            console.log("PIN updated:", res);
        } catch (e) {
            setResetPassOrPinState({ ...resertPassOrPinState, error: e || "Failed to update PIN. Please try again." });
            console.log("Error updating PIN:", e);
        }
    }

    // --------------------------------------------
    // manage Wallet functions
    // --------------------------------------------

    // update wallet
    const [updateWalletState, setUpdateWalletState] = useState({
        name: '',
        error: ''
    });

    const updateWallet = async (walletId, name = updateWalletState.name) => {
        try {
            // console.log("walletId : ",walletId," name: ",name)
            await updateData("wallet", walletId, { walletName: name });
            await fetchAllWallets();
            // console.log("Wallet updated:", res);
        } catch (err) {
            setUpdateWalletState({ ...updateWalletState, error: err || "Failed to update wallet. Please try again." });
            // console.log("Error updating wallet:", err);
            throw err;
        }
    }

    // delete wallet
    const deleteWallet = async (walletId) => {
        try {
            await deleteData("wallet", walletId);
            await fetchAllWallets();
            // console.log("Wallet deleted:", res);
        } catch (err) {
            console.log("Error deleting wallet:", err);
            throw err;
        }
    }

    // Delete User Account
    const deleteUserAccount = async () => {
        try {
            await deleteAccount();
        } catch (err) {
            console.log("Error deleting user account:", err);
        }
    }


    return (
        <DataContext.Provider value={{
            pathname,
            activeModal,
            setActiveModal,
            confirmationScreen,
            setConfirmationScreen,
            paymentList,
            promoAndDiscounts,
            myWallets,
            fetchAllWallets,
            addWalletState,
            setAddWalletState,
            handleAddWallet,
            depositWalletState,
            setDepositWalletState,
            handleDepositWallet,
            transferState,
            setTransferState,
            handleTransferWallet,
            transactions,
            fetchAllTransactionsByWallet,
            passwordVerified,
            setPasswordVerified,
            verifyPassword,
            editProfileState,
            setEditProfileState,
            updateUserProfile,
            resertPassOrPinState,
            setResetPassOrPinState,
            resetPassword,
            resetPin,
            updateWalletState,
            setUpdateWalletState,
            updateWallet,
            deleteWallet,
            deleteUserAccount
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;