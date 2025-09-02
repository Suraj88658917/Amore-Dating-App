import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Animated,
  Easing,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartScreen = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Heart beat animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", // 💕 Romantic couple background
      }}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Animated Heart */}
        <View style={styles.imageContainer}>
          <Animated.Image
            source={require("../assets/Lover.png")}
            style={[styles.heartImage, { transform: [{ scale: scaleAnim }] }]}
            resizeMode="contain"
          />
        </View>

        {/* Title & Subtitle */}
        <Text style={styles.title}>Welcome to Amore Dating App</Text>
        <Text style={styles.subtitle}>Find your perfect match ❤️</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, { backgroundColor: "#581845" }]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: "#900C3F" }]}
            onPress={() => navigation.navigate("BasicInfo")}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "rgba(0,0,0,0.5)", // overlay for readability
  },
  imageContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  heartImage: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 50,
    width: "80%",
    gap: 15,
  },
  button: {
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
