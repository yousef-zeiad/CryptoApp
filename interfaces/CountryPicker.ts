import { Country } from "react-native-country-picker-modal";

export interface CountryPickerProps {
  disabled?: boolean;
  onChangeCallingCode?: (callingCode: string) => void;
  onSelect?: (country: Country) => void;
  flagButtonIcon?: boolean;
  defaultValue?: Country;
  excludeCountries?: string[];
  withDropdownStyle?: boolean;
  showCountryValue?: boolean;
  withCallingCode?: boolean;
  placeholder?: string;
}
