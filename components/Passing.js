import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import * as Animatable from 'react-native-animatable';
import Medal from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Passing = ({ radialProgressPercentage }) => {
  const [storedPercentage, setStoredPercentage] = useState(null);

  useEffect(() => {
    // Load the percentage value from AsyncStorage when the component mounts
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
    if (storedPercentage > 1 && storedPercentage <= 34) {
      return { color: "#cd7f32", level: " Your level: Novice", text:"A good start, everything is ahead!"
    };
    } else if (storedPercentage >= 35 && storedPercentage <= 67) {
      return { color: "#c0c0c0", level: "Your level: Intermediate", text: "Excellent, keep it up!"
    };
    } else if (storedPercentage >= 68 && storedPercentage <= 98) {
      return { color: "#FFD700", level: "Your level: Advanced", text:"Incredible, the finish line is near!"
    };
    } 
    else if (storedPercentage > 99) {
        return { color: "#FFD700", level: "Expert" , text: "You've done it all!"
    };
      } 
    
    else {
      return { color: "#cd7f32",  dispaly: "none", text:"Soon, get started. Good luck!"





    };
    }
  };

  return (
    <View contentContainerStyle={styles.container}>
      <Text style={styles.text}>
     {getMedalColor().text}
      </Text>
      <Text style={styles.text}>
   {getMedalColor().level}
      </Text>
      <Text style={[styles.textIcon, { color: getMedalColor().color, display: getMedalColor().dispaly }]}>
        <Medal name="medal" size={50} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign:"center",
  },
  text: {
    fontFamily: "vidaloka",
    fontSize: 20,
    textAlign: "center",
    color: "#5f6f52",
    textAlign:"center",

  },
  textIcon: {
    marginLeft: 10,
    textAlign:"center",

  },
});

export default Passing;
