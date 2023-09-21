

import React from 'react';
import { StyleSheet, ScrollView, View, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import Flashcard from './Flashcard';

const FlashcardDeck = () => {
  const flashcards = [
    { id: 1, word: 'Apple', translation: 'Яблоко' },
    { id: 2, word: 'Banana', translation: 'Банан' },
    { id: 1, word: 'Cat', translation: 'Кот' },
    { id: 2, word: 'Dog', translation: 'Собака' },
    { id: 1, word: 'Bear', translation: 'Медведь' },
    { id: 2, word: 'Milk', translation: 'Молоко' },
    { id: 1, word: 'Home', translation: 'Дом' },
    { id: 2, word: 'Friend', translation: 'Друзья' },
    { id: 1, word: 'Apple', translation: 'Яблоко' },
    { id: 2, word: 'Banana', translation: 'Банан' },
    { id: 1, word: 'Cat', translation: 'Кот' },
    { id: 2, word: 'Dog', translation: 'Собака' },
    { id: 1, word: 'Bear', translation: 'Медведь' },
    { id: 2, word: 'Milk', translation: 'Молоко' },
    { id: 1, word: 'Home', translation: 'Дом' },
    { id: 2, word: 'Friend', translation: 'Друзья' },
    { id: 1, word: 'Apple', translation: 'Яблоко' },
    { id: 2, word: 'Banana', translation: 'Банан' },
    { id: 1, word: 'Cat', translation: 'Кот' },
    { id: 2, word: 'Dog', translation: 'Собака' },
    { id: 1, word: 'Bear', translation: 'Медведь' },
    { id: 2, word: 'Milk', translation: 'Молоко' },
    { id: 1, word: 'Home', translation: 'Дом' },
    { id: 2, word: 'Friend', translation: 'Друзья' },
    { id: 1, word: 'Apple', translation: 'Яблоко' },
    { id: 2, word: 'Banana', translation: 'Банан' },
    { id: 1, word: 'Cat', translation: 'Кот' },
    { id: 2, word: 'Dog', translation: 'Собака' },
    { id: 1, word: 'Bear', translation: 'Медведь' },
    { id: 2, word: 'Milk', translation: 'Молоко' },
    { id: 1, word: 'Home', translation: 'Дом' },
    { id: 2, word: 'Friend', translation: 'Друзья' },
  ];

  return (
    <View style={styles.container}>
<View style={styles.containerText}>
            <Text style={styles.iconText}>
          Swipe!
            </Text>
          </View>



    <Swiper loop={true}
    showsPagination={false} 
    dotStyle={styles.dotStyle} 

activeDotStyle={styles.activeDotStyle} 
    
    >
      
      {flashcards.map((flashcard) => (
        <Flashcard
          key={flashcard.id}
          word={flashcard.word}
          translation={flashcard.translation}
        />
      ))}
    </Swiper>
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
  containerText:{
 
      flexDirection: "row",
      justifyContent: "center",
  
  position:"relative",

  top:200,
zIndex:1,

  },

  iconText: {
  
 
    fontFamily: "vidaloka",
    fontSize: 25,
    textAlign: "center",
    color: "#6c526f",
  },

});

export default FlashcardDeck;
