import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';

const Flashcard = ({ word, translation }) => {
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
  
    Animated.parallel(animations).start(() => {
      setIsFlipped(newIsFlipped);
    });
  };
  

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontOpacity.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backOpacity.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] }) }],
  };

  return (
    <Pressable style={styles.cardContainer} onPress={flipCard}>
      <View style={styles.flashcard}>
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <Text style={styles.cardText}>{word}</Text>
        </Animated.View>
        <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
          <Text style={styles.cardText}>{translation}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#5f6f52',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  cardBack: {
    position: 'absolute',
    backgroundColor: '#5f6f52',
    top: 0,
  },
  cardText: {
    fontSize: 40,
    color: '#fefae0',
    fontFamily: "vidaloka",
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fefae0',
    alignItems: 'center',
  },
});

export default Flashcard;
