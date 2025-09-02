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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';

const HomeTownScreen = () => {
  const [hometown, setHomeTown] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Hometown').then(progressData => {
      if (progressData) setHomeTown(progressData.hometown || '');
    });
  }, []);

  const handleNext = () => {
    if (hometown.trim() !== '') {
      saveRegistrationProgress('Hometown', { hometown });
    }
    navigation.navigate('Workplace');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="home-city" size={28} color="#ff3f6c" />
        </View>
        <Image
          style={styles.logo}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png' }}
        />
      </View>

      <Text style={styles.title}>Where's your hometown?</Text>
      <Text style={styles.subtitle}>This will help match you with nearby people 💌</Text>

      <TextInput
        autoFocus
        value={hometown}
        onChangeText={text => setHomeTown(text)}
        placeholder="Enter your hometown"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity onPress={handleNext} style={styles.nextBtn} activeOpacity={0.8}>
        <Ionicons name="chevron-forward-circle" size={60} color="#ff3f6c" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeTownScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 40,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffe4e1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  logo: {
    width: 110,
    height: 45,
    marginLeft: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff3f6c',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    fontSize: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 40,
  },
  nextBtn: {
    alignSelf: 'flex-end',
  },
});
