import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Animated, Pressable } from "react-native";
import Star from "react-native-vector-icons/Ionicons";
import StarHalf from "react-native-vector-icons/Ionicons";
import StarOutline from "react-native-vector-icons/Ionicons";


const Card = ({ word, translation, count }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontOpacity = useRef(new Animated.Value(0)).current;
  const backOpacity = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    const newIsFlipped = !isFlipped;

    const animations = [
      Animated.timing(frontOpacity, {
        toValue: newIsFlipped ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(backOpacity, {
        toValue: newIsFlipped ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ];

    Animated.parallel(animations, { stopTogether: false }).start(() => {
      setIsFlipped(newIsFlipped);
    });
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: frontOpacity.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: backOpacity.interpolate({
          inputRange: [0, 1],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const renderStar = () => {
    if (count < 0 || count == null) {
      return null;
    } else if (count === 1) {
      return <StarOutline name="star-outline" size={30} color="#f9d479" />;}

      else if (count === 2) {
        return <StarHalf name="star-half-sharp" size={32} color="#f9d479" />;

    } else if (count >= 3) {
      return <Star name="star-sharp" size={32} color="#f9d479" />;
    } else {
      return null; // or provide a default case
    }
  };

  return (
    <Pressable style={styles.cardContainer} onPress={flipCard}>
      <View style={styles.flashcard}>
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <Text style={styles.cardStar}>
         {renderStar()}


          </Text> 
           <Text style={styles.cardText}>{word}
       


          </Text>
        
        </Animated.View>
        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle]}
        >
            <Text style={styles.cardStar}>
         {renderStar()}


          </Text>
          <Text style={styles.cardText}>{translation}  
          </Text>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  flashcard: {
    width: 300,
    height: 200,
    perspective: 1000,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#5f6f52",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    textAlign: "center",
    borderColor: "#a9b388",
    borderWidth: 5,
  },
  cardBack: {
    position: "absolute",
    backgroundColor: "#5f6f52",
    top: 0,
    textAlign: "center",
    borderColor: "#a9b388",
    borderWidth: 5,
  },
  cardText: {
    fontSize: 40,
    color: "#fefae0",
    fontFamily: "vidaloka",
    textAlign: "center",
  },
  cardContainer: {
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#fefae0",
    alignItems: "center",
    position: "relative",
    top: 60,
  },
});

export default Card;
