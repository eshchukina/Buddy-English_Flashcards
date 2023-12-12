import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Linking,
  Pressable,
  Share as ShareModule,
  Image,
  SafeAreaView,
  Button, // Add this line to import the Image component
} from "react-native";
import { Dimensions } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const { width: screenWidth } = Dimensions.get('window');
const isSmallScreen = screenWidth < 375; 
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import ModalSetting from "./ModalSetting";
import Setting from "react-native-vector-icons/SimpleLineIcons";
import Icon2 from "react-native-vector-icons/AntDesign";
import Mail from "react-native-vector-icons/AntDesign";
import Share from "react-native-vector-icons/Entypo";
import Info from "react-native-vector-icons/FontAwesome5";
import { useUser } from "@clerk/clerk-react";

import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
import SignInWithOAuth from "./SignInWithOAuth";

import * as SecureStore from "expo-secure-store";

import Home from "./Home";
import Home1 from "./Home1";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();

  const removeAvatarFromStorage = async () => {
    try {
      await AsyncStorage.removeItem("avatarURI");
      setAvatar(null);
    } catch (error) {
      console.error("Error in AsyncStorage:", error);
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <TouchableHighlight
      underlayColor="#c4661f"
      style={styles.button}
      onPress={() => {
        removeAvatarFromStorage();

        signOut();
      }}
    >
      <Text style={styles.iconText}>
        <Icon2 name="logout" size={25} />
      </Text>
    </TouchableHighlight>
  );
};

const PersonalCabinet = ({
  setSelectedComponent,
  setIsPersonalCabinetOpen,
}) => {
  const [avatar, setAvatar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openPersonalCabinet = () => {
    setIsPersonalCabinetOpen(true);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    openPersonalCabinet();
  }, []);

  const saveAvatarToStorage = async (uri) => {
    try {
      await AsyncStorage.setItem("avatarURI", uri);
    } catch (error) {
      console.error("Error saving avatar URI:", error);
    }
  };

  const loadAvatarFromStorage = async () => {
    try {
      const uri = await AsyncStorage.getItem("avatarURI");
      if (uri) {
        setAvatar(uri);
      }
    } catch (error) {
      console.error("Error loading avatar URI:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access media library denied");
        return;
      }
      loadAvatarFromStorage();
    })();
  }, []);
  const selectAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setAvatar(result.uri);
        saveAvatarToStorage(result.uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const openInfo = () => {
    setSelectedComponent("info");
  };

  const handlePressIn = () => {};

  const handlePressOut = () => {};

  const sendEmail = () => {
    const email = "frankkat377@gmail.com";
    const subject = "Question from the app";
    const body = "Hello, developer!";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoLink);
  };

  const shareApp = () => {
    const message = "Try this amazing app!";
    const url = "https://example.com";

    ShareModule.share({
      message: message,
      url: url,
      title: "Share the App",
    })
      .then((result) => {
        if (result.action === ShareModule.sharedAction) {
          if (result.activityType) {
            console.log("Sharing was successful");
          } else {
            console.log("Sharing was canceled");
          }
        } else if (result.action === ShareModule.dismissedAction) {
          console.log("Sharing was dismissed");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
      >
        <SafeAreaView style={styles.wrapperInfo}>
          <View style={styles.userPhotoContainer}>
            <Pressable
              onPress={selectAvatar}
              style={styles.circularPlaceholder}
            >
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
              ) : (
                <Home1 />
              )}
            </Pressable>
          </View>
          <View>
            <Text style={styles.heading}>Personal Cabinet</Text>
            <View style={styles.userInfo}>
              <Home />
            </View>
          </View>

          <View style={styles.iconsRow}>
            <TouchableHighlight
              underlayColor="#c4661f"
              style={styles.buttonInfo}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={openInfo}
            >
              <Text style={styles.iconText}>
                <Info name="info" size={25} />
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor="#c4661f"
              style={styles.button}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={sendEmail}
            >
              <Text style={styles.iconText}>
                <Mail name="mail" size={25} />
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor="#c4661f"
              style={styles.button}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={shareApp}
            >
              <Text style={styles.iconText}>
                <Share name="share" size={25} />
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#c4661f"
              style={styles.button}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={openModal}
            >
              <Text style={styles.iconText}>
                <Setting name="settings" size={25} />
              </Text>
            </TouchableHighlight>

            <SignOut />
          </View>
        </SafeAreaView>
      </ClerkProvider>
      <ModalSetting modalVisible={modalVisible} closeModal={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefae0",
  },

  heading: {
    fontFamily: "vidaloka",
    fontSize: 24,
    marginBottom: 20,
    color: "#c4661f",
  },
  button: {
    backgroundColor: "#b99470",
    borderRadius: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 1,
    paddingLeft: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonInfo: {
    backgroundColor: "#b99470",
    borderRadius: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 9,
    paddingLeft: 18,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    textAlign: "center",
  },
  userInfo: {
    position: "relative]",
    marginBottom: 20,
  },

  userPhotoContainer: {
    width: isSmallScreen ? heightPercentageToDP('20%') : 200,
    height: isSmallScreen ? heightPercentageToDP('20%') : 200,

    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 20,
    textAlign: "center",
    color: "#783d19",
  },

  circularPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f9ebc7",
    borderRadius: 75,
    textAlign: "center",

    overflow: "hidden",
  },
  avatarImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  iconsRow: {
    flexDirection: "row",
    textAlign: "center",
    marginTop: isSmallScreen ? heightPercentageToDP('5%') : 100,
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  iconText: {
    marginRight: 10,
    color: "#783d19",
  },
  wrapperInfo: {
    display: "flex",
    alignItems: "center",
  },
});

export default PersonalCabinet;
