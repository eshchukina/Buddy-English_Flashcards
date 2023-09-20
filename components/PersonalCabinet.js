import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/AntDesign";
import Mail from "react-native-vector-icons/AntDesign";
import Share from "react-native-vector-icons/Entypo";
import Info from "react-native-vector-icons/FontAwesome5";

const PersonalCabinet = ({ setSelectedComponent }) => {

  const openInfo = () => {
    setSelectedComponent("download");
  };

  const handlePressIn = () => {
 
  };

  const handlePressOut = () => {
 
  };
  return (
    <View style={styles.container}>
      <View style={styles.userPhotoContainer}>
        <View style={styles.circularPlaceholder}>
          <Text style={styles.buttonText}>
            <Icon name="photo-video" size={50} />
          </Text>
        </View>
      </View>
      <Text style={styles.heading}>Personal Cabinet</Text>
      <View style={styles.userInfo}>
        <Text style={styles.text}>name: John Doe</Text>
        <Text style={styles.text}>email: johndoe@example.com</Text>
        <View style={styles.iconsRow}>
          <TouchableHighlight
            underlayColor="#c4661f"
            style={styles.buttonInfo}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={openInfo}
           
          >
            <Text style={styles.iconText}>
              <Info name="info" size={25} />
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="#c4661f"
            style={styles.button}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
           
          >
            <Text style={styles.iconText}>
              <Mail name="mail" size={25} />
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="#c4661f"
            style={styles.button}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
  
          >
            <Text style={styles.iconText}>
              <Share name="share" size={25} />
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="#c4661f"
            style={styles.button}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
         
          >
            <Text style={styles.iconText}>
              <Icon2 name="logout" size={25} />
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fefae0",
  },
  heading: {
    fontFamily: "vidaloka",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#c4661f",
  },
  button: {
    backgroundColor: "#b99470",
    borderRadius: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 1,
    paddingLeft: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonInfo: {
    backgroundColor: "#b99470",
    borderRadius: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 9,
    paddingLeft: 18,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    textAlign: "center",
  },
  userInfo: {
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    color: "#783d19",
    fontFamily: "vidaloka",
    marginBottom: 20,
    marginLeft: 20,
  },
  userPhotoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginBottom: 20,
    textAlign: "center",
    color: "#783d19",
  },
  buttonText: {
    fontFamily: "vidaloka",
    position: "relative",
    left: 45,
    top: 45,
    color: "#783d19",
  },
  circularPlaceholder: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#f9ebc7",
    borderRadius: 75,
    textAlign: "center",
  },
  iconsRow: {
    flexDirection: "row",
    textAlign: "center",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "space-between", 
  },
  iconText: {
    marginRight: 10, 
    color: "#783d19",
  },
});

export default PersonalCabinet;
