import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import RoundBtn from "@/components/RoundBtn/RoundBtn";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useBalanceStore } from "@/store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import WidgetList from "@/components/SortableList/WidgetList";
import { useHeaderHeight } from "@react-navigation/elements";
const Page = () => {
  const { balance, runTransaction, transactions, clearTransaction } =
    useBalanceStore();
  const headerHeight = useHeaderHeight();
  const currency = "USD";
  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: "Added money",
    });
  };
  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>{currency}</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundBtn icon={"add"} text={"Add money"} onPress={onAddMoney} />
        <RoundBtn
          icon={"refresh"}
          text={"Exchange"}
          onPress={clearTransaction}
        />
        <RoundBtn icon={"list"} text={"Details"} />
        <Dropdown />
      </View>
      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {transactions?.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>
            No transactions
          </Text>
        )}
        {transactions &&
          transactions.map((transaction) => (
            <View
              key={transaction.id}
              style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
            >
              <View style={styles.circle}>
                <Ionicons
                  name={transaction.amount > 0 ? "add" : "remove"}
                  size={24}
                  color={Colors.dark}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontWeight: "400",
                    color: Colors.gray,
                    fontSize: 12,
                  }}
                >
                  {transaction.title}
                </Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                  {transaction?.date?.toLocaleString()}
                </Text>
              </View>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {transaction.amount} {currency}
              </Text>
            </View>
          ))}
      </View>
      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    alignItems: "center",
    margin: 80,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },
  balance: {
    fontSize: 50,
    // color: Colors.primary,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    // color: Colors.primary,
    fontWeight: "500",
    // marginLeft: 5,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: Colors.white,
    borderRadius: 15,
    gap: 20,
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

export default Page;
