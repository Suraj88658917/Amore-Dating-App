// screens/ProfileScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    age: 26,
    location: 'New York, USA',
    bio: 'Love adventures, coffee, and good conversations!',
    interests: ['Travel', 'Music', 'Cooking', 'Fitness'],
    image: 'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
  });

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  const [nameInput, setNameInput] = useState(profile.name);
  const [locationInput, setLocationInput] = useState(profile.location);
  const [bioInput, setBioInput] = useState(profile.bio);
  const [interestsInput, setInterestsInput] = useState(profile.interests.join(', '));
  const [imageInput, setImageInput] = useState(profile.image);

  // Save changes
  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      name: nameInput,
      location: locationInput,
      bio: bioInput,
      interests: interestsInput.split(',').map(item => item.trim()),
      image: imageInput,
    }));
    setIsEditingBio(false);
    setIsEditingInterests(false);
    setIsEditingName(false);
    setIsEditingLocation(false);
    setIsEditingImage(false);
    Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: profile.image }} style={styles.avatar} />

        {/* Edit Image */}
        {isEditingImage ? (
          <TextInput
            style={styles.imageInput}
            value={imageInput}
            onChangeText={setImageInput}
            placeholder="Enter image URL"
          />
        ) : null}

        <TouchableOpacity 
          style={styles.editSmallButton} 
          onPress={() => setIsEditingImage(!isEditingImage)}
        >
          <Text style={styles.editSmallButtonText}>{isEditingImage ? 'Done' : 'Edit Image'}</Text>
        </TouchableOpacity>

        {/* Name field */}
        <View style={styles.inlineEdit}>
          {isEditingName ? (
            <TextInput
              style={styles.nameInput}
              value={nameInput}
              onChangeText={setNameInput}
            />
          ) : (
            <Text style={styles.name}>{profile.name}, {profile.age}</Text>
          )}
          <TouchableOpacity 
            style={styles.editSmallButton} 
            onPress={() => setIsEditingName(!isEditingName)}
          >
            <Text style={styles.editSmallButtonText}>{isEditingName ? 'Done' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        {/* Location field */}
        <View style={styles.inlineEdit}>
          {isEditingLocation ? (
            <TextInput
              style={styles.locationInput}
              value={locationInput}
              onChangeText={setLocationInput}
            />
          ) : (
            <Text style={styles.location}>{profile.location}</Text>
          )}
          <TouchableOpacity 
            style={styles.editSmallButton} 
            onPress={() => setIsEditingLocation(!isEditingLocation)}
          >
            <Text style={styles.editSmallButtonText}>{isEditingLocation ? 'Done' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* About Me section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        {isEditingBio ? (
          <TextInput
            style={styles.input}
            multiline
            value={bioInput}
            onChangeText={setBioInput}
          />
        ) : (
          <Text style={styles.bio}>{profile.bio}</Text>
        )}
        <TouchableOpacity onPress={() => setIsEditingBio(!isEditingBio)}>
          <Text style={styles.editText}>{isEditingBio ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      {/* Interests section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        {isEditingInterests ? (
          <TextInput
            style={styles.input}
            value={interestsInput}
            onChangeText={setInterestsInput}
            placeholder="Separate interests with commas"
          />
        ) : (
          <View style={styles.interestsContainer}>
            {profile.interests.map((interest, index) => (
              <View key={index} style={styles.interestBadge}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity onPress={() => setIsEditingInterests(!isEditingInterests)}>
          <Text style={styles.editText}>{isEditingInterests ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save All Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 150, height: 150, borderRadius: 75, marginBottom: 10 },
  imageInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 6,
    fontSize: 14,
    color: '#333',
    width: '80%',
    marginBottom: 5,
  },
  inlineEdit: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  name: { fontSize: 24, fontWeight: 'bold' },
  location: { fontSize: 16, color: '#777' },
  nameInput: { fontSize: 24, fontWeight: 'bold', borderBottomWidth: 1, borderColor: '#ccc', flex: 1 },
  locationInput: { fontSize: 16, color: '#333', borderBottomWidth: 1, borderColor: '#ccc', flex: 1 },
  editSmallButton: { marginLeft: 10, backgroundColor: '#3498db', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  editSmallButtonText: { color: '#fff', fontSize: 12 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  bio: { fontSize: 16, lineHeight: 22, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, color: '#333', minHeight: 40 },
  editText: { color: '#3498db', marginTop: 5, fontWeight: 'bold' },
  interestsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  interestBadge: { backgroundColor: '#f1c40f', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 10, marginBottom: 10 },
  interestText: { fontSize: 14, color: '#fff' },
  saveButton: { backgroundColor: '#2ecc71', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  logoutButton: { backgroundColor: '#e74c3c', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ProfileScreen;
