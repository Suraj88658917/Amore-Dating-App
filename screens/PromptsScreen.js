import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
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
    navigation.navigate("PreFinal");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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
              onPress={() =>
                navigation.navigate('ShowPromptsScreen', { prompts, index, setPrompts })
              }
              style={styles.promptBox}
              key={index}
            >
              {item?.question && item?.answer ? (
                <>
                  <Text style={styles.promptText}>{item?.question}</Text>
                  <Text style={styles.promptText}>{item?.answer}</Text>
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
          <Ionicons name="chevron-forward-circle-outline" size={45} color="#581845" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PromptsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  content: {
    marginTop: 80,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
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
    fontFamily: 'GeezaPro-Bold',
    marginTop: 15,
  },
  promptsContainer: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 20,
  },
  promptBox: {
    borderColor: '#707070',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 70,
  },
  promptText: {
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: 15,
    textAlign: 'center',
  },
  placeholderText: {
    color: 'gray',
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 3,
  },
  nextButton: {
    marginTop: 30,
    marginLeft: 'auto',
  },
});
