// import Home from "../screens/Home";

import { DataProvider } from "../context/DataContext";
import QRScanScreen from "../screens/QRScanScreen";
import RootLayout from "./Rootlayout";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <DataProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" component={RootLayout} />
        <Stack.Screen name="scan" component={QRScanScreen} />
      </Stack.Navigator>
    </DataProvider>
  );
}
