import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import RadialProgress from "./RadialProgress";
import Cards from "react-native-vector-icons/MaterialCommunityIcons";



export default function DownloadPage({
  setSelectedComponent,
}) {
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
      <View style={styles.mainBox}>
        <Text style={styles.text}>Hello, Pipka! Your progress: </Text>
        <RadialProgress value={20} />

        <TouchableHighlight
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
              open cards{" "}
            </Text>
            <Text
              style={[styles.buttonText, isPressed && styles.buttonActiveText]}
            >
              <Cards name="cards" size={40} />{" "}
            </Text>{" "}
          </>
        </TouchableHighlight>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    fontFamily: "vidaloka",
    fontSize: 18,
    backgroundColor: "#fefae0",
  },
  text: {
    fontFamily: "vidaloka",
    fontSize: 20,
    textAlign: "center",
    color: "#5f6f52",
    marginBottom: 20,
  },

  mainBox: {
    fontFamily: "vidaloka",
    fontSize: 20,
    maxWidth: "100%",
    height: "90%",
    margin: 10,
    paddingBottom: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#c4661f",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 0,
    paddingLeft: 16,
    marginTop: 50,
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
  },
  buttonActiveText: {
    color: "#783d19",
  },
});
