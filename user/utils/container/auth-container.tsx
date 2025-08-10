import { external } from "@/styles/external.style"
import { windowHeight, windowWidth } from "@/themes/app.constant"
import { ReactNode } from "react"
import { Image, ScrollView, Text, View } from "react-native"
import styles from "./style"
import Images from "../images"
type Props = {
    container: ReactNode,
    topSpace: any,
    imageShow: boolean
}

const AuthContainer = ({ container, topSpace, imageShow }: Props) => {
    return (
        <View style={[external.fx_1]}>
            {imageShow && (
                <Text
                    style={{
                        fontFamily: "TT-Octosquares-Medium",
                        fontSize: windowWidth(30),
                        textAlign: "center",
                        paddingTop: windowHeight(50),
                    }}>
                    Ride Wave
                </Text>
            )}
            <Image style={[styles.backgroundImage, { marginTop: topSpace }]}
                source={Images.authBg} />
            <View style={[styles.contentContainer]}>
                <View style={[styles.container]}>
                    <ScrollView
                    >
                        {container}
                    </ScrollView>

                </View>
            </View>
        </View >
    )
}

export default AuthContainer