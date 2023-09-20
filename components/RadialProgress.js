import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

const RadialProgress = ({ value }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(value);
  }, [value]);

  const radius = 70;
  const strokeWidth = 10;
  const fgColor = "#6c526f";
  const bgColor = "#f9ebc7";

  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke={fgColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
        />
      </Svg>
      <View style={styles.percentageContainer}>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  percentageContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontSize: 28,
    color: "#5f6f52",
  },
});

export default RadialProgress;
