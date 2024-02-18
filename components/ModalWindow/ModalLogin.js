import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import Close from "react-native-vector-icons/AntDesign";
import { isEmailValid, isPasswordValid, isNameValid } from "../Validation/Validation";

export default function ModalLogin({
  visible,
  onClose,
  isDarkMode,
  closeModal,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed1, setIsPressed1] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const handlePressIn = () => {
    setEmailError("");
    setNameError("");
    setPasswordError("");
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

  const handleCloseModal = () => {
    // setIsPressed2(false);

    closeModal();
  };

  const handleFormSubmit = () => {
    if (
      !isNameValid(name) ||
      !isEmailValid(email) ||
      !isPasswordValid(password)
    ) {
      setEmailError(!isEmailValid(email) ? "invalid email" : "");
      setPasswordError(
        !isPasswordValid(password)
          ? "password must be at least 6 characters long"
          : ""
      );
      setNameError(!isNameValid(name) ? "name must not be empty" : "");
      return;
    }
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
            Registration
          </Text>

          <View>
            <TextInput
              style={[
                styles.input,
                isDarkMode ? styles.darkInput : styles.lightInput,
              ]}
              placeholder="name"
              placeholderTextColor="#b99470"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : null}
          </View>

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
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

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
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <TouchableHighlight
            underlayColor="#c4661f"
            style={[
              styles.button,
              isDarkMode ? styles.darkButton : styles.lightButton,
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleFormSubmit}
          >
            <Text style={styles.buttonText}>register</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="#c4661f"
            style={[
              styles.closeButton,
              isPressed1 && styles.buttonActive,
              isDarkMode ? styles.darkButton : styles.lightButton,
            ]}
            onPressIn={handlePressIn}
            onPressOut={() => {
              handlePressOut1();
              handleCloseModal();
            }}
          >
            <Text style={styles.buttonText}>
              <Close name="close" size={30} />
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 35,
    borderRadius: 20,
    width: 250,
    textAlign: "center",
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
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
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
    padding: 5,
    marginTop: 15,
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
    padding: 5,
    marginTop: 15,
  },
  lockPassword: {
    padding: 5,
    position: "relative",
    top: 7,
  },
  button: {
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#b99470",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    borderRadius: 50,
    padding: 12,
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    alignItems: "center",
    backgroundColor: "#5f6f52",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, //
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
    backgroundColor: "#b99470",
  },
  buttonText: {
    textAlign: "center",
  },
  errorText: {
    fontSize: 10,
    color: "#c4661f",
    marginLeft: 5,
  },
  buttonText: {
    color: "#783d19",
  },
});
