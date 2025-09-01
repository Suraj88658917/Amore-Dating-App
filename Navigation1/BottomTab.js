import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "../screens/Home";
import Matches from "../screens/Matches";
import Messages from "../screens/Messages";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const BottomTab = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Explore") {
          iconName = focused ? "search" : "search-outline";
        } else if (route.name === "Matches") {
          iconName = focused ? "heart" : "heart-outline";
        } else if (route.name === "Chat") {
          iconName = focused ? "chatbubble" : "chatbubble-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "person" : "person-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#4b7bec",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Explore" component={Home} />
    <Tab.Screen name="Matches" component={Matches} />
    <Tab.Screen name="Chat" component={Messages} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

export default BottomTab;
