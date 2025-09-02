import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveRegistrationProgress } from '../utils/registrationUtils';
import axios from 'axios';


const PasswordScreen = () => {
  const [password, setPassword] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const email = route?.params?.email;

  const handleSendOtp = async () => {
  if (!email) return;
  try {
    const response = await axios.post(`${BASE_URL}/sendOtp`, {
      email,
      password,
    });
    console.log(response.data.message);
  } catch (error) {
    console.log('Error sending the OTP', error);
  } finally {
    // Always navigate, whether API works or fails
    navigation.navigate("VerificationCode", { email });
  }
};


  const handleNext = () => {
    if (password.trim() !== '') {
      saveRegistrationProgress('Password', { password });
    }
    handleSendOtp();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="lock-closed" size={60} color="#ff4d6d" />
        <Text style={styles.headerText}>Secure Your Love</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Choose a password 🔒</Text>
        <Text style={styles.subtitle}>
          Keep your heart safe with a strong password ❤️
        </Text>

        {/* Input field */}
        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={22} color="#ff4d6d" style={{ marginRight: 10 }} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </View>

        <Text style={styles.note}>✨ Your details are safe with us</Text>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextText}>Continue</Text>
          <Ionicons name="chevron-forward-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5', // romantic light pink background
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff4d6d',
    marginTop: 10,
  },
  content: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  note: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
    marginBottom: 30,
  },
  nextBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4d6d',
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  nextText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});
