import React, { useRef, useState, useEffect } from 'react';
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
      navigation.navigate('LocationScreen'); // navigate to next screen
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
          <MaterialCommunityIcons name="calendar-blank" size={24} color="black" />
        </View>
        <Image
          style={styles.logo}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png' }}
        />
      </View>

      <Text style={styles.title}>What's your date of birth?</Text>

      <View style={styles.inputsContainer}>
        <TextInput
          value={day}
          onChangeText={handleDayChange}
          autoFocus
          placeholder="DD"
          placeholderTextColor="#BEBEBE"
          keyboardType="numeric"
          maxLength={2}
          style={styles.input}
        />
        <TextInput
          value={month}
          onChangeText={handleMonthChange}
          ref={monthRef}
          placeholder="MM"
          placeholderTextColor="#BEBEBE"
          keyboardType="numeric"
          maxLength={2}
          style={styles.input}
        />
        <TextInput
          value={year}
          onChangeText={handleYearChange}
          ref={yearRef}
          placeholder="YYYY"
          placeholderTextColor="#BEBEBE"
          keyboardType="numeric"
          maxLength={4}
          style={[styles.input, { width: 80 }]}
        />
      </View>

      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Ionicons name="chevron-forward-circle-outline" size={45} color="#581845" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DateOfBirthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
    gap: 10,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 80,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 10,
    width: 60,
    fontSize: 22,
    textAlign: 'center',
  },
  nextBtn: {
    marginTop: 30,
    alignSelf: 'flex-end',
  },
});
