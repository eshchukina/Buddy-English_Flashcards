import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,

} from "react-native";
import { Image } from "react-native";

import Swiper from 'react-native-swiper';


export default function DownloadPage({ setSelectedComponent }) {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const data = [
    {
      id: "1",
      text: "Welcome to the Buddy English App! ",
    },
    {
      id: "2",
      text: "Elevate your English language proficiency with our extensive collection of 3000 common words",
    },
    {
      id: "3",
      text: "Enhance your English language skills by swiping right for words you've mastered and swiping left for those you're still learning",
    },
    {
      id: "4",
      text: "With a collection of 3000 common words, gradually eliminate the words you haven't mastered yet",
    },
    {
      id: "5",
      text: "Start your journey towards English fluency today while effortlessly tracking your progress in mastering each word",
    },
  ];
  const handleButtonClick = () => {
    setSelectedComponent("dashboard");
  };

  const currentDataItem = data[currentPage];

  const renderPageIndicator = (index) => (
    <Pressable
      key={index}
      style={[
        styles.pageIndicator,
        currentPage === index && styles.activePageIndicator,
      ]}
      onPress={() => {
        flatListRef.current.scrollToIndex({ animated: true, index });
        setCurrentPage(index);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainBox}>
        <View style={styles.mainBox1}>
        <Image
  source={require("./logobe_1.png")}
  style={{ width: 100, height: 100, resizeMode: "contain", position: "absolute", top: 90 }}
/>
        </View>
      </View>

      <View style={styles.mainTextBox}>

        
        <View style={styles.flatListContainer}>
          <FlatList
            ref={flatListRef}
            data={data}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const contentOffset = event.nativeEvent.contentOffset.x;
              const pageIndex = Math.round(
                contentOffset / event.nativeEvent.layoutMeasurement.width
              );
              setCurrentPage(pageIndex);
            }}
          />

         {/* <Text style={styles.text}>{currentDataItem.text}</Text> 

         <View style={styles.pageIndicators}>
            {data.map((_, index) => renderPageIndicator(index))}
          </View>  */}


          
          <Swiper
        loop={false}
        showsPagination
        dotStyle={styles.dotStyle} 
    
  activeDotStyle={styles.activeDotStyle} 
        onIndexChanged={(index) => setCurrentPage(index)}
      >
        {data.map((item) => (
          <View key={item.id} style={styles.pageIndicators}>
             <Text style={styles.text}>{currentDataItem.text}</Text> 
          </View>
        ))}
      </Swiper>

          {currentPage === data.length - 1 && (
            <Pressable
              style={styles.button}
              underlayColor="#c4661f"
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleButtonClick}
            >
              <Text
                style={[
                  styles.buttonText,
                  isPressed ? styles.buttonTextActive : null,
                ]}
              >
                let's start
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    fontFamily: "vidaloka",
    fontSize: 18,
    backgroundColor: "#fefae0",
  },
  button: {
    position: "absolute",
    padding: 10,
    margin: 10,
    top: "20%",
    backgroundColor: "#a9b388",
    alignSelf: "center",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#b99470", // Цвет обычных точек
    marginHorizontal: 5,
  },
  activeDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#a9b388", // Цвет активных точек
    marginHorizontal: 5,
  },

 

  buttonText: {
    fontFamily: "vidaloka",
    fontSize: 16,
    color: "#5f6f52",
  },
  buttonTextActive: {
    color: "#783d19",
  },
  flatListContainer: {
    height: 300,
  },

  text: {
    fontFamily: "vidaloka",
    fontSize: 18,
    textAlign: "center",
    color: "#5f6f52",
  },

  mainTextBox: {
    marginTop: 100,
    padding: 10,
    textAlign: "center",
  },
  mainBox: {
    fontFamily: "vidaloka",
    fontSize: 20,
    maxWidth: "100%",
    height: 300,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#f9ebc7",
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "rgba(120, 125, 136, 0.5)",
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 2,
    shadowRadius: 10,
  },
  mainBox1: {
    fontFamily: "vidaloka",
    position: "relative",
    top: -20,
    fontSize: 20,
    maxWidth: "90%",
    height: "90%",
    paddingLeft: "45%",
    paddingRight: "45%",
    paddingBottom: "45%",
    paddingTop: 0,
    backgroundColor: "#b99470",
    marginTop: 0,
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "rgba(120, 125, 136, 0.5)",
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 2,
    shadowRadius: 10,
  },
  flatListContainer: {
    height: 300,
  },
  page: {
    width: "100%",
  },
  pageIndicators: {
    flexDirection: "row",
    justifyContent: "center",


},
  pageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#a9b388",
    marginHorizontal: 5,
  },
  activePageIndicator: {
    backgroundColor: "#b99470",
  },
});
