// GenderScreen.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';

const GenderScreen = () => {
  const [gender, setGender] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Gender').then(progressData => {
      if (progressData) setGender(progressData.gender || '');
    });
  }, []);

  const handleNext = () => {
    if (gender.trim() !== '') saveRegistrationProgress('Gender', { gender });
    navigation.navigate('Type'); // next screen
  };

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

      <Text style={styles.title}>Which gender describes you the best?</Text>
      <Text style={styles.subtitle}>
        This helps us show nearby matches 💌 You can add more about gender later.
      </Text>

      <View style={styles.optionsContainer}>
        {['Men', 'Women', 'Non Binary'].map(item => (
          <Pressable
            key={item}
            onPress={() => setGender(item)}
            style={[
              styles.optionButton,
              gender === item && styles.optionButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                gender === item && styles.optionTextSelected,
              ]}
            >
              {item}
            </Text>
            <FontAwesome
              name={gender === item ? 'check-circle' : 'circle-thin'}
              size={26}
              color={gender === item ? '#ff3f6c' : '#ccc'}
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

export default GenderScreen;

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
