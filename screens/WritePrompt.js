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
            size={28}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Write Answer</Text>
        </View>
        <Pressable style={styles.doneButton} onPress={handleDone}>
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
            placeholderTextColor="#999"
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
    backgroundColor: '#fff0f5',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#900C3F',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  doneButton: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  doneText: {
    fontSize: 14,
    color: '#900C3F',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  questionBox: {
    backgroundColor: '#ffe6f0',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5a0763',
  },
  answerBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    minHeight: 120,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    textAlignVertical: 'top',
    color: '#202020',
  },
});
