import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BottomTab from "./Navigation1/BottomTab";

import BasicInfo from "./screens/BasicInfo";
import StartScreen from "./screens/StartScreen";
import NameScreen from "./screens/NameScreen";
import EmailScreen from "./screens/EmailScreen";
import PasswordScreen from "./screens/PasswordScreen";
import VerificationCode from "./screens/VerificationCode";
import BirthScreen from "./screens/BirthScreen";
import LocationScreen from "./screens/LocationScreen";
import GenderScreen from "./screens/GenderScreen";
import TypeScreen from "./screens/TypeScreen";
import DatingScreen from "./screens/DatingScreen";
import LookingFor from "./screens/LookingFor";
import Hometown from "./screens/Hometown";
import WorkPlaceScreen from "./screens/Workplace";
import JobTitle from "./screens/JobTitle";
import PhotosScreen from "./screens/PhotosScreen";
import PromptsScreen from "./screens/PromptsScreen";
import ShowPromptsScreen from "./screens/ShowPromptsScreen";
import WritePrompt from "./screens/WritePrompt";
import PreFinalScreen from "./screens/PreFinalScreen";

import { AuthProvider } from './AuthContext';
import ProfileDetailScreen from "./screens/ProfileDetailScreen";
import ViewProfile from "./components/ViewProfile";
import ChatRoom from "./screens/ChatRoom";




const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          {/* Splash & Auth Screens */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />

          {/* Main App (Bottom Tabs) */}
          <Stack.Screen
            name="Home"
            component={BottomTab}
            options={{ animationEnabled: false }}
          />

          {/* Registration Flow Screens */}
          <Stack.Screen name="BasicInfo" component={BasicInfo} />
          <Stack.Screen name="Name" component={NameScreen} />
          <Stack.Screen name="EmailScreen" component={EmailScreen} />
          <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
          <Stack.Screen name="VerificationCode" component={VerificationCode} />
          <Stack.Screen name="BirthScreen" component={BirthScreen} />
          <Stack.Screen name="LocationScreen" component={LocationScreen} />
          <Stack.Screen name="GenderScreen" component={GenderScreen} />
          <Stack.Screen name="Type" component={TypeScreen} />
          <Stack.Screen name="Dating" component={DatingScreen} />
          <Stack.Screen name="LookingFor" component={LookingFor} />
          <Stack.Screen name="HomeTown" component={Hometown} />
          <Stack.Screen name="Workplace" component={WorkPlaceScreen} />
          <Stack.Screen name="JobTitle" component={JobTitle} />
          <Stack.Screen name="Photos" component={PhotosScreen} />
          <Stack.Screen name="Prompts" component={PromptsScreen} />
          <Stack.Screen name="ShowPromptsScreen" component={ShowPromptsScreen} />
          <Stack.Screen name="WritePrompt" component={WritePrompt} />
          <Stack.Screen name="PreFinal" component={PreFinalScreen} />
          <Stack.Screen name="ProfileDetailsScreen" component={ProfileDetailScreen} />
          <Stack.Screen name="ViewProfile" component={ViewProfile} />
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
          
        </Stack.Navigator>
      </NavigationContainer>
   </AuthProvider>
  );
}
