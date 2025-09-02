// DatingType.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';

const DatingType = () => {
  const [datingPreferences, setDatingPreferences] = useState([]);
  const navigation = useNavigation();

  const chooseOption = option => {
    if (datingPreferences.includes(option)) {
      setDatingPreferences(datingPreferences.filter(item => item !== option));
    } else {
      setDatingPreferences([...datingPreferences, option]);
    }
  };

  useEffect(() => {
    getRegistrationProgress('Dating').then(progressData => {
      if (progressData) setDatingPreferences(progressData.datingPreferences || []);
    });
  }, []);

  const handleNext = () => {
    if (datingPreferences.length > 0) saveRegistrationProgress('Dating', { datingPreferences });
    navigation.navigate('LookingFor'); // next screen
  };

  const options = ['Men', 'Women', 'Everyone'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="gender-male-female" size={26} color="#ff3f6c" />
        </View>
        <Image
          style={styles.logo}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png' }}
        />
      </View>

      <Text style={styles.title}>Who do you want to date?</Text>
      <Text style={styles.subtitle}>Select all people you're open to meeting 💌</Text>

      <View style={styles.optionsContainer}>
        {options.map(option => (
          <Pressable
            key={option}
            onPress={() => chooseOption(option)}
            style={[
              styles.optionButton,
              datingPreferences.includes(option) && styles.optionButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                datingPreferences.includes(option) && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
            <FontAwesome
              name={datingPreferences.includes(option) ? 'check-circle' : 'circle-thin'}
              size={26}
              color={datingPreferences.includes(option) ? '#ff3f6c' : '#ccc'}
            />
          </Pressable>
        ))}

        <View style={styles.visibleRow}>
          <MaterialCommunityIcons name="checkbox-marked" size={25} color="#ff3f6c" />
          <Text style={styles.visibleText}>Visible on profile</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Ionicons name="chevron-forward-circle" size={55} color="#ff3f6c" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DatingType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 30,
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
    width: 100,
    height: 40,
    marginLeft: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff3f6c',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
  },
  optionsContainer: {
    marginVertical: 10,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  optionButtonSelected: {
    backgroundColor: '#ffd6e0',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  optionTextSelected: {
    color: '#ff3f6c',
    fontWeight: '600',
  },
  visibleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  visibleText: {
    fontSize: 14,
    color: '#555',
  },
  nextBtn: {
    marginTop: 40,
    alignSelf: 'flex-end',
  },
});
