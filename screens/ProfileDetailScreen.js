import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Dimensions, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ViewProfile from '../components/ViewProfile';

const { width } = Dimensions.get('window');

const ProfileDetailScreen = () => {
  const [index, setIndex] = useState(0); // 0 = Edit, 1 = View
  const route = useRoute();
  const userInfo = route?.params?.userInfo;

  const EditProfile = () => {
    return (
      <View style={styles.tabContent}>
        <Text>Edit Profile Form Goes Here</Text>
      </View>
    );
  };

  const renderScene = () => {
    switch (index) {
      case 0:
        return <EditProfile />;
      case 1:
        return <ViewProfile userInfo={userInfo} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{userInfo?.firstName}</Text>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tabButton, index === 0 && styles.activeTab]}
          onPress={() => setIndex(0)}
        >
          <Text style={[styles.tabText, index === 0 && styles.activeTabText]}>Edit</Text>
        </Pressable>
        <Pressable
          style={[styles.tabButton, index === 1 && styles.activeTab]}
          onPress={() => setIndex(1)}
        >
          <Text style={[styles.tabText, index === 1 && styles.activeTabText]}>View</Text>
        </Pressable>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.sceneContainer}>{renderScene()}</ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { padding: 20 },
  name: { fontSize: 17, fontWeight: '500', textAlign: 'center' },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E0E0E0' },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    backgroundColor: 'white',
  },
  tabText: { fontWeight: 'bold', color: 'gray' },
  activeTabText: { color: 'black' },
  sceneContainer: { flex: 1, padding: 10 },
  tabContent: { padding: 10 },
});
