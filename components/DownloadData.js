import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import Flashcard from "./Flashcard";

export default function DownloadData() {
  const flashcards = [
    { id: 1, word: "Apple", translation: "Яблоко" },
    { id: 2, word: "Banana", translation: "Банан" },

  ];

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  const handleSwipeRight = () => {
    if (currentFlashcardIndex < flashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
    }
  };

  const handleSwipeLeft = () => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mainBox}>
        {currentFlashcardIndex < flashcards.length ? (
          <Flashcard
            word={flashcards[currentFlashcardIndex].word}
            translation={flashcards[currentFlashcardIndex].translation}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
          />
        ) : (
          <Text>No more flashcards to show</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefae0",
    alignItems: "center",
    justifyContent: "center",
  },
  mainBox: {
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    color: "#5f6f52",
    marginBottom: 20,
  },
});
