import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button, Text, StyleSheet, TouchableOpacity
, } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./useWarmUpBrowser";
 
WebBrowser.maybeCompleteAuthSession();
 
const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
 
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    ><Text style={styles.buttonText}>sign in with google</Text>
      </TouchableOpacity>

  );
  }
  const styles = StyleSheet.create({
 
    button: {
      backgroundColor: "#a9b388",
      borderRadius: 15,
      paddingTop: 8,
      paddingBottom: 8,
      paddingRight: 13,
      paddingLeft: 13,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 5,
    },
   
    buttonText: {
      color: "#5f6f52",
      fontSize:20,
      fontFamily: "vidaloka",

    },
    buttonActiveText: {
      color: "#783d19",
      fontFamily: "vidaloka",

    },
  });

export default SignInWithOAuth;