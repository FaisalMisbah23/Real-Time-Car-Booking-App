import { View, Text, Image } from 'react-native'
import React from 'react'
import AuthContainer from '@/utils/container/auth-container'
import { windowHeight } from '@/themes/app.constant'
import styles from './style'
import SignInText from '@/components/login/signin.text'
import PhoneNumberInput from '@/components/login/phone-number.input'
import Button from '@/components/common/button'
import { external } from '@/styles/external.style'
import { router } from 'expo-router'

export default function LoginScreen() {
  return (
    <AuthContainer topSpace={windowHeight(150)} imageShow={true}
      container={
        <View>
          <View>
            <Image style={styles.transformLine} />
            <SignInText />
            <View style={[external.mt_25,external.Pb_10]}>
              <PhoneNumberInput />
              <View style={[external.mt_25,external.Pb_15]}>
                <Button
                title="Get Opt"
                onPress={()=>router.push("/(routes)/otp-verification")}
                />
              </View>
            </View>
          </View>
        </View>
      } 
    />
  )
}