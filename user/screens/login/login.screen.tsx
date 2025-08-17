import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import AuthContainer from '@/utils/container/auth-container'
import { windowHeight } from '@/themes/app.constant'
import styles from './style'
import SignInText from '@/components/login/signin.text'
import PhoneNumberInput from '@/components/login/phone-number.input'
import Button from '@/components/common/button'
import { external } from '@/styles/external.style'
import { router } from 'expo-router'
import { useToast } from 'react-native-toast-notifications'
import axios from "axios"

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+92");

  const toast = useToast();

  const handleSubmit = async () => {
    if (phoneNumber === "" || countryCode === "") {
      toast.show("Please fill all the fields", {
        placement: 'bottom'
      })
    } else {
      setLoading(true)
      const phone_number = `+${countryCode}${phoneNumber}`;
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/registration`, { phone_number: phone_number }).then((res) => {
        setLoading(false)
        router.push({ pathname: "/(routes)/otp-verification", params: { phone_number } })
      }).catch((error) => {
        setLoading(false)
        toast.show("Something went wrong! please re check your phone number", {
          type: "danger",
          placement: "bottom"
        })
      })
    }
  }

  return (
    <AuthContainer topSpace={windowHeight(150)} imageShow={true}
      container={
        <View>
          <View>
            <Image style={styles.transformLine} />
            <SignInText />
            <View style={[external.mt_25, external.Pb_10]}>
              <PhoneNumberInput
                phoneNumber={phoneNumber}
                countryCode={countryCode}
                setPhoneNumber={setPhoneNumber}
                setCountryCode={setCountryCode}
              />
              <View style={[external.mt_25, external.Pb_15]}>
                <Button
                  title="Get Opt"
                  onPress={() => handleSubmit()}
                  disabled={loading}
                />
              </View>
            </View>
          </View>
        </View>
      }
    />
  )
}