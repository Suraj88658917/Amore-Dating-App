// VerificationCodeScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const VerificationCodeScreen = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const navigation = useNavigation();

  // Navigate automatically when all digits are filled
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      const timer = setTimeout(() => {
        navigation.navigate("BirthScreen");
      }, 800); // 0.8 sec delay
      return () => clearTimeout(timer);
    }
  }, [otp]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="heart" size={60} color="#ff6b81" />
        <Text style={styles.title}>Verify Your Account</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to your email 💌
        </Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((_, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            ref={(el) => (inputs.current[index] = el)}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") handleBackspace("", index);
            }}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.resendBtn} onPress={handleResendOtp}>
        <Ionicons name="refresh" size={18} color="#fff" />
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VerificationCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
    alignItems: "center",
    backgroundColor: "#ffe4e1",
  },
  header: {
    marginTop: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff3f6c",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    width: "80%",
  },
  otpInput: {
    width: 50,
    height: 55,
    borderWidth: 2,
    borderColor: "#ff6b81",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    backgroundColor: "#fff0f5",
    color: "#ff3f6c",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  resendBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: "#ff6b81",
  },
  resendText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
