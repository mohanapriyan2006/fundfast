
import { TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import { Image } from "expo-image";
import { primary } from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size }) => {
            let iconName;
            if (route.name === 'home') {
              iconName = require("../assets/images/home-icon.png");
            } else if (route.name === 'stats') {
              iconName = require("../assets/images/stats-icon.png");
            } else if (route.name === 'notification') {
              iconName = require("../assets/images/notification-icon.png");
            } else if (route.name === 'profile') {
              iconName = require("../assets/images/profile-icon.png");
            }

            return <Image source={iconName} style={{ width: size, height: size, tintColor: focused ? primary.dark : '#707070ff' }} />;
          },
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            height: 70,
            paddingTop: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderWidth: 0.5,
            borderColor: '#4a4a4aff',
            borderBottomColor: '#ffffff'
          },
        })}
      >
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="stats" component={HomeScreen} />
        <Tab.Screen name="notification" component={HomeScreen} />
        <Tab.Screen name="profile" component={HomeScreen} />
      </Tab.Navigator>

      <TouchableOpacity style={{ position: 'absolute', bottom: 40, left: '50%', marginLeft: -25 , zIndex: 9999 }}>
        <Image style={{ width: 50, height: 50 }} source={require("../assets/images/qrscan.png")} />
      </TouchableOpacity>
    </View >
  );
}