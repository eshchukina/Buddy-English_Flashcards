import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Modal,
  View,
  Animated,
} from "react-native";
import * as Animatable from "react-native-animatable";

import Passing from "./Passing";
import Cards from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Star from "react-native-vector-icons/Ionicons";
import StarHalf from "react-native-vector-icons/Ionicons";
import StarOutline from "react-native-vector-icons/Ionicons";

import IconFooter from "react-native-vector-icons/FontAwesome5";
export default function Dashboard({ setSelectedComponent }) {
  const [isPressed, setIsPressed] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;

  const zoomOut = {
    0: {
      opacity: 0,
      scale: 0.5,
      translateX: 0,
    },
    0.5: {
      opacity: 0.7,
      scale: 0.7,
      translateX: 0,
    },
    1: {
      opacity: 1,
      scale: 1,
      translateX: 0,
    },
  };

  const fadeIn = (animatedValue) => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = (animatedValue) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const animateImages = () => {
    fadeIn(fadeAnim1);

    setTimeout(() => {
      fadeOut(fadeAnim1);
      fadeIn(fadeAnim2);
    }, 2000);

    setTimeout(() => {
      fadeOut(fadeAnim2);
      fadeIn(fadeAnim3);
    }, 4000);

    setTimeout(() => {
      fadeOut(fadeAnim3);
      setTimeout(animateImages, 1000);
    }, 6000);
  };

  useEffect(() => {
    animateImages();
  }, [fadeAnim1, fadeAnim2, fadeAnim3]);

  useEffect(() => {
    AsyncStorage.getItem("instructionsShown").then((value) => {
      if (!value) {
        setShowInstructions(true);
        AsyncStorage.setItem("instructionsShown", "true");
      }
    });
  }, []);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  const openFlash = () => {
    setSelectedComponent("flashcards");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Passing />

      <Pressable
        underlayColor="#c4661f"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
        onPress={openFlash}
      >
        <>
          <Text
            style={[styles.buttonText, isPressed && styles.buttonActiveText]}
          >
            cards
          </Text>
          <Text
            style={[styles.buttonText, isPressed && styles.buttonActiveText]}
          >
            <Cards name="cards" size={40} />
          </Text>
        </>
      </Pressable>
      <Animatable.Image
        animation={zoomOut}
        source={require("../assets/img.png")}
        style={{
          width: 500,
          height: 200,
          resizeMode: "contain",
          alignItems: "center",
        }}
      />
      <Modal visible={showInstructions} animationType="fade" transparent={true}>
        <View style={styles.overlay}>
          <ScrollView style={styles.modalContent}>
            <Text style={[styles.textModal, styles.buttonInfo]}>Welcome!</Text>

            <Text style={styles.textModal}>
              Start your language learning journey with our app, designed to
              teach you the 1000 most frequently used English words. Immerse
              yourself in an interactive experience where you not only learn
              words but also their translations.
            </Text>
            <Text style={styles.textModal}>
              The learning process involves a dynamic swipe mechanism - swipe
              right if you've mastered the word, and left if you're still
              working on it.
            </Text>

            <Text style={styles.textModal}>
              Your ultimate goal is to achieve perfect mastery of the
              vocabulary, reaching 100%. Track your progress and aim to raise
              your rating to the highest possible level.
            </Text>

            <Text style={styles.textModal}>
              Strengthen your English language skills, expand your vocabulary,
              and watch as your mastery grows. Embark on a transformational
              language learning adventure!
            </Text>

            <View style={styles.containerModal}>
              <Text style={[styles.textModal, styles.buttonInfo]}>
                Button image for transitioning to the card page:
              </Text>
              <Pressable style={styles.button}>
                <Text style={[styles.buttonText]}>cards</Text>
                <Text style={[styles.buttonText]}>
                  <Cards name="cards" size={40} />
                </Text>
              </Pressable>

              <Text style={[styles.textModal, styles.buttonInfo]}>
                Swipe the card to the right three times to fully memorize the
                new word.
              </Text>
              <Text style={[styles.textModal, styles.buttonInfo]}>
                <Animated.View style={{ opacity: fadeAnim1 }}>
                  <StarOutline name="star-outline" size={30} color="#f9d479" />
                </Animated.View>

                <Animated.View style={{ opacity: fadeAnim2 }}>
                  <StarHalf name="star-half-sharp" size={32} color="#f9d479" />
                </Animated.View>

                <Animated.View style={{ opacity: fadeAnim3 }}>
                  <Star name="star-sharp" size={32} color="#f9d479" />
                </Animated.View>
              </Text>

              <Text style={[styles.textModal, styles.buttonInfo]}>
                Button image for accessing the personal account:
              </Text>
              <Text style={[styles.textModal, styles.buttonInfo]}>
                <Pressable underlayColor="#c4661f" style={styles.button2}>
                  <Text style={styles.buttonText}>
                    <IconFooter name="user" size={40} />
                  </Text>
                </Pressable>
              </Text>
            </View>
            <Pressable
              style={[styles.closeButton]}
              onPress={() => setShowInstructions(false)}
              underlayColor="#c4661f"
            >
              <Text
                style={[
                  {
                    color: "#a9b388",
                  },
                  styles.buttonText,
                ]}
              >
                Good luck!
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    fontFamily: "vidaloka",
    fontSize: 18,
    backgroundColor: "#fefae0",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInfo: {
    alignItems: "center",
    textAlign: "center",
  },
  modalContent: {
    padding: 20,
    paddingBottom: 30,
    borderRadius: 20,
    width: "96%",
    textAlign: "center",
    margin: 10,
    borderWidth: 2,
    borderColor: "#5f6f52",
    textAlign: "center",
    backgroundColor: "#fefae0",
    color: "#783d19",
  },
  text: {
    fontFamily: "vidaloka",
    fontSize: 20,
    textAlign: "center",
    color: "#5f6f52",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#c4661f",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  closeButton: {
    borderRadius: 50,
    padding: 15,
    marginTop: 50,
    marginBottom: 150,
    marginLeft: 60,
    marginRight: 60,
    alignItems: "center",
    backgroundColor: "#5f6f52",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#f9ebc7",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "vidaloka",
  },
  buttonActiveText: {
    color: "#783d19",
  },
  textModal: {
    fontSize: 18,
    color: "#783d19",
    fontFamily: "vidaloka",
    margin: 5,
    textAlign: "justify",
  },
  button2: {
    backgroundColor: "#a9b388",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 16,
    paddingLeft: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    width: 100,
  },
  containerModal: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
  },
});
