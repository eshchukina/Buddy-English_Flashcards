import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import Medal from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Passing = ({ radialProgressPercentage }) => {
  const [storedPercentage, setStoredPercentage] = useState(null);
  

  useEffect(() => {
    const loadPercentage = async () => {
      try {
        const storedPercentage = await AsyncStorage.getItem("percentage");
        if (storedPercentage !== null) {
          setStoredPercentage(parseFloat(storedPercentage));
        }
      } catch (error) {
        console.error("Error loading percentage from AsyncStorage:", error);
      }
    };

    loadPercentage();
  }, []);

  const getMedalColor = () => {
    if (storedPercentage > 1 && storedPercentage <= 33) {
      return {
        color: "#cd7f32",
        level: " Your level: Novice",
        text: "A good start, everything is ahead!",
      };
    } else if (storedPercentage >= 34 && storedPercentage <= 66) {
      return {
        color: "#c0c0c0",
        level: "Your level: Intermediate",
        text: "Excellent, keep it up!",
      };
    } else if (storedPercentage >= 67 && storedPercentage <= 99) {
      return {
        color: "#FFD700",
        level: "Your level: Advanced",
        text: "Incredible, the finish line is near!",
      };
    } else if (storedPercentage >= 100) {
      return { color: "#FFD700", level: "Expert", text: "You've done it all!" };
    } else {
      return {
        color: "#cd7f32",
        dispaly: "none",
        text: "Let's get started. Good luck!",
      };
    }
  };

  return (
    <View contentContainerStyle={styles.container}>
      <Text style={styles.text}>{getMedalColor().text}</Text>
      <Text style={styles.text}>{getMedalColor().level}</Text>
      <Text
        style={[
          styles.textIcon,
          { color: getMedalColor().color, display: getMedalColor().dispaly },
        ]}
      >
        <Medal name="medal" size={60} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  text: {
    fontFamily: "vidaloka",
    fontSize: 20,
    textAlign: "center",
    color: "#5f6f52",
    textAlign: "center",
  },
  textIcon: {
    marginTop: 20,
    textAlign: "center",
  },
});

export default Passing;
