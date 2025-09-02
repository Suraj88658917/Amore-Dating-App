import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../utils/registrationUtils';

const NameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Name').then(progressData => {
      if (progressData) {
        setFirstName(progressData.firstName || '');
        setLastName(progressData.lastName || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (firstName.trim() !== '') {
      saveRegistrationProgress('Name', { firstName, lastName });
      navigation.navigate('EmailScreen');
    } else {
      alert('First name is required');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.noticeText}>NO BACKGROUND CHECKS ARE CONDUCTED</Text>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <View style={styles.iconCircle}>
            <Ionicons name="newspaper-outline" size={26} color="#ff4d6d" />
          </View>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.titleText}>What's your name?</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            autoFocus
            placeholder="First name (required)"
            placeholderTextColor="#BEBEBE"
            style={styles.input}
          />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name (optional)"
            placeholderTextColor="#BEBEBE"
            style={styles.input}
          />
          <Text style={styles.optionalText}>Last name is optional</Text>
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Ionicons
            name="chevron-forward-circle"
            size={55}
            color="#ff4d6d"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5', // soft pink background
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  noticeText: {
    marginTop: 50,
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
  },
  contentContainer: {
    marginTop: 30,
    marginHorizontal: 25,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  formContainer: {
    marginTop: 40,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
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
  optionalText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 30,
  },
  nextButton: {
    alignSelf: 'flex-end',
  },
});
