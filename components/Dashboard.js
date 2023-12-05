import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, Pressable, Image } from "react-native";
import Passing from "./Passing";
import Cards from "react-native-vector-icons/MaterialCommunityIcons";

export default function Dashboard({ setSelectedComponent }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  const openFlash = () => {
    setSelectedComponent("flashcards");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Passing />

      <Pressable
        underlayColor="#c4661f"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
        onPress={openFlash}
      >
        <>
          <Text
            style={[styles.buttonText, isPressed && styles.buttonActiveText]}
          >
            open cards
          </Text>
          <Text
            style={[styles.buttonText, isPressed && styles.buttonActiveText]}
          >
            <Cards name="cards" size={40} />
          </Text>
        </>
      </Pressable>
      <Image
        source={require("../assets/img.png")}
        style={{
          width: 500,
          height: 200,
          resizeMode: "contain",
          alignItems: "center",
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    fontFamily: "vidaloka",
    fontSize: 18,
    backgroundColor: "#fefae0",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "vidaloka",
    fontSize: 20,
    textAlign: "center",
    color: "#5f6f52",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#c4661f",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 50,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#f9ebc7",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "vidaloka",
  },
  buttonActiveText: {
    color: "#783d19",
  },
});
