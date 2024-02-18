import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

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
        <Text style={styles.text}>
          Embark on a language-learning journey with our app designed to teach
          you the 1000 most commonly used English words. Immerse yourself in an
          interactive experience where you not only learn the words but also
          their translations.
        </Text>

        <Text style={styles.text}>
          The learning process involves a dynamic swipe mechanism – swipe right
          if you've mastered the word, and left if you're still working on it.
        </Text>

        <Text style={styles.text}>
          Your ultimate goal is to achieve a perfect 100% mastery of the
          vocabulary. Track your progress and strive to elevate your rating to
          the highest possible mark. The app provides a user-friendly interface,
          making the learning process engaging and effective.
        </Text>

        <Text style={styles.text}>
          Reinforce your English language skills, broaden your vocabulary, and
          witness your proficiency soar as you work towards achieving the top
          rating. Download now and embark on a transformative language-learning
          adventure!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#fefae0",
  },
  userInfo: {
    margin: 10,
    marginTop: 70,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    color: "#783d19",
    fontFamily: "vidaloka",
    margin: 5,
    textAlign: "justify",
  },
  textFlower: {
    color: "#6c526f",
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
