import { createContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter ,usePathname } from "expo-router";

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

const wallets = [
    {
        id: 1,
        name: 'Personal Wallet',
        balance: 250
    },
    {
        id: 2,
        name: 'Business Wallet',
        balance: 1500
    }
];

export const DataProvider = ({ children }) => {

    const [activeModal, setActiveModal] = useState("home");

    const pathname = usePathname().substring(6);
    const { modal } = useLocalSearchParams();
    const router = useRouter();

    console.log("Current Pathname:", pathname);

    useEffect(() => {
        if (pathname === '/home' || pathname === '') setActiveModal("home");
    }, [pathname]);


    // useEffect(() => {
    //     if (modal) {
    //         setActiveModal(String(modal));
    //         router.setParams({ modal: undefined });
    //     }
    // }, [modal]);

    return (
        <DataContext.Provider value={{
            pathname,
            activeModal,
            setActiveModal,
            paymentList,
            promoAndDiscounts,
            wallets,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;