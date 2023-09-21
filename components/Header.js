import React from "react";
import { View, StyleSheet, Image } from "react-native";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Image
          source={require("./logobe_1.png")}
       
          style={{ width: 100, height: 200, resizeMode: "contain",   alignItems: "center" }}

        />
      </View>
      <View style={styles.rightContent}>
        <LoginButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fefae0",
    paddingTop: 0,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
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
