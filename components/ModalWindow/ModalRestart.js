import React from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";

const ModalRestart = ({ isVisible, onClose, onRestart }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            are you sure you want to restart?
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.modalButton,
              { backgroundColor: pressed ? "#c4661f" : "#6c526f" },
            ]}
            onPress={() => {
              onClose();
              onRestart();
            }}
          >
            <Text style={[styles.buttonText]}>yes</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.modalButton,
              { backgroundColor: pressed ? "#c4661f" : "#6c526f" },
            ]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText]}>no</Text>
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
    borderRadius: 15,
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

export default ModalRestart;
