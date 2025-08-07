import React, { useState } from "react";
import { Redirect } from "expo-router";

export default function index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("🚀 ~ index ~ isLoggedIn:", isLoggedIn)
  return (
    <>
      {isLoggedIn ? (
        <Redirect href="/(tabs)/home" />
      ) : (
        <Redirect href="/(routes)/onboarding" />
      )}
    </>
  );
}
