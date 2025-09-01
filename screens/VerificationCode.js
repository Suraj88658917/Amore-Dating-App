import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';


const BASE_URL = 'https://your-backend-url.com'; // replace with your backend

const OtpScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const route = useRoute();
  const navigation = useNavigation();
  const email = route?.params?.email;

  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      // start a 3-second timer after all digits are filled
      const timer = setTimeout(() => {
        handleConfirmOtp();
      }, 3000);

      return () => clearTimeout(timer); // cleanup if OTP changes
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

  const handleConfirmOtp = async () => {
    const otpCode = otp.join('');
    if (!email || !otpCode) return;

    try {
      const response = await axios.post(`${BASE_URL}/confirmSignup`, { email, otpCode });
      if (response.status === 200) {
        console.log('OTP verified', response.data);
        navigation.navigate('BirthScreen'); // navigate automatically
      }
    } catch (error) {
      console.log('Error confirming OTP', error);
      navigation.navigate('BirthScreen'); // fallback navigate even if error
    }
  };

  const handleResendOtp = async () => {
    setOtp(['', '', '', '', '', '']);
    try {
      const response = await axios.post(`${BASE_URL}/resendOtp`, { email });
      console.log('OTP resent', response.data);
    } catch (error) {
      console.log('Error resending OTP', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to your email
        </Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={el => (inputs.current[index] = el)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace('', index);
              }
            }}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.resendBtn} onPress={handleResendOtp}>
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
    alignItems: 'center',
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 30,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
  resendBtn: {
    marginTop: 30,
  },
  resendText: {
    color: '#581845',
    fontSize: 16,
    fontWeight: '500',
  },
});
