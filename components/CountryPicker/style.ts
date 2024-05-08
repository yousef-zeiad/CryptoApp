import Colors from "@/constants/Colors";
import { scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const styles = (disabled: boolean) =>
  StyleSheet.create({
    flagButtonStyle: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      borderRadius: 16,
      backgroundColor: Colors.lightGray,
      fontSize: 20,
      marginRight: 10,
    },
    flagButtonText: { color: Colors.gray, fontSize: 20 },
    flagButtonTextDisabled: { color: Colors.lightGray },
    arrowDownStyle: {
      tintColor: Colors.gray,
      marginLeft: scale(8),
      width: scale(20),
      height: scale(20),
    },
    arrowDownDisabledStyle: { tintColor: Colors.lightGray },
    dropdownStyle: {
      height: "auto",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: scale(1),
      borderRadius: scale(8),
      minHeight: verticalScale(44),
      justifyContent: "space-between",
      backgroundColor: disabled ? Colors.lightGray : Colors.white,
      borderColor: disabled ? Colors.lightGray : Colors.gray,
      // borderColor: disabled
      //   ? Colors.lightGray
      //   : isError
      //   ? Colors.red
      //   : Colors.gray,
      paddingVertical: scale(10),
      paddingHorizontal: scale(16),
    },
    errorTextStyle: {
      marginStart: scale(5),
      color: Colors.red,
      marginTop: verticalScale(5),
    },
    placeholderStyle: {
      color: Colors.gray,
    },
    valueTextStyle: {
      width: "80%",
    },
  });

export default styles;
