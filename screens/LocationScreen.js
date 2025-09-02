// LocationScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { saveRegistrationProgress } from '../utils/registrationUtils';

const LocationScreen = () => {
  const navigation = useNavigation();
  const [location] = useState('Demo City, Demo State');

  const handleNext = () => {
    saveRegistrationProgress('Location', { location });
    navigation.navigate('GenderScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="map-marker" size={26} color="#ff3f6c" />
        </View>
        <Text style={styles.title}>Where do you live?</Text>
        <Text style={styles.subtitle}>This helps us show nearby matches 💌</Text>
      </View>

      <View style={styles.mapContainer}>
        <Image
          source={require("../assets/4.png")} // your map image
          style={styles.mapImage}
          resizeMode="cover"
        />
        <View style={styles.locationCard}>
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Ionicons name="chevron-forward-circle" size={55} color="#ff3f6c" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
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
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff3f6c',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
    textAlign: 'center',
  },
  mapContainer: {
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  mapImage: {
    width: '100%',
    height: 300,
  },
  locationCard: {
    position: 'absolute',
    bottom: 15,
    left: '50%',
    transform: [{ translateX: -120 }],
    width: 240,
    paddingVertical: 10,
    backgroundColor: '#ff6b81',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextBtn: {
    marginTop: 40,
    alignSelf: 'flex-end',
  },
});
