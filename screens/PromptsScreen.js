import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveRegistrationProgress } from '../utils/registrationUtils';

const PromptsScreen = () => {
  const [prompts, setPrompts] = useState([
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
  ]);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (route?.params?.updatedPrompts) {
      setPrompts(route?.params?.updatedPrompts);
    }
  }, [route.params]);

  const handleNext = () => {
    saveRegistrationProgress('Prompts', { prompts });
    navigation.navigate('PreFinal');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <AntDesign name="eye" size={23} color="black" />
          </View>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>

        <Text style={styles.title}>Write your profile answers</Text>

        <View style={styles.promptsContainer}>
          {prompts.map((item, index) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate('ShowPromptsScreen', { prompts, index, setPrompts })
              }
              style={[
                styles.promptBox,
                item?.question && item?.answer ? styles.promptFilled : styles.promptEmpty,
              ]}
            >
              {item?.question && item?.answer ? (
                <>
                  <Text style={styles.promptText}>{item.question}</Text>
                  <Text style={styles.promptText}>{item.answer}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.placeholderText}>Select a Prompt</Text>
                  <Text style={styles.placeholderText}>And Write your own answer</Text>
                </>
              )}
            </Pressable>
          ))}
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Ionicons name="chevron-forward-circle-outline" size={55} color="#ff3f6c" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PromptsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffe4e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  logo: {
    width: 100,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ff3f6c',
    marginBottom: 25,
  },
  promptsContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  promptBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  promptEmpty: {
    borderWidth: 2,
    borderColor: '#ff3f6c',
    backgroundColor: '#fff0f5',
  },
  promptFilled: {
    borderWidth: 0,
    backgroundColor: '#ffe4e1',
  },
  promptText: {
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
  },
  placeholderText: {
    color: 'gray',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    alignSelf: 'flex-end',
  },
});
