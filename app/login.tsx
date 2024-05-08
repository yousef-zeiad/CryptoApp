import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import CountryPicker from "@/components/CountryPicker/CountryPicker";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Page = () => {
  const [countryCode, setCountryCode] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const router = useRouter();
  const { signIn } = useSignIn();
  const keyboadVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const onLogin = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        console.log("fullPhoneNumber", fullPhoneNumber);
        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });
        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor) => factor.strategy === "phone_code"
        );
        const { phoneNumberId } = firstPhoneFactor;
        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        router.push({
          pathname: "/verify/[phone]",
          params: {
            phone: fullPhoneNumber,
            signin: "true",
          },
        });
      } catch (error) {
        console.log("error", JSON.stringify(error, null, 2));
        if (isClerkAPIResponseError(error)) {
          if (error.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", error.errors[0].message);
          }
        }
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboadVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome Back</Text>
        <Text style={defaultStyles.descriptionText}>
          Sign up to get started with your account
        </Text>
        <View style={styles.inputContainer}>
          <CountryPicker
            onSelect={(country) => setCountryCode(country.callingCode![0])}
          />
          <TextInput
            placeholder="Mobile number"
            style={[
              styles.input,
              {
                flex: 1,
              },
            ]}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== "" && countryCode !== ""
              ? styles.enabledButton
              : styles.disabledButton,
            {
              marginBottom: 40,
            },
          ]}
          onPress={() => onLogin(SignInType.Phone)}
          activeOpacity={0.7}
        >
          <Text style={defaultStyles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => onLogin(SignInType.Email)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="mail" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onLogin(SignInType.Google)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="logo-google" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onLogin(SignInType.Apple)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="logo-apple" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginVertical: 40,
  },
  input: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: Colors.lightGray,
    fontSize: 20,
    marginRight: 10,
  },
  enabledButton: {
    backgroundColor: Colors.primary,
  },
  disabledButton: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default Page;
