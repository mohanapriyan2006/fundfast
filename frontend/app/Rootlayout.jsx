
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import { Image } from "expo-image";
import { primary } from "../theme/colors";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";
import QRScanScreen from "../screens/QRScanScreen";
import { useNavigation } from "@react-navigation/native";
import StatsScreen from "../screens/StatsScreen";

const Tab = createBottomTabNavigator();

export default function RootLayout() {

  const { setActiveModal, isAPIConnected } = useContext(DataContext);

  const navigation = useNavigation();

  const APINotConnect = () => {
    return (
      <View style={{position: 'absolute', top: 50, left: 0, right: 0, zIndex: 10000 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffe6e6ff' , borderRadius: 10, elevation: 4, padding: 20 , marginHorizontal: 20}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: 'red' }}>Connection Error</Text>
          <Text style={{ fontSize: 14, textAlign: 'center' }}>Unable to connect to the server. Please check your internet connection or try again later.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={primary.dark} />

      <Tab.Navigator
        defaultRouteName="home"
        screenListeners={{
          tabPress: e => {
            setActiveModal("home");
          }
        }}
        screenOptions={({ route }) => ({
          headerShown: false,
          // tabBarShowLabel: false,
          tabBarButton: route.name === 'Qr' ? () => null : undefined,
          tabBarIcon: ({ focused, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = require("../assets/images/home-icon.png");
            } else if (route.name === 'Stats') {
              iconName = require("../assets/images/stats-icon.png");
            } else if (route.name === 'Notification') {
              iconName = require("../assets/images/notification-icon.png");
            } else if (route.name === 'Profile') {
              iconName = require("../assets/images/profile-icon.png");
            }

            return (
              <Image
                source={iconName}
                style={{ width: 30, height: 30, tintColor: focused ? primary.dark : '#707070ff' }}
              />
            );
          },
          tabBarActiveTintColor: primary.dark,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            height: 90,
            paddingTop: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },

        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Qr" component={QRScanScreen} />
        <Tab.Screen name="Notification" component={NotificationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

      <TouchableOpacity
        style={{ position: 'absolute', bottom: 60, left: '50%', marginLeft: -25, zIndex: 9999 }}
        onPress={() => navigation.navigate("scan")}
      >
        <Image style={{ width: 50, height: 50 }} source={require("../assets/images/qrscan.png")} />
      </TouchableOpacity>

      {!isAPIConnected && <APINotConnect />}

    </View >
  );
}