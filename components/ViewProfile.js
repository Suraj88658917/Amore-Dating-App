import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons';

const ViewProfile = ({ userInfo }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{userInfo?.firstName}</Text>
            <View style={styles.newBadge}>
              <Text style={styles.newText}>new here</Text>
            </View>
          </View>
          <Entypo name="dots-three-horizontal" size={22} color="black" />
        </View>

        {/* Main Image */}
        {userInfo?.imageUrls?.length > 0 && (
          <View style={{ marginVertical: 15 }}>
            <Image
              source={{ uri: userInfo?.imageUrls[0] }}
              style={styles.mainImage}
            />
            <Pressable style={styles.imageButton}>
              <Image
                style={styles.iconImage}
                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2724/2724657.png' }}
              />
            </Pressable>
          </View>
        )}

        {/* Prompts */}
        {userInfo?.prompts?.slice(0, 1).map((prompt, index) => (
          <View key={prompt.id} style={styles.promptCard}>
            <Text style={styles.promptQuestion}>{prompt.question}</Text>
            <Text style={styles.promptAnswer}>{prompt.answer}</Text>
            <Pressable style={styles.promptButton}>
              <Image
                style={styles.iconImage}
                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2724/2724657.png' }}
              />
            </Pressable>
          </View>
        ))}

        {/* Info Row */}
        <View style={styles.infoCard}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>{userInfo?.dateOfBirth}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="person-outline" size={22} color="black" />
              <Text style={styles.infoText}>{userInfo?.gender}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="magnet-outline" size={22} color="black" />
              <Text style={styles.infoText}>{userInfo?.type}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>{userInfo?.hometown}</Text>
            </View>
          </ScrollView>

          {/* Job, Workplace, Religion, Location, etc. */}
          <View style={styles.infoRow}>
            <Ionicons name="bag-outline" size={20} color="black" />
            <Text>{userInfo?.jobTitle}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="locate-outline" size={20} color="black" />
            <Text>{userInfo?.workPlace}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="book-outline" size={22} color="black" />
            <Text>Hindu</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="home-outline" size={20} color="black" />
            <Text>{userInfo?.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="search-outline" size={20} color="black" />
            <Text>{userInfo?.lookingFor}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="heart-outline" size={20} color="black" />
            <Text>Monogamy</Text>
          </View>
        </View>

        {/* Remaining Images */}
        {userInfo?.imageUrls?.slice(1).map((item, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            <Image
              source={{ uri: item }}
              style={styles.mainImage}
            />
            <Pressable style={styles.imageButton}>
              <Image
                style={styles.iconImage}
                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2724/2724657.png' }}
              />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  name: { fontSize: 22, fontWeight: 'bold' },
  newBadge: { backgroundColor: '#452c63', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  newText: { color: 'white', textAlign: 'center' },
  mainImage: { width: '100%', height: 350, borderRadius: 10, resizeMode: 'cover' },
  imageButton: { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'white', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  iconImage: { width: 30, height: 30, resizeMode: 'contain' },
  promptCard: { backgroundColor: 'white', padding: 12, borderRadius: 10, height: 150, justifyContent: 'center', marginVertical: 15 },
  promptQuestion: { fontSize: 15, fontWeight: '500' },
  promptAnswer: { fontSize: 24, fontWeight: 'bold', marginTop: 20, lineHeight: 30 },
  promptButton: { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'white', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  infoCard: { backgroundColor: 'white', padding: 10, borderRadius: 8 },
  infoItem: { flexDirection: 'row', alignItems: 'center', marginRight: 20, gap: 10 },
  infoText: { fontSize: 15 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 15, borderBottomWidth: 0.7, borderBottomColor: '#E0E0E0', paddingBottom: 10 },
});
