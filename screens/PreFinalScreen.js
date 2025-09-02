import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Platform,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PreFinalScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const finishRegistration = async () => {
    try {
      setLoading(true);
      const fakeToken = 'user_token_123';
      await AsyncStorage.setItem('token', fakeToken);
      navigation.replace('Home');
    } catch (error) {
      console.log('Error finishing registration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/6.jpg')} // Replace with your background image
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Header Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>You're All Set!</Text>
          <Text style={styles.subtitle}>Let's set up your profile and start matching.</Text>
        </View>

        {/* Finish Button */}
        <Pressable
          onPress={finishRegistration}
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Finish & Explore</Text>
          )}
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent overlay
  },
  textContainer: {
    marginBottom: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffe6f0',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#ff3366',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});
