import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable

} from "react-native";

import Back from "react-native-vector-icons/AntDesign";



const Info = ({ setSelectedComponent }) => {


  const [isPressed, setIsPressed] = useState(false);

  const openInfo = () => {
    setSelectedComponent("personalcabinet");
  };







  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };




  return (
    <ScrollView contentContainerStyle={styles.container}>



       <Pressable
        underlayColor="#c4661f"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
        onPress={openInfo}
      >
        <Text style={[styles.buttonText, isPressed && styles.buttonActiveText]}>
        <Back name="back" size={40} />
        </Text>
      </Pressable>



    
      <View style={styles.userInfo}>
        <Text style={styles.text}>The app contains 3,000 flashcards with
         English words or phrases that users can learn from.</Text>

   

        <Text style={styles.text}> When users click on a card, it flips,
         revealing the Russian translation. This helps users understand 
         the meaning of the word or phrase.</Text>
       

        <Text style={styles.text}>Cards that users have memorized and
         wish to review later can be swiped to the right. This helps users 
         filter words they need to revisit.</Text>

        <Text style={styles.text}>The app allows users to track their 
        progress in learning words and phrases. They can see how many 
        cards they've learned, how many are remaining, and their overall 
        progress.</Text>

      
        <Text style={styles.text}>Categorization of Cards: Cards can be 
        organized into different categories or topics so that users can 
        learn specific words or phrases relevant to their interests or
         needs.</Text>


      
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
marginTop:5,
      backgroundColor: "#fefae0",
  
    },
    userInfo: {
      margin:10,
     marginTop:70,
      textAlign: "center",
    },
    text: {
      fontSize: 18,
      color: "#783d19",
      fontFamily: "vidaloka",
      margin: 5,
       textAlign: "justify",
    },

    textFlower:{
    
    color:'#6c526f',
      textAlign: "center",

    },
    button: {
      backgroundColor: "#a9b388",
      borderRadius: 15,
      paddingTop: 8,
      paddingBottom: 8,
      paddingRight: 13,
      paddingLeft: 13,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 5,
    },
    buttonText: {
      color: "#5f6f52",
    },
    buttonActiveText: {
      color: "#783d19",
    },
   
  });
  
  export default Info;