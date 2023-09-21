import React from "react";
import { View, Text, Pressable } from "react-native";

const BurgerMenu = ({ closeModal, isMenuVisible }) => {
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
    <View style={styles.burgerMenu}>
      <Pressable onPress={openLoginModal}>
        <Text style={styles.burgerMenuItem}>login</Text>
      </Pressable>
      <Pressable onPress={openSignInModal}>
        <Text style={styles.burgerMenuItem}>sign in</Text>
      </Pressable>
    </View>
  );
};

const styles = {
  burgerMenu: {
    position: "absolute",
    top: 20,
    left: 5,
    width: 80,
    height: 400,
    paddingTop: 50,
  },
  burgerMenuItem: {
    fontFamily: "vidaloka",
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    color: "#6c526f",
  },
};

export default BurgerMenu;
