import React from "react";
import { View, StyleSheet, Image } from "react-native";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Image
          source={require("./logobe_1.png")}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.rightContent}>
        <LoginButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 100, 
    height: 100, 
    resizeMode: "contain",
  },

  container: {
    backgroundColor: "#fefae0",
    padding: 10,
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    
  },
  rightContent: {
   
  },
});

export default Header;
