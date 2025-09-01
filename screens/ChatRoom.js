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

  // Setup header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{route?.params?.name}</Text>
        </View>
      ),
      headerRight: () => <Ionicons name="videocam-outline" size={24} color="black" />,
    });
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = { senderId: userId, message };
    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 60 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((item, index) => (
            <View
              key={index}
              style={[
                item.senderId === userId ? styles.senderMessage : styles.receiverMessage,
              ]}
            >
              <Text style={item.senderId === userId ? styles.senderText : styles.receiverText}>
                {item.message}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="gray"
            style={styles.input}
          />
          <Pressable onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#5b0d63',
    padding: 10,
    maxWidth: '60%',
    borderRadius: 7,
    margin: 10,
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e3e3',
    padding: 10,
    maxWidth: '60%',
    borderRadius: 7,
    margin: 10,
  },
  senderText: { fontSize: 15, color: 'white', letterSpacing: 0.3 },
  receiverText: { fontSize: 15, color: 'black', letterSpacing: 0.3 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 50,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    marginBottom: 60,
    gap: 10,
  },
  input: {
    flex: 1,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: '#662d91',
    paddingVertical: 8,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  sendButtonText: { color: 'white', textAlign: 'center' },
});
