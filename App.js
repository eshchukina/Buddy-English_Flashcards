

import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import * as SplashScreen from "expo-splash-screen"; // Изменили импорт
import Footer from "./components/Footer";
import PersonalCabinet from "./components/PersonalCabinet";
import Header from "./components/Header";
import DownloadPage from "./components/DownloadPage";
import Dashboard from "./components/Dashboard";
import Info from "./components/Info";
import * as Font from "expo-font";
import FlashcardDeck from "./components/FlashcardDeck";


const fonts = () =>
  Font.loadAsync({
    vidaloka: require("./assets/fonts/vidaloca.ttf"),
  });

export default function App() {
  const [selectedComponent, setSelectedComponent] = useState("download");
  const [font, setFont] = useState(false);

  const toggleComponent = (component) => {
    setSelectedComponent(component);
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
            <FlashcardDeck setSelectedComponent={setSelectedComponent} />
            <Footer setSelectedComponent={setSelectedComponent} />
          </>
        ) : selectedComponent === "personalcabinet" ? (
          <>
            <PersonalCabinet setSelectedComponent={setSelectedComponent} />
            <Footer setSelectedComponent={setSelectedComponent} />
          </>
        ) 
        : selectedComponent === "info" ? (
          <>
            <Info setSelectedComponent={setSelectedComponent} />
            <Footer setSelectedComponent={setSelectedComponent} />
          </>
        ) 
        
        
        
        : null}

        <StatusBar style="auto" />
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
