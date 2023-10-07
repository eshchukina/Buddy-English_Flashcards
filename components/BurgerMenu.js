import React from "react";
import { View, TouchableHighlight, Modal, Text, Pressable } from "react-native";

import Close from "react-native-vector-icons/AntDesign";

const BurgerMenu = ({ closeModal, isMenuVisible, handleEmptySpacePress }) => {
  const openLoginModal = () => {
    closeModal("login");
  };

  const openSignInModal = () => {
    closeModal("signIn");
  };

  if (!isMenuVisible) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      isMenuVisible={isMenuVisible}
    >
      <View style={styles.overlay}>
        <View style={styles.burgerMenu}>
          <Pressable onPress={openLoginModal}>
            <Text style={styles.burgerMenuItem}>
              if you are registered, please{" "}
              <Text style={styles.inlineText}>click</Text> to log in
            </Text>
          </Pressable>
          <Pressable onPress={openSignInModal}>
            <Text style={styles.burgerMenuItem}>
              If you are not registered, please{" "}
              <Text style={styles.inlineText}>click</Text> to create an account
            </Text>
          </Pressable>
          <TouchableHighlight
            underlayColor="#c4661f"
            style={[styles.buttonInfo]}
            onPress={handleEmptySpacePress}
          >
            <Text style={styles.iconText}>
              <Close name="close" size={30} />
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  burgerMenu: {
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
  buttonInfo: {
    backgroundColor: "#b99470",
    borderRadius: 50,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 5,
    paddingLeft: 15,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    textAlign: "center",
  },
  iconText: {
    marginRight: 10,
    color: "#783d19",
  },
  inlineText: {
    color: "#c4661f",
    fontSize: 23,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  burgerMenuItem: {
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
};

export default BurgerMenu;
