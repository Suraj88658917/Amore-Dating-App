import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const sampleProfiles = [
  { id: "1", name: "Aarohi, 23", location: "Mumbai", image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80" },
  { id: "2", name: "Riya, 25", location: "Delhi", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80" },
  { id: "3", name: "Meera, 27", location: "Bangalore", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80" },
  { id: "4", name: "Arjun, 26", location: "Hyderabad", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" },
  { id: "5", name: "Kavya, 24", location: "Chennai", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80" },
  { id: "6", name: "Aditya, 27", location: "Pune", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80" },
  { id: "7", name: "Ishita, 23", location: "Kolkata", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80" },
  { id: "8", name: "Dev, 28", location: "Jaipur", image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=80" },
  { id: "9", name: "Naina, 21", location: "Lucknow", image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=800&q=80" },
  { id: "10", name: "Saanvi, 22", location: "Nagpur", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80" },
  { id: "11", name: "Rohan, 26", location: "Indore", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80" },
  { id: "12", name: "Anaya, 24", location: "Bhubaneswar", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80" },
  { id: "13", name: "Kabir, 27", location: "Surat", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" },
  { id: "14", name: "Tanvi, 23", location: "Patna", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80" },
  { id: "15", name: "Yash, 28", location: "Kanpur", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80" },
  { id: "16", name: "Mira, 25", location: "Rajkot", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80" },
  { id: "17", name: "Vivaan, 29", location: "Ahmedabad", image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=80" },
  { id: "18", name: "Ira, 22", location: "Surat", image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=800&q=80" },
  { id: "19", name: "Kabir, 24", location: "Agra", image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80" },
  { id: "20", name: "Diya, 23", location: "Bhopal", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80" },
  { id: "21", name: "Aryan, 27", location: "Amritsar", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80" },
  { id: "22", name: "Tara, 24", location: "Kochi", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" },
  { id: "23", name: "Neil, 28", location: "Vadodara", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80" },
  { id: "24", name: "Sia, 22", location: "Coimbatore", image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=80" },
  { id: "25", name: "Raghav, 26", location: "Mysore", image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=800&q=80" },
  { id: "26", name: "Inaaya, 25", location: "Thane", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80" },
  { id: "27", name: "Kiaan, 27", location: "Gurgaon", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80" },
];


const HomeScreen = () => {
  const [profiles, setProfiles] = useState(sampleProfiles);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Amore</Text>
        <Pressable style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={22} color="white" />
        </Pressable>
      </View>

      {/* Profiles */}
      {profiles.map((profile) => (
        <View key={profile.id} style={styles.card}>
          <Image source={{ uri: profile.image }} style={styles.image} />
          <View style={styles.infoBox}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.location}>{profile.location}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable
              style={[styles.circleBtn, { backgroundColor: "#ff4d4d" }]}
            >
              <Ionicons name="close" size={28} color="white" />
            </Pressable>
            <Pressable
              style={[styles.circleBtn, { backgroundColor: "#4cd964" }]}
            >
              <Ionicons name="heart" size={28} color="white" />
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#900C3F",
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  logoutBtn: {
    backgroundColor: "#D81B60",
    padding: 8,
    borderRadius: 20,
  },
  card: {
    margin: 15,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 400,
  },
  infoBox: {
    padding: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  location: {
    fontSize: 15,
    color: "#555",
    marginTop: 3,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    paddingVertical: 15,
  },
  circleBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
