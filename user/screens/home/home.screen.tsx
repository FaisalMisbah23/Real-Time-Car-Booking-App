import { View, Text } from 'react-native'
import React from 'react'
import styles from "./styles"
import { commonStyles } from '@/styles/common.style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { external } from '@/styles/external.style'
import LocationSearchBar from '@/components/location/location.search.bar'

export default function HomeScreen() {
    return (
        <View style={[commonStyles.flexContainer, { backgroundColor: "#fff" }]}>
            <SafeAreaView style={styles.container}>
                <View style={[external.p_5, external.ph_20]}>
                    <Text style={{
                        fontFamily: "TT-Octosquares-Medium",
                        fontSize: 25
                    }}>
                        Ride Wave
                    </Text>
                    <LocationSearchBar />
                </View>

            </SafeAreaView>
        </View>
    )
}