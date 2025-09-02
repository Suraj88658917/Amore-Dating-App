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
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';

const PhotoScreen = () => {
  const [imageUrls, setImageUrls] = useState(['', '', '', '', '', '']);
  const [imageUrl, setImageUrl] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Photos').then(progressData => {
      if (progressData) setImageUrls(progressData.imageUrls || ['', '', '', '', '', '']);
    });
  }, []);

  const handleAddImage = () => {
    const index = imageUrls.findIndex(url => url === '');
    if (index !== -1) {
      const updatedUrls = [...imageUrls];
      updatedUrls[index] = imageUrl;
      setImageUrls(updatedUrls);
      setImageUrl('');
    }
  };

  const handleNext = () => {
    saveRegistrationProgress('Photos', { imageUrls });
    navigation.navigate('Prompts');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <MaterialIcons name="photo-camera-back" size={28} color="#ff3f6c" />
          </View>
          <Image
            style={styles.logo}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png' }}
          />
        </View>

        <Text style={styles.title}>Pick your photos and videos</Text>
        <Text style={styles.subtitle}>Add 4 to 6 photos of yourself 📸</Text>

        {/* Photo grid */}
        <View style={styles.photoGrid}>
          {imageUrls.map((url, index) => (
            <Pressable key={index} style={[styles.photoBox, url && styles.photoBoxFilled]}>
              {url ? <Image source={{ uri: url }} style={styles.photoImage} /> : <EvilIcons name="image" size={28} color="#aaa" />}
            </Pressable>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="Paste image URL"
            placeholderTextColor="#999"
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAddImage}>
            <Text style={{ color: 'white', fontWeight: '600' }}>Add</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Ionicons name="chevron-forward-circle" size={60} color="#ff3f6c" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 25,
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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 50,
  },
  photoBox: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#ffe4e1',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#ff3f6c',
    overflow: 'hidden',
  },
  photoBoxFilled: {
    borderWidth: 0,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    gap: 20,
  },
  textInput: {
    flex: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  addBtn: {
    backgroundColor: '#ff3f6c',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 15,
  },
  nextBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});
