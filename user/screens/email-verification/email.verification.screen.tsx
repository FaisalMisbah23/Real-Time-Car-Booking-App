import SignInText from "@/components/login/signin.text";
import { windowHeight } from "@/themes/app.constant";
import AuthContainer from "@/utils/container/auth-container";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "../verification/styles";
import color from "@/themes/app.colors";
import OTPTextInput from "react-native-otp-textinput";
import Button from "@/components/common/button";
import { router, useLocalSearchParams } from "expo-router";
import { external } from "@/styles/external.style";
import { commonStyles } from "@/styles/common.style";
import { useState } from "react";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage"


export default function EmailVerificationScreen() {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useLocalSearchParams() as any;
    const parsedUser = JSON.parse(user)

    const handleSubmit = async () => {
        setLoading(true)
        const otpNumbers = `${otp}`;
        await axios.put(`${process.env.EXPO_PUBLIC_SERVER_URL}/email-otp-verify`, {
            token: parsedUser.token,
            otp: otpNumbers
        }).then(async (res) => {
            setLoading(false)
            await AsyncStorage.setItem("accessToken", res.data.accessToken);
            router.push("/(tabs)/home");
        }).catch((error) => {
            setLoading(false)
            Toast.show(error.message, {
                placement: "bottom",
                type: "danger"

            })
        })
    }

    return (
        <AuthContainer
            topSpace={windowHeight(240)}
            imageShow={true}
            container={
                <View>
                    <SignInText

                        title="Email Verification"
                        subtitle="Check your email address for the otp!" />
                    <OTPTextInput
                        handleTextChange={(code) => setOtp(code)}
                        inputCount={4}
                        textInputStyle={style.otpTextInput}
                        tintColor={color.subtitle}
                        autoFocus={false}
                    />
                    <View style={[external.mt_30]}>
                        <Button
                            title="Verify"
                            onPress={() => handleSubmit()}
                            disabled={loading}
                        />
                    </View>
                    <View style={[
                        external.pt_10,
                        external.Pb_10,
                        { flexDirection: "row", gap: 5, justifyContent: "center" }
                    ]}>
                        <Text style={[commonStyles.regularText]}>
                            Not Received yet?
                        </Text>
                        <TouchableOpacity>
                            <Text style={[style.signUpText, { color: "#000" }]}>
                                Resend it
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            }
        />
    )
}