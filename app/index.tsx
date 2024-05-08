import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Page = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);
  return (
    <View style={styles.container}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          style={styles.video}
          source={{ uri: assets[0].uri }}
        />
      )}
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>Ready to change the way you money?</Text>
      </View>
      <View style={styles.buttons}>
        <Link
          href="/login"
          style={[
            defaultStyles.pillButton,
            {
              flex: 1,
              backgroundColor: Colors.dark,
            },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href="/signup"
          style={[
            defaultStyles.pillButton,
            {
              flex: 1,
              backgroundColor: "#fff",
            },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#fff",
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  signupText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Page;
