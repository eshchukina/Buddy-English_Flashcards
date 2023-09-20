import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import ModalSingIn from "./ModalSingIn";

export default function ModalLogin({ visible, onClose, isDarkMode }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed1, setIsPressed1] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

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

  const handlePressIn2 = () => {
    setIsPressed2(true);
  };

  const handlePressOut2 = () => {
    setIsPressed2(false);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseModal = () => {
    setIsPressed2(false);
    onClose();
  };

  const openLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalVisible(false);
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
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>

          <TouchableHighlight
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
              Register
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[
              styles.buttonClose,
              isPressed1 && styles.buttonActive,
              isDarkMode ? styles.darkButton : styles.lightButton,
            ]}
            onPressIn={handlePressIn1}
            onPressOut={() => {
              handlePressOut1();
              handleCloseModal();
            }}
            underlayColor="#c4661f"
          >
            <Text
              style={[
                {
                  color: "#a9b388",
                },
                isPressed1 && {
                  color: "#f9ebc7",
                },
              ]}
            >
              Close
            </Text>
          </TouchableHighlight>

          <Text
            style={[
              styles.modalText,
              styles.titleText,
              isDarkMode ? styles.dark : styles.light,
            ]}
          >
            Enter login
          </Text>
          <TouchableHighlight
            onPressIn={handlePressIn2}
            onPressOut={() => {
              openLoginModal();
              handlePressOut2();
            }}
            underlayColor="#c4661f"
            style={[
              styles.button,
              isPressed2 && styles.buttonActive,
              isDarkMode ? styles.darkButton : styles.lightButton,
            ]}
          >
            <Text
              style={[
                {
                  color: "#a9b388",
                },
                isPressed2 && {
                  color: "#f9ebc7",
                },
              ]}
            >
              Login
            </Text>
          </TouchableHighlight>

          {isLoginModalVisible && (
            <ModalSingIn
              visible={isLoginModalVisible}
              onClose={closeLoginModal}
              isDarkMode={isDarkMode}
              handleCloseModal={handleCloseModal}
            />
          )}
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
    borderRadius: 20,
    width: "auto",
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
    position: "absolute",
    left: 140,
    top: 3,
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
    elevation: 5,
  },
  buttonClose: {
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#b3aabd",
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
    backgroundColor: "#5f6f52",
  },
  buttonText: {
    textAlign: "center",
  },
});
