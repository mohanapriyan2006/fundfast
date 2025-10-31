// import Home from "../screens/Home";

import { DataProvider } from "../context/DataContext";
import LoginScreen from "../screens/LoginScreen";
import PINScreen from "../screens/PINScreen";
import QRScanScreen from "../screens/QRScanScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RootLayout from "./Rootlayout";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <DataProvider>
      <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false  }}>
        <Stack.Screen name="main" component={RootLayout} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="scan" component={QRScanScreen} />
        <Stack.Screen name="pin" component={PINScreen} />
      </Stack.Navigator>
    </DataProvider>
  );
}
