import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';

const PreFinalScreen = () => {
  const { setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const finishRegistration = async () => {
    try {
      setLoading(true);
      const fakeToken = 'user_token_123';
      await AsyncStorage.setItem('token', fakeToken);
      setToken(fakeToken);

      navigation.replace("Home");
    } catch (error) {
      console.log('Error finishing registration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>All set to register.</Text>
        <Text style={[styles.title, { marginTop: 10 }]}>
          Setting up your profile for you.
        </Text>
      </View>

      {/* Display image */}
      <Image
        source={require('../assets/6.jpg')} // replace with your image
        style={styles.image}
        resizeMode="contain"
      />

      <Pressable style={styles.button} onPress={finishRegistration}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Finish Registering</Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === 'android' ? 35 : 0 },
  textContainer: { marginTop: 80, marginLeft: 20 },
  title: { fontSize: 32, fontWeight: 'bold', fontFamily: 'GeezaPro-Bold' },
  image: {
    height: 260,
    width: 300,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 260,
  },
  button: {
    marginTop: 'auto',
    backgroundColor: '#900C3F',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: { textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 15 },
});
