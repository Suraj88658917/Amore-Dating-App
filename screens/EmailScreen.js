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
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EmailScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    if (email.trim() !== '') {
      navigation.navigate('PasswordScreen', { email });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Fontisto name="email" size={26} color="black" />
        </View>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
          }}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Provide your email</Text>
        <Text style={styles.subtitle}>
          Email verification helps us keep your account secure
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          autoFocus
          placeholder="Enter your email"
          placeholderTextColor="#BEBEBE"
          style={styles.input}
        />

        <Text style={styles.note}>
          Note: You will be asked to verify your email
        </Text>
      </View>

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

export default EmailScreen;

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
