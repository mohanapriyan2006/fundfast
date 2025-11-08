import { act, createContext, use, useContext, useEffect, useState } from "react";
import { usePathname } from "expo-router";
import { createWalletByUserId, deleteData, depositToWallet, fetchTransactionsByWalletIdPaginated, getWalletByUserId, getWalletByUsername, loginUser, transferToWallet, updateData, verifyPin } from "../service/API.local";
import AuthContext from "./AuthContext";
import { Platform } from "react-native";
import * as Notifications from 'expo-notifications';
import { getItem, setItem } from "./LocalStorage";
import { primary } from "../theme/colors";

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

const sampleNotifications = [
    {
        id: 1,
        title: 'Payment Received',
        message: 'You have received a payment of $250 from John Doe.',
        time: '10/2/2024 14:30',
        type: 'received'
    },
    {
        id: 2,
        title: 'Daily Cashback',
        message: 'You have received a cashback of $5.',
        time: '8/2/2024 14:30',
        type: 'gift'
    },
    {
        id: 3,
        title: 'Payment Sended',
        message: 'Your payment of $100 to Alex Johnson has been sent.',
        time: '8/2/2024 12:00',
        type: 'sent'
    },
    {
        id: 4,
        title: 'Friday Offer',
        message: 'Get 25% off on all recharges every Friday.',
        time: '8/2/2024 14:30',
        type: 'offer',
    },
    {
        id: 5,
        title: 'Payment Sended',
        message: 'Your payment of $20 to Alex Johnson has been sent.',
        time: '8/2/2024 8:10',
        type: 'sent'
    },
];

const randomTemplates = [
    {
        type: 'offer',
        title: 'Limited Time Offer',
        message: () => `Get ${(Math.floor(Math.random() * 30) + 10)}% off on bill payments today.`,
    },
    {
        type: 'gift',
        title: 'Daily Cashback',
        message: () => `You received a cashback of $${(Math.random() * 10 + 1).toFixed(2)}.`,
    },
    {
        type: 'offer',
        title: 'Weekend Special',
        message: () => `You have a chance to win $${(Math.random() * 50 + 10).toFixed(2)} on weekend transactions.`,
    },
    {
        type: 'offer',
        title: 'Flash Recharge Deal',
        message: () => `Recharge now and save $${(Math.random() * 5 + 1).toFixed(2)}.`,
    },
    {
        type: 'gift',
        title: 'Surprise Cashback',
        message: () => `You received a surprise cashback of $${(Math.random() * 10 + 1).toFixed(2)}.`,
    },
];



