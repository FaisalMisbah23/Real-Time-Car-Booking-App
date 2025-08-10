import SignInText from "@/components/login/signin.text";
import { windowHeight } from "@/themes/app.constant";
import AuthContainer from "@/utils/container/auth-container";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import color from "@/themes/app.colors";
import OTPTextInput from "react-native-otp-textinput";
import Button from "@/components/common/button";
import { router } from "expo-router";
import { external } from "@/styles/external.style";
import { commonStyles } from "@/styles/common.style";

export default function OtpVerificationScreen() {
    return (
        <AuthContainer
            topSpace={windowHeight(240)}
            imageShow={true}
            container={
                <View>
                    <SignInText

                        title="OTP Verification"
                        subtitle="Check your phone number for the otp!" />
                    <OTPTextInput
                        handleTextChange={(code) => console.log(code)}
                        inputCount={4}
                        textInputStyle={style.otpTextInput}
                        tintColor={color.subtitle}
                        autoFocus={false}
                    />
                    <View style={[external.mt_30]}>
                        <Button
                            title="Verify"
                            onPress={() => router.push("/(tabs)/home")}
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