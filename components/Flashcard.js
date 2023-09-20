import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";

import Icon2 from "react-native-vector-icons/AntDesign";
import Mail from "react-native-vector-icons/AntDesign";
import Share from "react-native-vector-icons/Entypo";
import Info from "react-native-vector-icons/FontAwesome5";

const Flashcard = ({ word, translation, onSwipeRight, onSwipeLeft }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const flipValue = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 2);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (Math.abs(gestureState.dx) > 50) {
        if (gestureState.dx > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }
    },
  });

  const flipCard = () => {
    Animated.timing(flipValue, {
      toValue: isFlipped ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsFlipped(!isFlipped);
    });
  };

  const frontInterpolate = flipValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Choose a group of words to study!</Text>
      <View style={styles.iconsRow}>
        <TouchableHighlight
          underlayColor="#c4661f"
          style={styles.buttonInfo}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
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

      <TouchableOpacity
        style={[styles.flashcard]}
        onPress={flipCard}
        {...panResponder.panHandlers}
      >
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <Text style={styles.cardText}>{word}</Text>
        </Animated.View>
        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle]}
        >
          <Text style={styles.cardText}>{translation}</Text>
        </Animated.View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flashcard: {
    width: 300,
    height: 200,
    perspective: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#5f6f52",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  cardBack: {
    position: "absolute",
    top: 0,
  },
  cardText: {
    fontSize: 24,
    color: "#fefae0",
  },
  text: {
    fontFamily: "vidaloka",
    fontSize: 20,
    textAlign: "center",
    color: "#6c526f",
    marginBottom: 20,
  },

  iconsRow: {
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 80,
    alignItems: "center",
    justifyContent: "space-between", 
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
  iconText: {
    marginRight: 10, 
    color: "#783d19",
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
});

export default Flashcard;
