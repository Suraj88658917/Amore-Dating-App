import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import MaterialDesignIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';

const LikesScreen = () => {
  const navigation = useNavigation();
  const { userId } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState([]);
  const [userInfo, setUserInfo] = useState({ subscriptions: [] });

  const screenWidth = Dimensions.get('window').width;
  const profileWidth = (screenWidth - 46) / 2;

  // Simulate fetching likes
  const fetchReceivedLikes = useCallback(() => {
    const sampleLikes = [
      {
        userId: { firstName: 'Alice', imageUrls: [require('../assets/13.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'Rabana', imageUrls: [require('../assets/14.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'Charlie', imageUrls: [require('../assets/8.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'Riya', imageUrls: [require('../assets/15.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'Bob', imageUrls: [require('../assets/9.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'pooja', imageUrls: [require('../assets/16.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'Rohit', imageUrls: [require('../assets/10.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'Dora', imageUrls: [require('../assets/15.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'Sam', imageUrls: [require('../assets/11.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'Pinke', imageUrls: [require('../assets/16.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'priya', imageUrls: [require('../assets/12.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'Tony', imageUrls: [require('../assets/10.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'Shiv', imageUrls: [require('../assets/7.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'Priya', imageUrls: [require('../assets/12.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'Charlie', imageUrls: [require('../assets/8.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'cathane', imageUrls: [require('../assets/13.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'Bob', imageUrls: [require('../assets/9.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'bonta', imageUrls: [require('../assets/14.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'Alice', imageUrls: [require('../assets/10.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'samantha', imageUrls: [require('../assets/14.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'Charlie', imageUrls: [require('../assets/11.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'Alice', imageUrls: [require('../assets/13.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'Rabana', imageUrls: [require('../assets/14.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'Charlie', imageUrls: [require('../assets/8.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'Riya', imageUrls: [require('../assets/15.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'Bob', imageUrls: [require('../assets/9.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'pooja', imageUrls: [require('../assets/16.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'Rohit', imageUrls: [require('../assets/10.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'Dora', imageUrls: [require('../assets/15.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'Sam', imageUrls: [require('../assets/11.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'Pinke', imageUrls: [require('../assets/16.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'priya', imageUrls: [require('../assets/12.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'Tony', imageUrls: [require('../assets/10.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'Shiv', imageUrls: [require('../assets/7.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'Priya', imageUrls: [require('../assets/12.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'Charlie', imageUrls: [require('../assets/8.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'cathane', imageUrls: [require('../assets/13.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'Bob', imageUrls: [require('../assets/9.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'bonta', imageUrls: [require('../assets/14.jpeg')], prompts: [] },
        type: 'image',
      },
       {
        userId: { firstName: 'Alice', imageUrls: [require('../assets/10.jpeg')], prompts: [] },
        comment: 'Nice profile!',
        type: 'image',
      },
      {
        userId: { firstName: 'samantha', imageUrls: [require('../assets/14.jpeg')], prompts: [] },
        type: 'prompt',
      },
      {
        userId: { firstName: 'Charlie', imageUrls: [require('../assets/11.jpeg')], prompts: [] },
        type: 'image',
      },
    ];

    setLikes(sampleLikes);
    setUserInfo({ subscriptions: [{ status: 'active' }] }); // simulate active subscription
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchReceivedLikes();
  }, [fetchReceivedLikes]);

  const activeSubscription = userInfo.subscriptions?.some(item => item.status === 'active');

  const renderProfile = ({ item: like }) => (
    <Pressable
      disabled={!activeSubscription}
      style={{
        width: profileWidth,
        marginVertical: 10,
        backgroundColor: 'white',
        borderColor: '#da0808ff',
        borderWidth: 0.5,
        borderRadius: 8,
      }}
    >
      <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
        {like.comment ? (
          <View
            style={{
              alignItems: 'flex-start',
              backgroundColor: '#75f677ff',
              borderRadius: 5,
              marginBottom: 8,
              alignSelf: 'flex-start',
              maxWidth: profileWidth - 20,
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
          >
            <Text numberOfLines={1} ellipsizeMode="tail">{like.comment}</Text>
          </View>
        ) : (
          <View
            style={{
              alignItems: 'flex-start',
              paddingVertical: 10,
              borderRadius: 5,
              marginBottom: 8,
              alignSelf: 'flex-start',
            }}
          >
            <Text style={{ fontStyle: 'italic' }}>Liked your photo</Text>
          </View>
        )}

        <Text style={{ fontSize: 17, fontWeight: '500', marginBottom: 10 }}>
          {like.userId.firstName}
        </Text>
      </View>

      <View>
        <Image
          blurRadius={activeSubscription ? 0 : 20}
          style={{
            height: 220,
            width: profileWidth,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
          source={like.userId.imageUrls[0]}
        />
      </View>
    </Pressable>
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8F8' }}>
        <Text style={{ fontSize: 18 }}>Loading Likes...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#50b8f9ff',
          justifyContent: likes?.length > 0 ? 'flex-start' : 'center',
          padding: 15,
        }}
      >
        {likes?.length > 0 ? (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 23, fontWeight: 'bold', marginTop: 30 }}>Likes You</Text>
              <Pressable style={{ backgroundColor: '#008B8B', padding: 10, borderRadius: 30, marginTop: 30 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Boost</Text>
              </Pressable>
            </View>

            <Pressable
              style={{
                marginTop: 13,
                borderColor: '#E0E0E0',
                borderWidth: 1,
                alignSelf: 'flex-start',
                flexDirection: 'row',
                gap: 6,
                alignItems: 'center',
                paddingVertical: 7,
                paddingHorizontal: 10,
                borderRadius: 24,
              }}
            >
              <Text style={{ color: '#404040', fontWeight: '500' }}>Recent</Text>
              <MaterialDesignIcons name="chevron-down" size={22} color="gray" />
            </Pressable>

            <FlatList
              data={likes}
              renderItem={renderProfile}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>You're new, no likes yet</Text>
            <Text style={{ color: 'gray', marginTop: 10, fontSize: 15, textAlign: 'center' }}>
              We can help you get your first one sooner
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({});
