import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Pressable,
  Animated,
  Easing,
  ImageBackground,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

 // screen --
const BasicInfo = () => {
  const navigation = useNavigation();
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -15,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 800,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceValue]);

  return (
    <ImageBackground
      source={{
       uri: "https://images.unsplash.com/photo-1509042239860-f550ce710b93"

      }}
      style={styles.bg}
    >
      <SafeAreaView style={styles.container}>
        {/* Header text */}
        <View style={styles.header}>
          <Text style={styles.title}>You're one of a kind.</Text>
          <Text style={styles.subtitle}>
            Your profile should be too ✨
          </Text>
        </View>

  

        {/* CTA button */}
        <Pressable
          onPress={() => navigation.navigate("Name")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Enter Basic Info</Text>
          <Ionicons
            name="arrow-forward-circle"
            size={26}
            color="#fff"
            style={{ marginLeft: 8 }}
          />
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default BasicInfo;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingBottom: 50,
  },
  header: {
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    marginTop: 10,
  },
  illustrationWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  illustration: {
    width: 260,
    height: 260,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3366",
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: "#FF3366",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
