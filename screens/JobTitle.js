import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';

const JobTitleScreen = () => {
  const [jobTitle, setJobTitle] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('JobTitle').then(progressData => {
      if (progressData) setJobTitle(progressData.jobTitle || '');
    });
  }, []);

  const handleNext = () => {
    if (jobTitle.trim() !== '') saveRegistrationProgress('JobTitle', { jobTitle });
    navigation.navigate('Photos');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="lan" size={28} color="#ff3f6c" />
        </View>
        <Image
          style={styles.logo}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png' }}
        />
      </View>

      <Text style={styles.title}>What's your job title?</Text>
      <Text style={styles.subtitle}>Let people know what you do 💼</Text>

      <TextInput
        autoFocus
        value={jobTitle}
        onChangeText={text => setJobTitle(text)}
        placeholder="Enter your job title"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity onPress={handleNext} style={styles.nextBtn} activeOpacity={0.8}>
        <Ionicons name="chevron-forward-circle" size={60} color="#ff3f6c" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default JobTitleScreen;

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
