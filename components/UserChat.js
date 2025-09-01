import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';

const UserChat = ({ item, userId }) => {
  const [lastMessage, setLastMessage] = useState(null);
  const navigation = useNavigation();

  // Simulate fetching messages with mock data
  useEffect(() => {
    const sampleMessages = [
      { message: 'Hey there!', senderId: item.userId },
      { message: 'How are you?', senderId: userId },
    ];
    setLastMessage(sampleMessages[sampleMessages.length - 1]);
  }, []);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatRoom', {
          image: item?.image, // local image
          name: item?.firstName,
          receiverId: item?.userId,
          senderId: userId,
        })
      }
      style={styles.container}
    >
      <View>
        <Image
          style={styles.avatar}
          source={item?.image} // using local image from props
        />
      </View>

      <View>
        <Text style={styles.name}>{item?.firstName}</Text>
        <Text style={styles.message}>
          {lastMessage
            ? lastMessage?.message
            : `Start Chat with ${item?.firstName}`}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'GeezaPro-Bold',
  },
  message: {
    fontWeight: '500',
    fontSize: 15,
    marginTop: 6,
  },
});
