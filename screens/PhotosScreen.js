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
  Button,
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
      if (progressData) {
        setImageUrls(progressData.imageUrls || ['', '', '', '', '', '']);
      }
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
      <View style={{ marginTop: 80, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.icon}>
            <MaterialIcons name="photo-camera-back" size={23} color="black" />
          </View>
          <Image
            style={styles.logo}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png' }}
          />
        </View>

        <Text style={styles.title}>Pick your photos and videos</Text>

        {/* Photo grid: first 3 */}
        <View style={{ marginTop: 20 }}>
          <View style={styles.photoRow}>
            {imageUrls.slice(0, 3).map((url, index) => (
              <Pressable key={index} style={[styles.photoBox, { borderWidth: url ? 0 : 2 }]}>
                {url ? (
                  <Image source={{ uri: url }} style={styles.photoImage} />
                ) : (
                  <EvilIcons name="image" size={22} color="black" />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Photo grid: next 3 */}
        <View style={{ marginTop: 20 }}>
          <View style={styles.photoRow}>
            {imageUrls.slice(3, 6).map((url, index) => (
              <Pressable key={index} style={[styles.photoBox, { borderWidth: url ? 0 : 2 }]}>
                {url ? (
                  <Image source={{ uri: url }} style={styles.photoImage} />
                ) : (
                  <EvilIcons name="image" size={22} color="black" />
                )}
              </Pressable>
            ))}
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ color: 'gray', fontSize: 15 }}>Drag to reorder</Text>
            <Text style={{ marginTop: 4, color: '#581845', fontWeight: '500', fontSize: 15 }}>
              Add four to six photos
            </Text>
          </View>

          <View style={{ marginTop: 25 }}>
            <Text>Add a picture of yourself</Text>
            <View style={styles.inputRow}>
              <EvilIcons name="image" size={22} color="black" style={{ marginLeft: 8 }} />
              <TextInput
                value={imageUrl}
                onChangeText={text => setImageUrl(text)}
                placeholder="Enter your image url"
                style={styles.textInput}
              />
            </View>
            <Button title="Add Image" onPress={handleAddImage} />
          </View>
        </View>

        <TouchableOpacity onPress={handleNext} activeOpacity={0.8} style={styles.nextBtn}>
          <Ionicons name="chevron-forward-circle-outline" size={45} color="#581845" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PhotoScreen;

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
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  photoBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: '#581845',
    borderRadius: 10,
    height: 80,
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 5,
    marginTop: 2,
    backgroundColor: '#DCDCDC',
    paddingVertical: 6,
  },
  textInput: {
    color: 'gray',
    marginVertical: 10,
    width: 300,
  },
  nextBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
