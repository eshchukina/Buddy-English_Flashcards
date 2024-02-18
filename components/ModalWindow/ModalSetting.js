// ModalSetting.js
import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const ModalSetting = ({ modalVisible, closeModal }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            The ability to customize the interface will be available in the
            upcoming update
          </Text>

          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={closeModal}
            style={[styles.button, styles.modalButton]}
          >
            <Text
              style={[
                styles.buttonText,
                { color: "#a9b388" },
                isPressed && { color: "#c4661f" },
              ]}
            >
              <Icon name="close" size={30} />
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    position: "absolute",
    backgroundColor: "#fefae0",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
    paddingBottom: 45,
    borderRadius: 20,
    width: 250,
    textAlign: "center",
    color: "#756685",
    margin: "auto",
    borderWidth: 2,
    borderColor: "#5f6f52",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "vidaloka",
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    color: "#6c526f",
    textAlign: "center",
    marginTop: 15,
    fontSize: 20,
  },
  button: {
    backgroundColor: "#6c526f",
    borderRadius: 100,
    margin: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#a9b388",
  },
});
export default ModalSetting;
