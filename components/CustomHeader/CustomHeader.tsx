import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
export default function CustomHeader() {
  const { top } = useSafeAreaInsets();
  return (
    <BlurView intensity={80} tint={"light"} style={{ paddingTop: top }}>
      <View style={styles.container}>
        <Link href="/(auth)/(modals)/account" asChild>
          <TouchableOpacity style={styles.roundBtn}>
            <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
              YZ
            </Text>
          </TouchableOpacity>
        </Link>
        <View style={styles.searchSection}>
          <Ionicons
            name="search"
            size={20}
            color={Colors.dark}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            style={styles.input}
            placeholderTextColor={Colors.dark}
          />
        </View>
        <View style={styles.circle}>
          <Ionicons name="stats-chart" size={24} color={Colors.dark} />
        </View>
        <View style={styles.circle}>
          <Ionicons name="card" size={24} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: Colors.dark,
  },
  searchIcon: {
    padding: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
