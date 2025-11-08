// import Home from "../screens/Home";

import { useEffect, useState } from "react";
import EnterMoneyModal from "../components/EnterMoneyModal";
import About from "../components/ProfileComponents/About";
import ChangePassOrPIN from "../components/ProfileComponents/ChangePassOrPIN";
import EditProfile from "../components/ProfileComponents/EditProfile";
import ManageWallet from "../components/ProfileComponents/ManageWallet";
import TermsAndConditions from "../components/ProfileComponents/TermsAndConditions";
import { DataProvider } from "../context/DataContext";
import LoginScreen from "../screens/LoginScreen";
import PINScreen from "../screens/PINScreen";
import QRScanScreen from "../screens/QRScanScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RootLayout from "./Rootlayout";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "../context/AuthContext";
import '../global.css';

const Stack = createStackNavigator();

const ChangePinComponent = () => {
  return <ChangePassOrPIN isPin={true} />;
};

export default function Index() {

  // const [backendConnected, setBackendConnected] = useState(true);

  // useEffect(() => {
  //   const res = testHealth();
  //   if (res && res.status === "UP") {
  //     setBackendConnected(true);
  //   }
  //   else {
  //     setBackendConnected(false);
  //   }
  // }, []);

  return (
    <AuthProvider>
      <DataProvider>
        <Stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="main" component={RootLayout} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
          <Stack.Screen name="scan" component={QRScanScreen} />
          <Stack.Screen name="pin" component={PINScreen} />
          <Stack.Screen name="manage-wallet" component={ManageWallet} />
          <Stack.Screen name="edit-profile" component={EditProfile} />
          <Stack.Screen name="change-password" component={ChangePassOrPIN} />
          <Stack.Screen name="change-pin" component={ChangePinComponent} />
          <Stack.Screen name="terms-conditions" component={TermsAndConditions} />
          <Stack.Screen name="about" component={About} />
          <Stack.Screen name="enter-money" component={EnterMoneyModal} />
        </Stack.Navigator>
      </DataProvider>
    </AuthProvider>
  );
}
