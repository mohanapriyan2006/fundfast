import { createContext, useEffect, useState } from "react";
import { usePathname } from 'expo-router';

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

export const DataProvider = ({ children }) => {

    const [activeModal, setActiveModal] = useState("home");

    const pathname = usePathname().substring(6);

    console.log("Current Pathname:", pathname);

    useEffect(() => {
        setActiveModal("home");
    }, [pathname]);

    return (
        <DataContext.Provider value={{
            pathname,
            activeModal,
            setActiveModal,
            paymentList,
            promoAndDiscounts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;