export const DataProvider = ({ children }) => {

    const { userId, userDetails, saveAuth } = useContext(AuthContext);

    const [activeModal, setActiveModal] = useState("home");

    const pathname = usePathname().substring(6);

    // console.log("Current Pathname:", pathname);

    useEffect(() => {
        setActiveModal("home");
    }, [pathname]);


    const [confirmationScreen, setConfirmationScreen] = useState('Home');


    // -----------------------------------------------------
    // Notifications data
    // -----------------------------------------------------

    const [notifications, setNotifications] = useState([]);
    const [notifReady, setNotifReady] = useState(false);

    // Notification setup
    useEffect(() => {
        (async () => {
            try {
                if (Platform.OS === 'android') {
                    await Notifications.setNotificationChannelAsync('default', {
                        name: 'Default',
                        importance: Notifications.AndroidImportance.MAX,
                        vibrationPattern: [0, 250, 250, 250],
                        lightColor: '#2ecc71',
                    });
                }
                let perm = await Notifications.getPermissionsAsync();
                if (!perm.granted) perm = await Notifications.requestPermissionsAsync();
                setNotifReady(!!perm.granted);
            } catch (e) {
                console.log('Notification setup error:', e);
            }
        })();
    }, []);

    // Function to send local push notification
    const sendLocalPush = async (n) => {
        if (!notifReady) return;
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: n.title,
                    body: n.message,
                    data: { type: n.type },
                },
                trigger: null, // show now
            });
        } catch (e) {
            console.log('Local push error:', e);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const storedNotifications = await getItem('notifications');
                if (storedNotifications) {
                    setNotifications(storedNotifications);
                }
            } catch (e) {
                console.log('Error fetching notifications:', e);
            }
        })();
    }, []);

    const addNotification = async (notification) => {
        const newNotif = {
            id: Date.now(),
            time: new Date().toLocaleString(),
            ...notification
        };
        setNotifications((prevNotifications) => [newNotif, ...prevNotifications.slice(0, 20)]);
        sendLocalPush(newNotif);
        await setItem('notifications', [newNotif, ...notifications.slice(0, 20)]);
    };

    const pushRandomNotification = () => {
        const tem = randomTemplates[Math.floor(Math.random() * randomTemplates.length)];
        addNotification({
            title: tem.title,
            message: tem.message(),
            type: tem.type,
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            pushRandomNotification();
        }, 5 * 60 * 1000); // every 5 minutes
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            addNotification({
                title: 'Deposit Successful',
                message: `You deposited $${depositWalletState.amount} to wallet.`,
                type: 'received',
            });
            setDepositWalletState({ amount: '', error: '' });
            fetchAllWallets();
        } catch (error) {
            // console.log("Error Depositing wallet:", error);
            setDepositWalletState({ ...depositWalletState, error: error.toString() || "Failed to deposit amount. Please try again." });
            throw error;
        }
    };

    // Transfer between Wallets
    const [transferState, setTransferState] = useState({ from: 0, to: 0, amount: '', error: '' });


    const handleTransferWallet = async () => {
        try {
            console.log("Transferring amount:", transferState.amount, " from wallet ID:", transferState.from, " to wallet ID:", transferState.to);
            const res = await transferToWallet(transferState.amount, transferState.from, transferState.to);
            addNotification({
                title: 'Payment Sent',
                message: `You sent $${transferState.amount} from wallet ${res?.fromWallet?.walletName || transferState.from} to ${res?.toWallet?.walletName || transferState.to}.`,
                type: 'sent',
            });
            setTransferState({ from: 0, to: 0, amount: '', error: '' });
            fetchAllWallets();
        } catch (error) {
            // console.log("Error Transferring to wallet:", error);
            setTransferState({ ...transferState, error: "Failed to transfer amount. Please try again." });
            throw error;
        }
    };

    // Fetch wallet by username
    const fetchWalletByUsername = async (username) => {
        try {
            const res = await getWalletByUsername(username);
            return res;
        } catch (error) {
            throw error;
        }
    };

    // --------------------------------------------
    // Transaction data
    // --------------------------------------------

    const [transactions, setTransactions] = useState(sampleTransactionHistory);

    const fetchAllTransactionsByWallet = async (walletId, pageNo = 0, sortBy = 'time', sortDir = 'DESC', pageSize = 3) => {
        try {
            const res = await fetchTransactionsByWalletIdPaginated(walletId, pageNo, pageSize, sortBy, sortDir);
            setTransactions(res);
            // console.log("Fetched transactions:", res);
        } catch (error) {
            console.log("Error fetching transactions by wallet:", error);
        }
    };

    useEffect(() => {
        fetchAllTransactionsByWallet(myWallets[0]?.id || 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);


    // --------------------------------------------
    //  Profile Settings functions
    // --------------------------------------------


    const verifyPassword = async (password) => {
        try {
            // console.log("Verifying password for user:", userDetails?.username , " Password: ", password);
            await loginUser({ username: userDetails?.username, password: password });
        } catch (error) {
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
            setEditProfileState({ ...editProfileState, error: e.toString() || "Failed to update profile. Please try again." });
            console.log("Error updating user profile:", e);
            throw e;
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
            setUpdateWalletState({ ...updateWalletState, error: err.toString() || "Failed to update wallet. Please try again." });
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


    // -----------------------------------------------------
    // Profile Settings - Reset Password / PIN
    // -----------------------------------------------------
    const [resetPassOrPinState, setResetPassOrPinState] = useState({
        current: '',
        new: '',
        confirm: '',
        error: ''
    })

    // Reset Password
    const resetPassword = async () => {
        try {
            await verifyPassword(resetPassOrPinState.current);
            await updateData("user", userId, { password: resetPassOrPinState.new });
            setResetPassOrPinState({ current: '', new: '', confirm: '', error: '' });
            // console.log("Password updated:", res);
        } catch (e) {
            setResetPassOrPinState({ ...resetPassOrPinState, error: e.toString() || "Failed to update password. Please try again." });
            throw e;
        }
    }

    // Reset PIN
    const resetPin = async () => {
        try {
            const isValid = await verifyPin({ username: userDetails?.username, pin: resetPassOrPinState.current });
            if (!isValid.valid) {
                setResetPassOrPinState({ ...resetPassOrPinState, error: "Current PIN is incorrect." });
                throw new Error("Current PIN is incorrect.");
            }
            await updateData("user", userId, { pin: resetPassOrPinState.new });
            setResetPassOrPinState({ current: '', new: '', confirm: '', error: '' });
            // console.log("PIN updated:", res);
        } catch (e) {
            setResetPassOrPinState({ ...resetPassOrPinState, error: e.toString() || "Failed to update PIN. Please try again." });
            throw e;
        }
    }

    // -----------------------------------------------------
    // Stats Screen functions
    // -----------------------------------------------------

    const buildWalletMonthlyStats = (transactions, walletId) => {
      const monthMap = {};
      const monthOrder = {};
      transactions.forEach(tx => {
        if (!tx.timestamp) return;
        const d = new Date(tx.timestamp);
        const label = d.toLocaleString('default', { month: 'short' });
        monthOrder[label] = d.getMonth(); // for sorting
        if (!monthMap[label]) monthMap[label] = { income: 0, expense: 0 };
        const toId = tx.toWallet?.id;
        const fromId = tx.fromWallet?.id;
        switch (tx.type) {
          case 'DEPOSIT':
            if (toId === walletId) monthMap[label].income += tx.amount;
            break;
          case 'TRANSFER':
            if (fromId === walletId) monthMap[label].expense += tx.amount;
            if (toId === walletId) monthMap[label].income += tx.amount;
            break;
          case 'WITHDRAWAL':
            if (fromId === walletId) monthMap[label].expense += tx.amount;
            break;
          default:
            break;
        }
      });
      const labels = Object.keys(monthMap)
        .sort((a, b) => monthOrder[a] - monthOrder[b]);
      const data = [];
      const colors = [];
      labels.forEach(l => {
        data.push(monthMap[l].income);
        colors.push(() => primary.DEFAULT);
        data.push(monthMap[l].expense);
        colors.push(() => primary.dark);
      });
      return {
        labels,
        datasets: [{ data, colors }],
        totals: labels.reduce((acc, l) => {
          acc.income += monthMap[l].income;
          acc.expense += monthMap[l].expense;
          return acc;
        }, { income: 0, expense: 0 })
      };
    };
    // ...existing export/provider...


    return (
        <DataContext.Provider value={{
            pathname,
            activeModal,
            setActiveModal,
            confirmationScreen,
            setConfirmationScreen,
            paymentList,
            promoAndDiscounts,
            notifications,
            setNotifications,
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
            fetchWalletByUsername,
            handleTransferWallet,
            transactions,
            fetchAllTransactionsByWallet,
            verifyPassword,
            editProfileState,
            setEditProfileState,
            updateUserProfile,
            resetPassOrPinState,
            setResetPassOrPinState,
            resetPassword,
            resetPin,
            updateWalletState,
            setUpdateWalletState,
            updateWallet,
            deleteWallet,
            buildWalletMonthlyStats,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;