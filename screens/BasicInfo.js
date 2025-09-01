import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Pressable,
  Image,
  Animated,
  Easing,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const BasicInfo = () => {
  const navigation = useNavigation();

  // Animation value
  const bounceValue = useRef(new Animated.Value(0)).current;

  // Animate image
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -20, // move up
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0, // move back
          duration: 800,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceValue]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 80 }}>
        <Text style={styles.title}>You're one of a kind.</Text>
        <Text style={[styles.title, { marginTop: 10 }]}>
          Your profile should be too.
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Animated.Image
          source={require("../assets/3.png")}
          style={{
            width: 260,
            height: 260,
            transform: [{ translateY: bounceValue }],
          }}
          resizeMode="contain"
        />
      </View>

      <Pressable
        onPress={() => navigation.navigate('Name')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Enter Basic Info</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default BasicInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 0,
    backgroundColor: 'white',
    justifyContent: 'space-between', // ensure button stays at bottom
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  button: {
    marginBottom: 70, // safe padding
    backgroundColor: '#900C3F',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});
