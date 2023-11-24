import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import * as SplashScreen from "expo-splash-screen"; //
import Footer from "./components/Footer";
import PersonalCabinet from "./components/PersonalCabinet";
import Header from "./components/Header";
import DownloadPage from "./components/DownloadPage";
import Dashboard from "./components/Dashboard";
import Info from "./components/Info";
import * as Font from "expo-font";
import FlashcardDeck from "./components/FlashcardDeck";
import Toast from "react-native-toast-message";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const fonts = () =>
  Font.loadAsync({
    vidaloka: require("./assets/fonts/vidaloca.ttf"),
  });

export default function App() {
  const [selectedComponent, setSelectedComponent] = useState("download");
  const [font, setFont] = useState(false);
  const [swipedRightCount, setSwipedRightCount] = useState(0);
  const [isPersonalCabinetOpen, setIsPersonalCabinetOpen] = useState(false);

  const updateSwipedRightCount = (count) => {
    setSwipedRightCount(count);
  };

  const toggleComponent = (component) => {
    setSelectedComponent(component);
    showToast();
    console.log("всплывающее сообщение");
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Well done!",
      text2: `You've made ${swipedRightCount} correct swipes!`,

      style: {
        backgroundColor: "red",
        borderColor: "white",
      },
    });
  };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      await fonts();
      await SplashScreen.hideAsync();
      setFont(true);
    }

    prepare();
  }, []);

  useEffect(() => {
    if (swipedRightCount % 10 === 0 && swipedRightCount > 0) {
      showToast();
    }
  }, [swipedRightCount]);

  if (font) {
    return (
      <SafeAreaView style={styles.container}>
        {selectedComponent === "download" ? (
          <DownloadPage
            toggleComponent={toggleComponent}
            setSelectedComponent={setSelectedComponent}
          />
        ) : selectedComponent === "dashboard" ? (
          <>
            <Header />
            <Dashboard setSelectedComponent={setSelectedComponent} />
            <Footer setSelectedComponent={setSelectedComponent} />
          </>
        ) : selectedComponent === "flashcards" ? (
          <>
            <FlashcardDeck
              setSelectedComponent={setSelectedComponent}
              updateSwipedRightCount={updateSwipedRightCount}
            />
            <Footer setSelectedComponent={setSelectedComponent} />
          </>
        ) : selectedComponent === "personalcabinet" ? (
          <>
            <PersonalCabinet
              setSelectedComponent={setSelectedComponent}
              setIsPersonalCabinetOpen={setIsPersonalCabinetOpen}
            />
            <Footer
              setSelectedComponent={setSelectedComponent}
              isPersonalCabinetOpen={isPersonalCabinetOpen}
            />
          </>
        ) : selectedComponent === "info" ? (
          <>
            <Info setSelectedComponent={setSelectedComponent} />
            <Footer setSelectedComponent={setSelectedComponent} />
          </>
        ) : null}
        {/* <Button title="Показать уведомление" onPress={showToast} /> */}

        <StatusBar style="auto" />
        <Toast />
      </SafeAreaView>
    );
  } else {
    return null;
  }
  

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
