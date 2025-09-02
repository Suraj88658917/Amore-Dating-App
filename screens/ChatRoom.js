import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../AuthContext';

const ChatRoom = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = useContext(AuthContext);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { senderId: '1', message: 'Hey there!' },
    { senderId: '2', message: 'Hello! How are you?' },
    { senderId: '1', message: 'I am good, thanks!' },
  ]);

  const scrollRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {route?.params?.name}
          </Text>
        </View>
      ),
      headerRight: () => <Ionicons name="videocam-outline" size={24} color="black" />,
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessage = { senderId: userId, message };
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 20, paddingHorizontal: 10 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((item, index) => (
            <View
              key={index}
              style={[
                item.senderId === userId ? styles.senderMessage : styles.receiverMessage,
              ]}
            >
              <Text
                style={item.senderId === userId ? styles.senderText : styles.receiverText}
              >
                {item.message}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            style={styles.input}
          />
          <Pressable style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={22} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5', // soft pink background for dating app feel
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#900C3F',
    padding: 12,
    maxWidth: '70%',
    borderRadius: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffe6f0',
    padding: 12,
    maxWidth: '70%',
    borderRadius: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  senderText: {
    fontSize: 16,
    color: 'white',
    letterSpacing: 0.3,
  },
  receiverText: {
    fontSize: 16,
    color: '#5a0763',
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 62,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#900C3F',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
