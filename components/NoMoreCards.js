import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NoMoreCards = () => {
  return (
    <View>
      <Text style={styles.noMoreCardsText}>No more cards</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noMoreCardsText: {
    fontSize: 22,
  },
});

export default NoMoreCards;
