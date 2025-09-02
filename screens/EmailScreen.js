import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons"; 
import { useNavigation } from "@react-navigation/native";
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from "../utils/registrationUtils";

const EmailScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress("Email").then((progressData) => {
      if (progressData) {
        setEmail(progressData.email || "");
      }
    });
  }, []);

  const handleNext = () => {
    if (email.trim() !== "") {
      saveRegistrationProgress("Email", { email });
    }
    navigation.navigate("PasswordScreen", { email });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="heart" size={60} color="#ff4d6d" />
        <Text style={styles.headerText}>Find Your Match</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>What’s your email?</Text>
        <Text style={styles.subtitle}>
          We’ll use it to keep your account secure 💌
        </Text>

        {/* Input */}
        <View style={styles.inputContainer}>
          <Fontisto
            name="email"
            size={20}
            color="#ff4d6d"
            style={{ marginRight: 8 }}
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            placeholderTextColor={"#aaa"}
            style={styles.input}
            keyboardType="email-address"
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={styles.nextButton}
        >
          <Text style={styles.nextText}>Next</Text>
          <Ionicons
            name="chevron-forward-circle"
            size={28}
            color="white"
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f5", // light romantic background
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
  header: {
    marginTop: 60,
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    color: "#ff4d6d",
    fontWeight: "bold",
    marginTop: 10,
  },
  content: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  nextButton: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff4d6d",
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  nextText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
