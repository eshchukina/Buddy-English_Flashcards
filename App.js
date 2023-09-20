import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView} from "react-native";
import AppLoading from "expo-app-loading";
import Footer from "./components/Footer";
import PersonalCabinet from "./components/PersonalCabinet";
import DownloadData from "./components/DownloadData";
import Header from "./components/Header";
import DownloadPage from "./components/DownloadPage";
import Dashboard from "./components/Dashboard";

import * as Font from "expo-font";

const fonts = () =>
  Font.loadAsync({
    vidaloka: require("./assets/fonts/vidaloca.ttf"),
  });

export default function App() {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");
  const [font, setFont] = useState(false);

  const toggleComponent = (component) => {
    setSelectedComponent(component);
  };

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
            <DownloadData setSelectedComponent={setSelectedComponent} />
            <Footer setSelectedComponent={setSelectedComponent} />
          </>
        ) : selectedComponent === "personalcabinet" ? (
          <>
            <PersonalCabinet setSelectedComponent={setSelectedComponent} />
            <Footer setSelectedComponent={setSelectedComponent} />
          </>
        ) : null}

        <StatusBar style="auto" />
      </SafeAreaView>
    );
  } else {
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={() => setFont(true)}
        onError={(error) => console.error(error)} 
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
