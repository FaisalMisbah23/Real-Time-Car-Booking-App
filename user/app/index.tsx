import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function index() {

  if (__DEV__) {
    // Show fetch requests in the console
    global._fetch = fetch;
    global.fetch = function (uri, options, ...args) {
      return global._fetch(uri, options, ...args).then((response) => {
        console.log('Fetch', { request: { uri, options, ...args }, response });
        return response;
      });
    };
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Failed to retrieve access token from async storage", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Redirect href={!isLoggedIn ? "/(routes)/onboarding" : "/(tabs)/home"} />
  );
}
