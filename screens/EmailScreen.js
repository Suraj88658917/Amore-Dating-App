import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../utils/registrationUtils';

const EmailScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Email').then(progressData => {
      if (progressData) {
        setEmail(progressData.email || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (email.trim() !== '') {
      saveRegistrationProgress('Email', { email });
      navigation.navigate('PasswordScreen', { email });
    } else {
      alert('Email is required');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
          }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.body}>
        <View style={styles.iconWrapper}>
          <Fontisto name="email" size={24} color="#ff4d6d" />
        </View>
        <Text style={styles.title}>What's your email?</Text>
        <Text style={styles.subtitle}>
          Email verification helps us secure your account
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#BEBEBE"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.note}>You will be asked to verify your email later</Text>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Ionicons name="chevron-forward-circle" size={55} color="#ff4d6d" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 120,
    height: 50,
  },
  body: {
    marginTop: 50,
    marginHorizontal: 25,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffe6ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  note: {
    fontSize: 14,
    color: '#999',
    marginBottom: 30,
  },
  nextButton: {
    alignSelf: 'flex-end',
  },
});
