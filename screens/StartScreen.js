import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartScreen = () => {
  const navigation = useNavigation();

  // Heart scale animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

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
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={require("../assets/Lover.png")} 
          style={[styles.heartImage, { transform: [{ scale: scaleAnim }] }]}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Welcome to Amore Dating App</Text>
      <Text style={styles.subtitle}>Your profile, your way!</Text>

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
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 50,
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
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    color: "#581845",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: "#900C3F",
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
