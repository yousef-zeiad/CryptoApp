import { Ionicons } from "@expo/vector-icons";

export type RoundBtnProps = {
  icon: typeof Ionicons.defaultProps;
  text: string;
  onPress?: () => void;
};
