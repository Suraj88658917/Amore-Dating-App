import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { saveRegistrationProgress } from '../utils/registrationUtils';
import axios from 'axios';
import { BASE_URL } from '../urls/url';

const PasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const email = route?.params?.email;

  const handleSendOtp = async () => {
    if(!email){
      return;
    }

    try{
      const response = await axios.post(`${BASE_URL}/sendOtp`,{
        email,
        password
      });
      console.log(response.data.message);
      navigation.navigate('VerificationCode', {email});

    } catch(error){
      console.log("Error sending the OTP",error)
    }
  }
  const handleNext = () => {
    if(password.trim() !== ''){
      saveRegistrationProgress('Password',{password});
    }
    navigation.navigate('VerificationCode', {email});

    handleSendOtp();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="lock" size={26} color="#ff4d6d" />
          </View>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.titleText}>Please choose a password</Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          autoFocus
          placeholder="Enter your Password"
          secureTextEntry
          placeholderTextColor="#BEBEBE"
          style={styles.input}
        />

        <Text style={styles.noteText}>
          Note: Your details will be safe with us
        </Text>

        <TouchableOpacity
          onPress={handleNext}
          style={styles.nextButton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#ff4d6d" />
          ) : (
            <Ionicons
              name="chevron-forward-circle"
              size={55}
              color="#ff4d6d"
            />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  contentContainer: {
    marginTop: 80,
    marginHorizontal: 25,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffe6ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logo: {
    width: 100,
    height: 40,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  noteText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 30,
  },
  nextButton: {
    alignSelf: 'flex-end',
  },
});
