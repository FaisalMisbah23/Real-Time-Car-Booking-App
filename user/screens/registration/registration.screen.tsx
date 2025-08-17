import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '@/themes/app.constant';
import { useTheme } from "@react-navigation/native";
import TitleView from "@/components/signup/title.view";
import Input from '@/components/common/input';
import Button from '@/components/common/button';
import color from '@/themes/app.colors';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';

export default function RegistrationScreen() {
  const { user } = useLocalSearchParams() as any;
  const parsedUser = JSON.parse(user);
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/email-otp-request`, {
      userId: parsedUser.id, name: formData.name, email: formData.email
    }).then((res) => {
      setLoading(false)
      const userData: any = {
        id: parsedUser.id,
        name: formData.name,
        email: formData.email,
        phone_number: parsedUser.phone_number,
        token: res.data.token
      };
      router.push({
        pathname: "/(routes)/email-verification",
        params: { user: JSON.stringify(userData) }
      })
    }).catch((error) => {
      setLoading(false)
      console.log(error)
    })
  }

  const { colors } = useTheme();

  const [emailFormatWarning, setEmailFormatWarning] = useState("")
  const [showWarning, setShowWarning] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  })

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value
    }))
  }
  return (
    <ScrollView>
      <Text
        style={{
          fontFamily: "TT-Octosquares-Medium",
          fontSize: windowHeight(25),
          paddingTop: windowHeight(50),
          textAlign: "center"
        }}
      >Ride Wave</Text>
      <View
        style={{ padding: windowWidth(20) }}>
        <View style={[styles.subView, { backgroundColor: colors.background }]}>
          <View style={styles.space}>
            <TitleView
              title="Create you account"
              subTitle="Explore your life by joining Ride Wave"
            />
            <Input
              title='Name'
              placeholder='Enter your name'
              value={formData?.name}
              onChangeText={(text) => handleChange("name", text)}
              showWarning={showWarning && formData.name === ""}
              warning='Please enter your name!'
            />
            <Input
              title='Phone Number'
              placeholder='Enter your phone number'
              value={parsedUser?.phone_number}
              disabled={true}
            />

            <Input
              title='Email'
              placeholder='Enter your email'
              value={formData?.email}
              onChangeText={(text) => handleChange("email", text)}
              showWarning={(showWarning && formData.email === "") || emailFormatWarning !== ""}
              warning={emailFormatWarning ? 'Please enter your email!' :
                "Please enter a validate email!"
              }
              emailFormatWarning={emailFormatWarning}
            />
            <View style={styles.margin}>
              <Button
                title='Next'
                backgroundColor={color.buttonBg}
                textColor={color.whiteColor}
                onPress={() => handleSubmit()}
                disabled={loading}
              />
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  subView: {
    height: "100%",
  },
  space: {
    marginHorizontal: windowWidth(4),
  },
  margin: {
    marginVertical: windowHeight(12),
  },
});