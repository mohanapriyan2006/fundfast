import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "expo-router";
import { createWalletByUserId, depositToWallet, fetchTransactionsByWalletIdPaginated, getWalletByUserId, testHealth, transferToWallet } from "../service/API";
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

    const { userId } = useContext(AuthContext);


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
            await createWalletByUserId({ name: addWalletState.name }, userId || 1);
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

    // Deposit to Wallet
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

    const fetchAllTransactionsByWallet = async (walletId, pageNo = 0, sortBy = 'time', sortDir = 'desc' , pageSize = 3) => {
        try {
            const res = await fetchTransactionsByWalletIdPaginated(walletId, pageNo, pageSize, sortBy, sortDir);
            setTransactions(res);
            console.log("Fetched transactions:", res);
        } catch (error) {
            console.log("Error fetching transactions by wallet:", error);
        }
    };

    useEffect(() => {
        fetchAllTransactionsByWallet(myWallets[0]?.id || 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const [isAPIConnected, setIsAPIConnected] = useState(false);

    const fetchTestHealth = async () => {
        try {
            const res = await testHealth();
            setIsAPIConnected(true);
            return res;
        } catch (error) {
            setIsAPIConnected(false);
            console.log("Error fetching test health:", error);
        }
    };

    useEffect(() => {
        fetchTestHealth();
    });

    return (
        <DataContext.Provider value={{
            isAPIConnected,
            pathname,
            activeModal,
            setActiveModal,
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
            fetchAllTransactionsByWallet
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;