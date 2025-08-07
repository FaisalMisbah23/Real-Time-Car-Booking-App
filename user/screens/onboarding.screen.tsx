import { View, Image, ImageBackground, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import color from '@/themes/app.colors'
import Swiper from 'react-native-swiper'
import { styles } from "./styles"
import { slides } from '@/configs/constants'
import Images from '@/utils/images'
import { BackArrow } from '@/utils/icons'
import { router } from 'expo-router'

export default function onBoardingScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: color.whiteColor }}>
            <Swiper
                activeDotStyle={styles.activeStyle}
                removeClippedSubviews={true}
                paginationStyle={styles.paginationStyle}
            >
                {slides.map((slide: any, index: number) => (
                    <View style={[styles.slideContainer]} key={index}>
                        <Image style={styles.imageBackground}
                            source={slide.image}
                        />
                        <View style={[styles.imageBgView]}>
                            <ImageBackground resizeMode='stretch'
                                style={styles.img}
                                source={Images.bgOnboarding}
                            >
                                <Text style={styles.title}>{slide.text} </Text>
                                <Text style={styles.description}>{slide.description} </Text>
                                <TouchableOpacity
                                    style={styles.backArrow}
                                    onPress={() => router.push("/(router)/login")}>
                                    <BackArrow />
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    </View>
                ))}
            </Swiper>
        </View>
    )
}