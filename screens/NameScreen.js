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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('EmailScreen'); // Next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.note}>NO BACKGROUND CHECKS ARE CONDUCTED</Text>

      <View style={styles.header}>
        <View style={styles.icon}>
          <Ionicons name="newspaper-outline" size={26} color="black" />
        </View>
        <Image
          style={styles.logo}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png' }}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>What's your name?</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name (required)"
          placeholderTextColor="#BEBEBE"
          autoFocus
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          placeholderTextColor="#BEBEBE"
        />
        <Text style={styles.optional}>Last name is optional</Text>
      </View>

      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Ionicons name="chevron-forward-circle-outline" size={45} color="#581845" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eaf2ebff', paddingTop: Platform.OS === 'android' ? 35 : 0 },
  note: { marginTop: 50, textAlign: 'center', color: 'gray' },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 30, marginHorizontal: 20, gap: 10 },
  icon: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center' },
  logo: { width: 100, height: 40 },
  form: { marginTop: 30, marginHorizontal: 20 },
  title: { fontSize: 25, fontWeight: 'bold' },
  input: { width: '100%', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'black', fontSize: 22, paddingBottom: 10 },
  optional: { fontSize: 15, color: 'gray', fontWeight: '500' },
  nextBtn: { marginTop: 30, marginLeft: 'auto', marginRight: 20 },
});
