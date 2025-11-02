// import Home from "../screens/Home";

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

const Stack = createStackNavigator();

const ChangePinComponent = () => {
  return <ChangePassOrPIN isPin={true} />;
};

export default function Index() {

  return (
    <DataProvider>
      <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
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
      </Stack.Navigator>
    </DataProvider>
  );
}
