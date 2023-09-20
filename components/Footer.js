import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Clipboard from "react-native-vector-icons/Entypo";

const Footer = ({ setSelectedComponent }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed1, setIsPressed1] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handlePressIn1 = () => {
    setIsPressed1(true);
  };

  const handlePressOut1 = () => {
    setIsPressed1(false);
  };

  const handleButton1Press = () => {
    setSelectedComponent("dashboard");
  };

  const handleButton2Press = () => {
    setSelectedComponent("personalcabinet");
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor="#c4661f"
        style={styles.button}
        onPressIn={handlePressIn1}
        onPressOut={handlePressOut1}
        onPress={handleButton1Press}
      >
        <Text
          style={[styles.buttonText, isPressed1 && styles.buttonActiveText]}
        >
          <Clipboard name="clipboard" size={44} />
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor="#c4661f"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button2}
        onPress={handleButton2Press}
      >
        <Text style={[styles.buttonText, isPressed && styles.buttonActiveText]}>
          <Icon name="user" size={40} />
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fefae0",
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#a9b388",
    borderRadius: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 13,
    paddingLeft: 13,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  button2: {
    backgroundColor: "#a9b388",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 16,
    paddingLeft: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#5f6f52",
  },
  buttonActiveText: {
    color: "#783d19",
  },
});

export default Footer;
