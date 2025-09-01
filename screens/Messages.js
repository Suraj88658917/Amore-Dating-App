import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import UserChat from '../components/UserChat';

const ChatScreen = () => {
  const { userId } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categorizedChats, setCategorizedChats] = useState({
    yourTurn: [],
    theirTurn: [],
  });

  // Simulate fetching matches
  useEffect(() => {
    const sampleMatches = [
       { userId: '1', firstName: 'Alice', lastMessage: 'Hey there!', image: require('../assets/13.jpeg') },
      { userId: '2', firstName: 'Bob', lastMessage: 'How are you?', image: require('../assets/9.jpeg') },
      { userId: '3', firstName: 'Charlie', lastMessage: 'Nice profile!', image: require('../assets/8.jpeg') },
      { userId: '4', firstName: 'Riya', lastMessage: 'Hey there!', image: require('../assets/15.jpeg') },
      { userId: '5', firstName: 'Sam', lastMessage: 'How are you?', image: require('../assets/11.jpeg') },
      { userId: '6', firstName: 'Tony', lastMessage: 'Nice profile!', image: require('../assets/10.jpeg') },
      { userId: '7', firstName: 'Shiv', lastMessage: 'Hey there!', image: require('../assets/7.jpeg') },
      { userId: '8', firstName: 'Pinke', lastMessage: 'How are you?', image: require('../assets/16.jpeg') },
      { userId: '9', firstName: 'Priya', lastMessage: 'Nice profile!', image: require('../assets/12.jpeg') },
      { userId: '10', firstName: 'Dora', lastMessage: 'Hey there!', image: require('../assets/15.jpeg') },
      { userId: '11', firstName: 'Rohit', lastMessage: 'How are you?', image: require('../assets/10.jpeg') },
      { userId: '12', firstName: 'Samantha', lastMessage: 'Nice profile!', image: require('../assets/12.jpeg') },
      { userId: '13', firstName: 'Alice', lastMessage: 'Hey there!', image: require('../assets/10.jpeg') },
      { userId: '14', firstName: 'Charlie', lastMessage: 'How are you?', image: require('../assets/11.jpeg') },
      { userId: '15', firstName: 'Rube', lastMessage: 'Nice profile!', image: require('../assets/15.jpeg') },
    ];
    setMatches(sampleMatches);
    setIsLoading(false);

    // Categorize chats: simulate alternating turns
    const yourTurn = sampleMatches.filter((_, index) => index % 2 === 0);
    const theirTurn = sampleMatches.filter((_, index) => index % 2 !== 0);
    setCategorizedChats({ yourTurn, theirTurn });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 18 }}>Loading Chats...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ marginTop: 55 }}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: 'white',
        justifyContent: matches?.length > 0 ? 'flex-start' : 'center',
      }}
    >
      <View style={{ marginVertical: 12, marginHorizontal: 15 }}>
        {matches?.length > 0 ? (
          <>
            <Text style={styles.heading}>Messages</Text>

            {categorizedChats.theirTurn.length > 0 && (
              <>
                <Text style={styles.heading}>Their Turn</Text>
                {categorizedChats.theirTurn.map((item, index) => (
                  <UserChat key={index} item={item} userId={userId} />
                ))}
              </>
            )}

            {categorizedChats.yourTurn.length > 0 && (
              <>
                <Text style={styles.heading}>Your Turn</Text>
                {categorizedChats.yourTurn.map((item, index) => (
                  <UserChat key={index} item={item} userId={userId} />
                ))}
              </>
            )}
          </>
        ) : (
          <View style={styles.noMatchesContainer}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require('../assets/3.png')}
            />
            <View style={{ marginTop: 50 }}>
              <Text style={styles.noMatchesText}>No Matches right now</Text>
              <Text style={styles.noMatchesSubText}>
                Matches are more considered on Hinge. We can help improve your chances
              </Text>
            </View>

            <View style={{ marginTop: 50 }} />

            <Pressable style={styles.boostButton}>
              <Text style={styles.boostButtonText}>Boost Your Profile</Text>
            </Pressable>

            <Pressable style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>Upgrade to HingeX</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  noMatchesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMatchesText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noMatchesSubText: {
    color: 'gray',
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  boostButton: {
    padding: 12,
    borderRadius: 22,
    backgroundColor: '#0a7064',
    width: 250,
    marginTop: 50,
  },
  boostButtonText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
    color: 'white',
  },
  upgradeButton: {
    padding: 12,
    borderRadius: 22,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginTop: 15,
    width: 250,
  },
  upgradeButtonText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
  },
});
