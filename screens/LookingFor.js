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
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';

const LookingFor = () => {
  const [lookingFor, setLookingFor] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    if (lookingFor.trim() !== '') saveRegistrationProgress('LookingFor', { lookingFor });
    navigation.navigate('HomeTown'); // next screen
  };

  const options = [
    'Life Partner',
    'Long-term relationship',
    'Long-term relationship open to short',
    'Short-term relationship open to long',
    'Short-term relationship',
    'Figuring out my dating goals',
  ];

  useEffect(() => {
    getRegistrationProgress('LookingFor').then(progressData => {
      if (progressData) setLookingFor(progressData.lookingFor || '');
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}
       showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="hand-heart" size={26} color="#ff3f6c" />
          </View>
          <Image
            style={styles.logo}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png' }}
          />
        </View>

        <Text style={styles.title}>What's your dating intention?</Text>
        <Text style={styles.subtitle}>Select all that describe you 💌</Text>

        <View style={styles.optionsContainer}>
          {options.map(option => (
            <Pressable
              key={option}
              onPress={() => setLookingFor(option)}
              style={[
                styles.optionButton,
                lookingFor === option && styles.optionButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  lookingFor === option && styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
              <FontAwesome
                name={lookingFor === option ? 'check-circle' : 'circle-thin'}
                size={26}
                color={lookingFor === option ? '#ff3f6c' : '#ccc'}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default LookingFor;

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
    marginTop: 10,
    marginBottom: 10,
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
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 4,
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
