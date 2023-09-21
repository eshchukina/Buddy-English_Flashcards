import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,

} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function ModalSingIn({
  visible,
  onClose,
  closeModal,
  isDarkMode,
  handleCloseModal,
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed1, setIsPressed1] = useState(false);
  // const [isPressed2, setIsPressed2] = useState(false);

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

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseModalSingIn = () => {
    // setIsPressed2(false);

    closeModal();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlayContent}></View>
        </TouchableWithoutFeedback>
        <View
          style={[styles.modalContent, isDarkMode ? styles.dark : styles.light]}
        >
          <Text
            style={[
              styles.modalText,
              styles.titleText,
              isDarkMode ? styles.dark : styles.light,
            ]}
          >
            Login
          </Text>

          <TextInput
            style={[
              styles.input,
              isDarkMode ? styles.darkInput : styles.lightInput,
            ]}
            placeholder="email"
            placeholderTextColor="#b99470"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[
                styles.passwordInput,
                isDarkMode ? styles.darkInput : styles.lightInput,
              ]}
              secureTextEntry={!showPassword}
              placeholder="password"
              placeholderTextColor="#b99470"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Pressable
              style={styles.lockPassword}
              onPress={handlePasswordVisibility}
            >
              <Text>
                {showPassword ? (
                  <Icon name="eye" size={20} color="#6c526f" />
                ) : (
                  <Icon name="eye-slash" size={20} color="#6c526f" />
                )}
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={[
              styles.button,
              isPressed && styles.buttonActive,
              isDarkMode ? styles.darkButton : styles.lightButton,
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            underlayColor="#c4661f"
          >
            <Text
              style={[
                {
                  color: "#a9b388",
                },
                isPressed && {
                  color: "#f9ebc7",
                },
              ]}
            >
              create
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.closeButton,
              styles.button,
              isPressed1 && styles.buttonActive,
              isDarkMode ? styles.darkButton : styles.lightButton,
            ]}
            onPressIn={() => {
              handleCloseModalSingIn();
              handlePressOut1();
              handlePressIn1();
              // handleCloseModal();
            }}
            underlayColor="#c4661f"
          >
            <Text
              style={[
                {
                  color: "#a9b388",
                },
                isPressed && {
                  color: "#f9ebc7",
                },
              ]}
            >
              close
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
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
  light: {
    backgroundColor: "#fefae0",
    color: "#783d19",
  },
  dark: {
    backgroundColor: "#333333",
    color: "#FFFFFF",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#756685",
    alignItems: "center",
  },
  titleText: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    fontFamily: "vidaloka",
  },

  input: {
    borderColor: "#5f6f52",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  darkInput: {
    backgroundColor: "#b8bbc4",
  },
  lightInput: {
    backgroundColor: "#fefae0",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "#756685",
    borderColor: "#5f6f52",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  lockPassword: {
    padding: 5,
    position: "relative",
   
  },
  button: {
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#5f6f52",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, // For Android
  },
  buttonActive: {
    elevation: 6,
    shadowColor: "rgba(120, 125, 136, 0.5)",
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 2,
    shadowRadius: 10,
    color: "red",
  },
  darkButton: {
    backgroundColor: "#756685",
    color: "#e0e4dc",
  },
  lightButton: {
    backgroundColor: "#5f6f52",
  },
  buttonText: {},
});
