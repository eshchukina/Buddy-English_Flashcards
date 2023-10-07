import React, { useState } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import BurgerMenu from "./BurgerMenu";
import ModalLogin from "./ModalLogin";
import ModalSingIn from "./ModalSingIn";

export default function LoginButton() {
  const [isPressed, setIsPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const openModal = (modalType) => {
    setModalVisible(true);
    setActiveModal(modalType);
    setIsMenuVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setActiveModal(null);
    setIsMenuVisible(false);
  };

  const handleEmptySpacePress = () => {
    if (modalVisible) {
      closeModal();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleEmptySpacePress}>
      <View>
        <Pressable
          style={[styles.button, isPressed && styles.buttonActive]}
          underlayColor="#c4661f"
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={openModal}
        >
          <View>
            <Text
              style={[styles.buttonText, isPressed && styles.buttonActiveText]}
            >
              <Icon name="login" size={40} />
            </Text>
          </View>
        </Pressable>

        {modalVisible && activeModal === "login" && (
          <ModalSingIn closeModal={closeModal} />
        )}
        {modalVisible && activeModal === "signIn" && (
          <ModalLogin closeModal={closeModal} />
        )}
        {modalVisible && activeModal === null && (
          <View>
            <Text>No Modal Selected</Text>
          </View>
        )}

        <BurgerMenu
          handleEmptySpacePress={handleEmptySpacePress}
          closeModal={openModal}
          isMenuVisible={isMenuVisible}
        />
      </View>
    </TouchableWithoutFeedback>
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
