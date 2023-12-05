import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Linking,
  Pressable,
  Share as ShareModule,
  Image,
  SafeAreaView,
  Button,
} from "react-native";

const SettingsComponent = ({
  setSelectedComponent,
  setIsPersonalCabinetOpen,
  isVisible,
  onClose,
  onRestart,
}) => {
  const openPersonalCabinet = () => {
    setIsPersonalCabinetOpen(true);
  };

  useEffect(() => {
    openPersonalCabinet();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Personal Cabinet</Text>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Are you sure you want to restart?</Text>
        <Pressable
          style={[styles.button, styles.modalButton]}
          onPress={() => {
            onClose();
            onRestart();
          }}
        >
          <Text style={[styles.buttonText]}>Yes</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.modalButton]}
          onPress={onClose}
        >
          <Text style={[styles.buttonText]}>No</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    position: "relative]",
    marginBottom: 20,
  },

  userPhotoContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 20,
    textAlign: "center",
    color: "#783d19",
  },

  circularPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f9ebc7",
    borderRadius: 75,
    textAlign: "center",

    overflow: "hidden",
  },
  avatarImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  iconsRow: {
    flexDirection: "row",
    textAlign: "center",
    marginTop: 100,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconText: {
    marginRight: 10,
    color: "#783d19",
  },
  wrapperInfo: {
    display: "flex",
    alignItems: "center",
  },
});

export default SettingsComponent;
