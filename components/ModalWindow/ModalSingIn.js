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
import { isEmailValid, isPasswordValid } from "../Validation/Validation";

export default function ModalSingIn({
  visible,
  onClose,
  closeModal,
  isDarkMode,
  handleCloseModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed1, setIsPressed1] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePressIn = () => {
    setEmailError("");

    setPasswordError("");
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handlePressIn1 = () => {
    setPasswordError("");
    setEmailError("");
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

  const handleFormSubmit = () => {
    if (!isEmailValid(email) || !isPasswordValid(password)) {
      setEmailError(!isEmailValid(email) ? "invalid email" : "");
      setPasswordError(
        !isPasswordValid(password)
          ? "password must be at least 6 characters long"
          : ""
      );

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
            Login
          </Text>

          <TextInput
            style={[
              styles.input,
              isDarkMode ? styles.darkInput : styles.lightInput,
              emailError && styles.inputError,
            ]}
            placeholder={"email"}
            placeholderTextColor="#b99470"
            value={email}
            onChangeText={(text) => setEmail(text)}
            onFocus={handlePressIn}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[
                styles.passwordInput,
                isDarkMode ? styles.darkInput : styles.lightInput,
                passwordError && styles.inputError,
              ]}
              secureTextEntry={!showPassword}
              placeholder="password"
              placeholderTextColor="#b99470"
              value={password}
              onChangeText={(text) => setPassword(text)}
              onFocus={handlePressIn}
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
              email && styles.buttonActive,
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleFormSubmit}
          >
            <Text style={styles.buttonText}>create</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="#c4661f"
            style={[
              styles.closeButton,

              password && styles.buttonActive,
              isDarkMode ? styles.darkButton : styles.lightButton,
            ]}
            onPressIn={() => {
              handleCloseModalSingIn();
              handlePressOut1();
              handlePressIn1();
              // handleCloseModal();
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
    paddingTop: 65,
    paddingBottom: 55,
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
    padding: 5,
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
    alignItems: "center",
    backgroundColor: "#b99470",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, //
    marginTop: 15,
  },
  buttonText: {
    color: "#783d19",
  },
  closeButton: {
    borderRadius: 50,
    padding: 12,
    marginTop: 20,
    marginLeft: 60,
    marginRight: 60,
    alignItems: "center",
    backgroundColor: "#5f6f52",
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
    color: "red",
  },
  darkButton: {
    backgroundColor: "#756685",
    color: "#e0e4dc",
  },
  lightButton: {
    backgroundColor: "#b99470",
  },
  errorText: {
    fontSize: 10,
    color: "#c4661f",
    marginLeft: 5,
  },
});
