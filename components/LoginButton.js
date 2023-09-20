import React, { useState } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from "react-native";
import ModalLogin from "./ModalLogin";
import Icon from "react-native-vector-icons/AntDesign";

export default function LoginButton() {
  const [isPressed, setIsPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableHighlight
      style={[styles.button, isPressed && styles.buttonActive]}
      underlayColor="#c4661f"
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={openModal}
    >
      <View>
        <Text style={[styles.buttonText, isPressed && styles.buttonActiveText]}>
          <Icon name="login" size={44} />
        </Text>
        <ModalLogin visible={modalVisible} onClose={closeModal} />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#a9b388",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonActive: {
    elevation: 6,
    shadowColor: "rgba(120, 125, 136, 0.5)",
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 2,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#5f6f52",
  },
  buttonActiveText: {
    color: "#783d19",
  },
});
