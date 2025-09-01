import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const PasswordScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const email = route.params?.email;
  const [password, setPassword] = useState('');

  const handleNext = () => {
    if (password.trim() !== '') {
      console.log('Email:', email, 'Password:', password);
      // Navigate to verification code screen and pass email & password
      navigation.navigate('VerificationCode', {
        email,
        password,
      });
    } else {
      alert('Please enter a password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="lock-outline" size={26} color="black" />
        </View>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
          }}
        />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.title}>Set your password</Text>
        <Text style={styles.subtitle}>
          Keep your account safe by choosing a strong password
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          placeholderTextColor="#BEBEBE"
          style={styles.input}
        />

        <Text style={styles.note}>Note: Your password will be kept secure</Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Ionicons
          name="chevron-forward-circle-outline"
          size={45}
          color="#581845"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
    marginHorizontal: 20,
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
  logo: { width: 100, height: 40 },
  form: { marginTop: 30, marginHorizontal: 20 },
  title: { fontSize: 25, fontWeight: 'bold' },
  subtitle: { marginTop: 10, fontSize: 15, color: 'gray' },
  input: {
    width: '100%',
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontSize: 22,
    paddingBottom: 10,
  },
  note: { color: 'gray', marginTop: 7, fontSize: 15 },
  nextBtn: { marginTop: 30, marginLeft: 'auto', marginRight: 20 },
});
