// DateOfBirthScreen.js
import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';

const DateOfBirthScreen = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const navigation = useNavigation();
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    getRegistrationProgress('Birth').then(progressData => {
      if (progressData) {
        const { dateOfBirth } = progressData;
        const [d, m, y] = dateOfBirth.split('/');
        setDay(d);
        setMonth(m);
        setYear(y);
      }
    });
  }, []);

  const handleNext = () => {
    if (day && month && year) {
      const dateOfBirth = `${day}/${month}/${year}`;
      saveRegistrationProgress('Birth', { dateOfBirth });
      navigation.navigate('LocationScreen');
    }
  };

  const handleDayChange = text => {
    setDay(text);
    if (text.length === 2) monthRef.current.focus();
  };

  const handleMonthChange = text => {
    setMonth(text);
    if (text.length === 2) yearRef.current.focus();
  };

  const handleYearChange = text => setYear(text);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="calendar-blank" size={24} color="#ff3f6c" />
        </View>
        <Text style={styles.title}>What's your date of birth?</Text>
      </View>

      <View style={styles.inputsContainer}>
        <TextInput
          value={day}
          onChangeText={handleDayChange}
          autoFocus
          placeholder="DD"
          placeholderTextColor="#ff6b81"
          keyboardType="numeric"
          maxLength={2}
          style={styles.input}
        />
        <TextInput
          value={month}
          onChangeText={handleMonthChange}
          ref={monthRef}
          placeholder="MM"
          placeholderTextColor="#ff6b81"
          keyboardType="numeric"
          maxLength={2}
          style={styles.input}
        />
        <TextInput
          value={year}
          onChangeText={handleYearChange}
          ref={yearRef}
          placeholder="YYYY"
          placeholderTextColor="#ff6b81"
          keyboardType="numeric"
          maxLength={4}
          style={[styles.input, { width: 90 }]}
        />
      </View>

      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Ionicons name="chevron-forward-circle" size={55} color="#ff3f6c" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DateOfBirthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffe4e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff3f6c',
    textAlign: 'center',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 80,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#ff6b81',
    width: 70,
    fontSize: 22,
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff0f5',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  nextBtn: {
    marginTop: 50,
    alignSelf: 'flex-end',
  },
});
