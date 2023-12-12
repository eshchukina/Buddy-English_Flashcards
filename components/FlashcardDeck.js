import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Left from "react-native-vector-icons/AntDesign";
import Right from "react-native-vector-icons/AntDesign";
import SwipeCards from "./SwipeCards.js";

const FlashcardDeck = ({
  updateSwipedRightCount,
  restartApp,
  setSelectedComponent,
  setIsPersonalCabinetOpen,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500);

    const hideTimeout = setTimeout(() => {
      clearInterval(interval);
      setIsVisible(false);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Swipe the card to the left if you don't know the word, and to the right
        if you know it!
      </Text>
      {/* {isVisible && (
        <Text style={styles.textIcon}>
          <Left name="doubleleft" size={20} color="#6c526f" />
        </Text>
      )}
      {isVisible && (
        <Text style={styles.textIconTwo}>
          <Right name="doubleright" size={20} color="#6c526f" />
        </Text>
      )} */}

      <SwipeCards
        updateSwipedRightCount={updateSwipedRightCount}
        setSelectedComponent={setSelectedComponent}
        setIsPersonalCabinetOpen={setIsPersonalCabinetOpen}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    fontFamily: "vidaloka",
    backgroundColor: "#fefae0",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textIcon: {
    fontFamily: "vidaloka",
    fontSize: 22,
    textAlign: "center",
    color: "#6c526f",
    position: "absolute",
    paddingRight: 50,
    top: 240,
    zIndex: 2,
  },
  textIconTwo: {
    fontFamily: "vidaloka",
    fontSize: 22,
    textAlign: "center",
    color: "#6c526f",
    position: "absolute",
    paddingLeft: 50,
    top: 240,
    zIndex: 2,
  },
  text: {
    fontFamily: "vidaloka",
    fontSize: 20,
    textAlign: "center",
    color: "#6c526f",
    position: "absolute",
    top: 50,
    zIndex: 2,
    margin: 10,
  },
});

export default FlashcardDeck;
