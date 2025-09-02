import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const ShowPromptsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [option, setOption] = useState('About me');

  const promptss = [
    {
      id: '0',
      name: 'About me',
      questions: [
        { id: '10', question: 'A random fact I love is' },
        { id: '11', question: 'Typical Sunday' },
        { id: '12', question: 'I go crazy for' },
        { id: '13', question: 'Unusual Skills' },
        { id: '14', question: 'My greatest strength' },
        { id: '15', question: 'My simple pleasures' },
        { id: '16', question: 'A life goal of mine' },
        { id: '17', question: 'My most irrational fear' },
        { id: '18', question: 'I am convinced that' },
        { id: '19', question: 'The way to win me over is' },
      ],
    },
    {
      id: '2',
      name: 'Self Care',
      questions: [
        { id: '10', question: 'I unwind by' },
        { id: '11', question: 'A boundary of mine is' },
        { id: '12', question: 'I feel most supported when' },
        { id: '13', question: 'I hype myself up by' },
        { id: '14', question: 'To me, relaxation is' },
        { id: '15', question: 'I beat my blues by' },
        { id: '16', question: 'My skin care routine' },
      ],
    },
    {
      id: '3',
      name: 'Getting Personal',
      questions: [
        { id: '10', question: 'I geek out on' },
        { id: '11', question: 'If loving this is wrong, I don’t want to be right' },
        { id: '12', question: 'The key to my heart is' },
        { id: '13', question: 'What if I told you that' },
        { id: '14', question: 'Don’t hate me if I' },
        { id: '15', question: 'I won’t shut up about' },
        { id: '16', question: 'My Love Language is' },
        { id: '17', question: 'The one thing you should know about me is' },
      ],
    },
    {
      id: '13',
      name: "Let's chat about",
      questions: [
        { id: '10', question: 'I bet you can’t' },
        { id: '11', question: 'You should leave a comment if' },
        { id: '12', question: 'I will pick the topic if you start the conversation' },
        { id: '13', question: 'Try to guess this about me' },
        { id: '14', question: 'Do you agree or disagree that' },
        { id: '15', question: 'Give me travel tips for' },
        { id: '16', question: 'Teach me something about' },
      ],
    },
    {
      id: '4',
      name: 'Date Vibes',
      questions: [
        { id: '10', question: 'Together we could' },
        { id: '11', question: 'I know the best spot in town for' },
        { id: '12', question: 'First round is on me if' },
        { id: '13', question: 'The best way to ask me out is by' },
        { id: '14', question: 'What I order for the table' },
      ],
    },
    {
      id: '34',
      name: 'My type',
      questions: [
        { id: '10', question: 'I would fall for you if' },
        { id: '11', question: 'We are the same type of weird if' },
        { id: '12', question: 'Green flags I look out for' },
        { id: '13', question: 'I am weirdly attracted to' },
        { id: '14', question: 'I want someone who' },
        { id: '16', question: 'All I ask is that you' },
        { id: '17', question: 'I am looking for' },
        { id: '18', question: 'We will get along if' },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.viewAll}>View All</Text>
          <Text style={styles.title}>Prompts</Text>
        </View>

        {/* Horizontal Categories */}
        <View style={styles.horizontalScrollWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {promptss.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setOption(item.name)}
                style={[
                  styles.optionButton,
                  { backgroundColor: option === item.name ? '#ff3f6c' : 'white' },
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: option === item.name ? 'white' : '#202020' },
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Questions */}
        <View style={styles.questionsWrapper}>
          {promptss.map(
            (item) =>
              option === item.name &&
              item.questions.map((question, idx) => (
                <View key={idx}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('WritePrompt', {
                        question: question.question,
                        prompts: route?.params?.prompts,
                        setPrompts: route?.params?.setPrompts,
                        index: route?.params?.index,
                      })
                    }
                    style={styles.questionBox}
                  >
                    <Text style={styles.questionText}>{question.question}</Text>
                  </Pressable>
                </View>
              ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowPromptsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5', // soft pastel background
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAll: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ff3f6c',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff3f6c',
  },
  horizontalScrollWrapper: {
    paddingLeft: 15,
    marginTop: 10,
    flexDirection: 'row',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ff3f6c',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  questionsWrapper: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  questionBox: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#ffe4e1',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#202020',
  },
});
