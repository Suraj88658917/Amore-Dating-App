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

const WorkPlaceScreen = () => {
  const [workPlace, setWorkPlace] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('WorkPlace').then(progressData => {
      if (progressData) {
        setWorkPlace(progressData.workPlace || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (workPlace.trim() !== '') {
      saveRegistrationProgress('WorkPlace', { workPlace });
    }
    navigation.navigate('JobTitle');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 80, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="briefcase-outline" size={23} color="black" />
          </View>
          <Image
            style={styles.logo}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png' }}
          />
        </View>

        <Text style={styles.title}>Where do you work?</Text>

        <TextInput
          autoFocus
          value={workPlace}
          onChangeText={text => setWorkPlace(text)}
          placeholder="Workplace"
          style={styles.input}
        />

        <TouchableOpacity onPress={handleNext} activeOpacity={0.8} style={styles.nextBtn}>
          <Ionicons name="chevron-forward-circle-outline" size={45} color="#581845" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WorkPlaceScreen;

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
  input: {
    width: '100%',
    marginTop: 25,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontSize: 22,
  },
  nextBtn: {
    marginTop: 30,
    alignSelf: 'flex-end',
  },
});
