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
import Icon from "react-native-vector-icons/AntDesign";
import * as Validation from "../Validation/Validation";

export default function AddForm({ visible, onClose, onAddWord }) {
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed1, setIsPressed1] = useState(false);
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [wordError, setWordError] = useState("");
  const [translationError, setTranslationError] = useState("");

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handlePressIn1 = () => {
    setIsPressed1(true);
  };

  const handleCloseModal = () => {
    setIsPressed1(false);
    setTranslation("");
    setWord("");
    setWordError("");
    setTranslationError("");
    onClose();
  };
  const handleCreateWord = () => {
    setIsPressed(true);
    const isWordValid = Validation.isWordAndTranslationValid(word, translation);
  
    if (!word.trim() || !translation.trim()) {
      setWordError("fields cannot be empty");
    } else if (word.length > 30 || translation.length > 30) {
      setWordError("word should not exceed 30 characters");
    } else {
      setWordError("");
    }
  
    if (isWordValid && word.length <= 30 && translation.length <= 30) {
      onAddWord(word, translation);
      onClose();
      setTranslation("");
      setWord("");
      setWordError("");
      setTranslationError("");
    }
  };
  

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlayContent}></View>
        </TouchableWithoutFeedback>

        <View style={[styles.modalContent, styles.light]}>
          <Text style={[styles.modalText, styles.titleText, styles.light]}>
          add your word and translation          </Text>

          <TextInput
            style={[styles.input, styles.lightInput]}
            placeholder="word"
            placeholderTextColor="#b99470"
            value={word}
            onChangeText={(text) => setWord(text)}
          />

          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[styles.passwordInput, styles.lightInput]}
              placeholder="translation"
              placeholderTextColor="#b99470"
              value={translation}
              onChangeText={(text) => setTranslation(text)}
            />
          </View>

          <View style={styles.errorContainer}>
            {wordError !== "" && (
              <Text style={styles.wordError}>{wordError}</Text>
            )}
            {translationError !== "" && (
              <Text style={styles.wordError}>{translationError}</Text>
            )}
          </View>

          <Pressable
            style={[
              styles.button,
              isPressed && styles.buttonActive,
              styles.lightButton,
            ]}
            onPressIn={handleCreateWord}
            onPressOut={handlePressOut}
            underlayColor="#c4661f"
          >
            <Text
              style={[
                {
                  color: "#a9b388",
                },
                isPressed && {
                  color: "#c4661f",
                },
              ]}
            >
              создать
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.closeButton,
              isPressed1 && styles.buttonActive,
              styles.lightButton,
            ]}
            onPressIn={handlePressIn1}
            onPressOut={handleCloseModal}
            underlayColor="#c4661f"
          >
            <Text
              style={[
                {
                  color: "#a9b388",
                },
                isPressed1 && {
                  color: "#c4661f",
                },
              ]}
            >
              <Icon name="close" size={30} />
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
    padding: 35,
    paddingTop: 20,
    paddingBottom: 30,
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
  modalText: {
    alignItems: "center",
    fontFamily: "vidaloka",
  },
  titleText: {
    textAlign: "center",
    fontFamily: "vidaloka",
    padding: 10,
    fontSize: 18,
    color: "#6c526f",
    textAlign: "center",
    marginTop: 15,
  },
  input: {
    borderColor: "#5f6f52",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    marginBottom: 15,
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
    marginBottom: 15,
  },
  lockPassword: {
    padding: 5,
    position: "relative",
  },
  button: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#5f6f52",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, 
    marginTop: 10,
  },
  closeButton: {
    borderRadius: 50,
    padding: 10,
    marginTop: 10,
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
  lightButton: {
    backgroundColor: "#5f6f52",
  },
  wordError: {
    color: "#6c526f",
    textAlign: "center",
    fontSize: 11,
  },
});
