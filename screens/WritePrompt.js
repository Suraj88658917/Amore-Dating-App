import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Pressable,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const WritePrompt = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const question = route?.params?.question;
  const { index, prompts } = route?.params;
  const [answer, setAnswer] = useState(prompts[index]?.answer || '');

  const handleDone = () => {
    const updatedPrompts = [...prompts];
    updatedPrompts[index] = { question, answer };
    navigation.replace('Prompts', { updatedPrompts });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons
            name="chevron-back-outline"
            size={25}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Write Answer</Text>
        </View>
        <Pressable onPress={handleDone}>
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      </View>

      {/* Question & Answer Input */}
      <View style={styles.content}>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{question}</Text>
        </View>

        <View style={styles.answerBox}>
          <TextInput
            multiline
            placeholder="Enter your answer"
            value={answer}
            onChangeText={text => setAnswer(text)}
            style={styles.textInput}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WritePrompt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0.5,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  doneText: {
    fontSize: 15,
    color: '#5a0763',
    fontWeight: '500',
  },
  content: {
    padding: 12,
  },
  questionBox: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 5,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  answerBox: {
    padding: 10,
    borderRadius: 10,
    height: 100,
    marginTop: 15,
    backgroundColor: '#f8f8f8',
  },
  textInput: {
    fontSize: 17,
    flex: 1,
    textAlignVertical: 'top',
  },
});
