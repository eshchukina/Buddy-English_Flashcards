import React, { useContext, useEffect, useState } from "react";

import { useUser } from "@clerk/clerk-react";
import { Text, Image } from "react-native";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return (
      <Image
        source={{ uri: user.imageUrl }}
        style={{ width: 200, height: 200 }}
      />
    );
  }
}
