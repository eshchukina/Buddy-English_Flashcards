import React, { useContext, useEffect, useState } from "react";

import { useUser } from "@clerk/clerk-react";
import { Text, View, StyleSheet } from "react-native";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    const formattedDate = user.createdAt.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}> name: {`${user.fullName}`}</Text>
        <Text style={styles.text}>start date: {formattedDate}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#783d19",
    fontFamily: "vidaloka",
    padding: 10,
    fontSize: 18,
  },
  textContainer: {
    position: "absolute",
    display: "flex",
    alignContent: "center",
  },
});
