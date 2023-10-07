import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Linking,
  Pressable,
  Share as ShareModule,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/AntDesign";
import Mail from "react-native-vector-icons/AntDesign";
import Share from "react-native-vector-icons/Entypo";
import Info from "react-native-vector-icons/FontAwesome5";

const PersonalCabinet = ({
  setSelectedComponent,
  setIsPersonalCabinetOpen,
}) => {
  const [avatar, setAvatar] = useState(null);

  const openPersonalCabinet = () => {
    setIsPersonalCabinetOpen(true);
  };

  useEffect(() => {
    openPersonalCabinet();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access media library denied");
        return;
      }
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
      <View style={styles.userPhotoContainer}>
        <Pressable onPress={selectAvatar} style={styles.circularPlaceholder}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.buttonText}>
              <Icon name="photo-video" size={50} />
            </Text>
          )}
        </Pressable>
      </View>
      <Text style={styles.heading}>Personal Cabinet</Text>
      <View style={styles.userInfo}>
        <Text style={styles.text}>name: John Doe</Text>
        <Text style={styles.text}>email: johndoe@example.com</Text>
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
          >
            <Text style={styles.iconText}>
              <Icon2 name="logout" size={25} />
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fefae0",
  },
  heading: {
    fontFamily: "vidaloka",
    fontSize: 24,
    fontWeight: "bold",
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
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    color: "#783d19",
    fontFamily: "vidaloka",
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 18,
  },
  userPhotoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginBottom: 20,
    textAlign: "center",
    color: "#783d19",
  },
  buttonText: {
    fontFamily: "vidaloka",
    position: "relative",
    left: 45,
    top: 45,
    color: "#783d19",
  },
  circularPlaceholder: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#f9ebc7",
    borderRadius: 75,
    textAlign: "center",
    width: 150,
    height: 150,
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
    marginTop: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconText: {
    marginRight: 10,
    color: "#783d19",
  },
});

export default PersonalCabinet;
