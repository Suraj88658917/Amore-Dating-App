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

        switch (route.name) {
          case "Explore":
            iconName = focused ? "search" : "search-outline";
            break;
          case "Matches":
            iconName = focused ? "heart" : "heart-outline";
            break;
          case "Chat":
            iconName = focused ? "chatbubble" : "chatbubble-outline";
            break;
          case "Profile":
            iconName = focused ? "person" : "person-outline";
            break;
          default:
            iconName = "ellipse";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#4b7bec",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Explore" component={Home} key="tab-explore" />
    <Tab.Screen name="Matches" component={Matches} key="tab-matches" />
    <Tab.Screen name="Chat" component={Messages} key="tab-chat" />
    <Tab.Screen name="Profile" component={Profile} key="tab-profile" />
  </Tab.Navigator>
);

export default BottomTab;
