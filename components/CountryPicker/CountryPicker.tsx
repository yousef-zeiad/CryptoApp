import React, { useMemo, useState } from "react";
import { Image, TouchableOpacity, Text } from "react-native";
import CountryPickerModal, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import styles from "./style";
import ArrowDownSVG from "@/assets/icons/ArrowDownSVG/ArrowDownSVG";
import { CountryPickerProps } from "@/interfaces/CountryPicker";

const CountryPicker: React.FC<CountryPickerProps> = ({
  disabled = false,
  onChangeCallingCode = () => {},
  onSelect,
  flagButtonIcon = true,
  defaultValue = {
    callingCode: ["1"],
    cca2: "US",
    currency: ["USD"],
    flag: "flag-us",
    name: "United States",
    region: "Americas",
    subregion: "North America",
  },
  withDropdownStyle = false,
  showCountryValue = false,
  withCallingCode = true,
  placeholder = "",
}) => {
  const {
    flagButtonStyle,
    flagButtonText,
    flagButtonTextDisabled,
    dropdownStyle,
    placeholderStyle,
    valueTextStyle,
  } = useMemo(() => styles(disabled), [disabled]);

  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    !showCountryValue ? defaultValue ?? null : null
  );

  const onValueSelect = (country: Country) => {
    setCountryCode(country?.cca2);
    setSelectedCountry(country);
    onChangeCallingCode(country?.callingCode?.[0] || "");
    onSelect && onSelect(country);
  };

  const renderFlagButton = (): React.ReactNode => {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[flagButtonStyle, withDropdownStyle && dropdownStyle]}
        onPress={() => setVisible(true)}
      >
        {(selectedCountry?.callingCode?.[0] || showCountryValue) && (
          <Text
            style={[
              flagButtonText,
              disabled && flagButtonTextDisabled,
              ...[
                showCountryValue && valueTextStyle,
                showCountryValue && placeholderStyle,
              ],
            ]}
          >
            {showCountryValue
              ? `${selectedCountry?.name ?? placeholder}`
              : `+${selectedCountry?.callingCode?.[0]}`}
          </Text>
        )}
        {flagButtonIcon && <ArrowDownSVG height={20} width={20} />}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CountryPickerModal
        countryCode={countryCode}
        withFilter
        withFlag
        withFlagButton
        withCountryNameButton
        withAlphaFilter
        withEmoji
        visible={visible}
        onSelect={onValueSelect}
        withCallingCode={withCallingCode}
        onClose={() => setVisible(false)}
        renderFlagButton={renderFlagButton}
      />
    </>
  );
};

export default CountryPicker;
