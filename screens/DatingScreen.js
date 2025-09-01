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
      if (progressData) {
        setDatingPreferences(progressData.datingPreferences || []);
      }
    });
  }, []);

  const handleNext = () => {
    if (datingPreferences.length > 0) {
      saveRegistrationProgress('Dating', { datingPreferences });
    }
    navigation.navigate('LookingFor');
  };

  const options = ['Men', 'Women', 'Everyone'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 80, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="gender-male-female" size={23} color="black" />
          </View>
          <Image
            style={styles.logo}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png' }}
          />
        </View>

        <Text style={styles.title}>Who do you want to date?</Text>
        <Text style={styles.subtitle}>Select all people you're open to meeting</Text>

        <View style={{ marginTop: 30 }}>
          {options.map(option => (
            <View key={option} style={styles.optionRow}>
              <Text style={styles.optionText}>{option}</Text>
              <Pressable onPress={() => chooseOption(option)}>
                <FontAwesome
                  name="circle"
                  size={26}
                  color={datingPreferences.includes(option) ? '#581845' : '#F0F0F0'}
                />
              </Pressable>
            </View>
          ))}

          <View style={styles.visibleRow}>
            <MaterialCommunityIcons name="checkbox-marked" size={25} color="#900C3F" />
            <Text style={styles.visibleText}>Visible on profile</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleNext} activeOpacity={0.8} style={styles.nextBtn}>
          <Ionicons name="chevron-forward-circle-outline" size={45} color="#581845" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DatingType;

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
    marginLeft: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 20,
    color: 'gray',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '500',
  },
  visibleRow: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  visibleText: {
    fontSize: 15,
  },
  nextBtn: {
    marginTop: 30,
    alignSelf: 'flex-end',
  },
});
