import OnBoardingScreen from "@/screens/onboarding/onboarding.screen";
import { StyleSheet } from "react-native";
import { View } from "react-native";
export default function index() {
  return (
    <View style={styles.container}>
      <OnBoardingScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1 // important
  }
})