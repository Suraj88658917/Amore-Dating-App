import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from "../utils/registrationUtils";

const NameScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress("Name").then((progressData) => {
      if (progressData) {
        setFirstName(progressData.firstName || "");
        setLastName(progressData.lastName || "");
      }
    });
  }, []);

  const handleNext = () => {
    if (firstName.trim() === "") {
      return Alert.alert("Error", "First name is required");
    }
    saveRegistrationProgress("Name", { firstName, lastName });
    navigation.navigate("EmailScreen");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", // romantic gradient background
      }}
      style={styles.bg}
    >
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 35 : 0,
          flex: 1,
        }}
      >
        {/* Header */}
        <Text style={styles.subText}>NO BACKGROUND CHECKS ARE CONDUCTED</Text>

        {/* Main Content */}
        <View style={styles.container}>
          <Ionicons name="heart-circle-outline" size={80} color="#FF3366" />

          <Text style={styles.title}>What's your name?</Text>
          <Text style={styles.desc}>
            Your name will be shown on your profile.{"\n"}Don’t worry, you can
            change it later.
          </Text>

          {/* Inputs */}
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            autoFocus
            placeholder="First name *"
            placeholderTextColor={"#fff"}
            style={styles.input}
          />

          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name (optional)"
            placeholderTextColor={"#fff"}
            style={styles.input}
          />

          {/* Next Button */}
          <TouchableOpacity onPress={handleNext} activeOpacity={0.9} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
            <Ionicons name="arrow-forward-circle" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  subText: {
    textAlign: "center",
    marginTop: 20,
    color: "#f5f5f5",
    fontSize: 13,
    fontWeight: "500",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
  desc: {
    textAlign: "center",
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    marginVertical: 10,
    lineHeight: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    color: "white",
    fontSize: 18,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3366",
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 40,
    width: "100%",
    shadowColor: "#FF3366",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
});
