import React, { useEffect, useRef } from "react";
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  Animated, 
  Text, 
  Dimensions 
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const navigation = useNavigation();
  
  const scaleLeft = useRef(new Animated.Value(0)).current;
  const scaleRight = useRef(new Animated.Value(0)).current;
  const fadeText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate left and right dots
    Animated.parallel([
      Animated.timing(scaleLeft, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleRight, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeText, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ]).start();

    // Navigate to StartScreen after 3 seconds
    const timeout = setTimeout(() => {
      navigation.replace("StartScreen");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Left big dot */}
      <Animated.View
        style={[
          styles.sideDot,
          styles.leftDot,
          { transform: [{ scale: scaleLeft }] },
        ]}
      />
      
      {/* Right big dot */}
      <Animated.View
        style={[
          styles.sideDot,
          styles.rightDot,
          { transform: [{ scale: scaleRight }] },
        ]}
      />

      {/* Center Text */}
      <Animated.Text style={[styles.title, { opacity: fadeText }]}>
        Amore Dating App
      </Animated.Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5", // light pink
    justifyContent: "center",
    alignItems: "center",
  },
  sideDot: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.6,
  },
  leftDot: {
    backgroundColor: "#FF6B81", // pink-red
    left: -100,
    top: height / 4,
  },
  rightDot: {
    backgroundColor: "#e2427fff", // deep pink
    right: -100,
    top: height / 3,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#900C3F",
    textAlign: "center",
  },
});
