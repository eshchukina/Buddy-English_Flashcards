import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const HorizontalProgress = ({ value }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(value);
  }, [value]);

  const fgColor = "#6c526f";


  return (
    <View style={styles.container}>
      {percentage === 100 ? (
        <Image
          source={require("../assets/win.png")}
          style={{
            width: 100,
            resizeMode: "contain",
            alignItems: "center",
          }}
        />
      ) : (
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${percentage}%`, backgroundColor: fgColor },
            ]}
          />
        </View>
      )}
      <Text style={styles.percentageText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  progressBar: {
    width: "70%",
    height: 20,
    backgroundColor: "#f9ebc7",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  percentageText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#5f6f52",
  },
});

export default HorizontalProgress;
