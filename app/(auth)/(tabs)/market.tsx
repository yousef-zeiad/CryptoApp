import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Currency } from "@/interfaces/crypto";
import { Link } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const headerHeight = useHeaderHeight();

  const currencies = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetch("/api/listings").then((res) => res.json()),
    refetchInterval: 1000,
  });

  const ids = currencies.data
    ?.map((currency: Currency) => currency.id)
    .join(",");

  const { data, isLoading } = useQuery({
    queryKey: ["info", ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  if (currencies.isLoading || isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        paddingTop: headerHeight,
        paddingBottom: headerHeight,
      }}
    >
      <Text style={defaultStyles.sectionHeader}>Latest Crypot</Text>
      {currencies.isFetched && (
        <View style={defaultStyles.block}>
          {currencies.data?.map((currency: Currency) => (
            <Link href={`/market/${currency.id}`} key={currency.id} asChild>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: data?.[currency.id].logo }}
                  style={{ width: 40, height: 40 }}
                />
                <View style={{ flex: 1, gap: 6 }}>
                  <Text style={{ fontWeight: "600", color: Colors.dark }}>
                    {currency.name}
                  </Text>
                  <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
                </View>
                <View style={{ gap: 6, alignItems: "flex-end" }}>
                  <Text>{currency.quote.USD.price.toFixed(2)} $</Text>
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Ionicons
                      name={
                        currency.quote.USD.percent_change_1h > 0
                          ? "caret-up"
                          : "caret-down"
                      }
                      size={16}
                      color={
                        currency.quote.USD.percent_change_1h > 0
                          ? "green"
                          : "red"
                      }
                    />
                    <Text
                      style={{
                        color:
                          currency.quote.USD.percent_change_1h > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {currency.quote.USD.percent_change_1h.toFixed(2)} %
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      )}
    </ScrollView>
  );
};
export default Page;
