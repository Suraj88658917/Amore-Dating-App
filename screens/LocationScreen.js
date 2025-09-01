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

  // Replace with your own image URL
  const customImageUrl = 'https://i.ibb.co/2M1sJ7F/custom-map.png'; // <-- Your custom image

  const handleNext = () => {
    saveRegistrationProgress('Location', { location });
    navigation.navigate('GenderScreen'); // navigate to next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 80, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="map-marker" size={23} color="black" />
          </View>
          <Image
            style={styles.logo}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png' }}
          />
        </View>

        <Text style={styles.title}>Where do you live?</Text>

        {/* Custom Image */}
        <Image
          source={require("../assets/4.png")}
          style={styles.mapImage}
          resizeMode="cover"
        />

        <Text style={styles.locationText}>{location}</Text>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Ionicons name="chevron-forward-circle-outline" size={45} color="#581845" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
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
  mapImage: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 5,
  },
  locationText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  nextBtn: {
    marginTop: 30,
    alignSelf: 'flex-end',
  },
});
