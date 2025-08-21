import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { external } from '@/styles/external.style'
import { windowHeight, windowWidth } from '@/themes/app.constant'
import MapView, { Marker } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions";
import styles from "./styles"
import { Clock, LeftArrow, PickLocation, PickUpLocation } from '@/utils/icons'
import { router } from 'expo-router'
import color from '@/themes/app.colors'
import DownArrow from '@/assets/icons/downArrow'
import PlaceHolder from '@/assets/icons/placeHolder'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from 'axios'

export default function RidePlanScreen() {
    const [places, setPlaces] = useState<any>([])
    const [query, setQuery] = useState("")
    const [region, setRegion] = useState<any>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: -0.0421,
    })
    const [marker, setMarker] = useState<any>(null)
    const [currentLocation, setCurrentLocation] = useState<any>(null)
    const [distance, setDistance] = useState<any>(null)
    const [locationSelected, setLocationSelected] = useState(false)
    const [selectedVehicle, setSelectedVehicle] = useState("car")
    const [tarvelTime, setTarvelTime] = useState({
        driving: null,
        walking: null,
        bicycling: null,
        transit: null
    })
    const [keyboardAvoidingHeight, setKeyboardAvoidingHeight] = useState(false)

    const fetchPlaces = async (input: any) => {
        try {
            const res = await axios.get(`https://maps.googleapi.com/maps/api/place/autocomplete/json`, {
                params: {
                    input,
                    key: process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API,
                    language: "en"
                }
            })
            setPlaces(res.data.predictions);
        } catch (error) {
            console.log(error)
        }
    }

    const debouncedFetchPlaces = useCallback(_.debounce(fetchPlaces, 100), [])

    useEffect(() => {
        if (query.length > 2) {
            debouncedFetchPlaces(query)
        } else {
            setPlaces([])
        }
    }, [query, debouncedFetchPlaces])


    const handleInputChange = (text: any) => {
        setQuery(text)
    }

    return (
        <KeyboardAvoidingView
            style={[external.fx_1]}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View>
                <View
                    style={{ height: windowHeight(!keyboardAvoidingHeight ? 500 : 300) }}>
                    <MapView
                        style={{ flex: 1 }}
                        region={region}
                        onRegionChange={(region) => setRegion(region)}>
                        {marker && <Marker coordinate={marker} />}
                        {currentLocation && <Marker coordinate={currentLocation} />}
                        {currentLocation && marker && (
                            <MapViewDirections
                                origin={currentLocation}
                                destination={marker}
                                apikey={process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API!}
                                strokeWidth={4}
                                strokeColor='blue'
                            />
                        )}

                    </MapView>
                </View>
            </View>
            <View style={styles.contentContainer} >
                <View style={[styles.container]}>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <LeftArrow />
                        </TouchableOpacity>
                        <Text
                            style={{
                                margin: "auto",
                                fontSize: windowHeight(12),
                                fontWeight: "600"

                            }}>
                            Plan you ride
                        </Text>
                    </View>
                    {/* picking up time */}
                    <View style={{
                        width: windowWidth(200),
                        height: windowHeight(28),
                        borderRadius: 20,
                        backgroundColor: color.lightGray,
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: windowHeight(10),
                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Clock />
                            <Text style={{ fontSize: windowHeight(12), fontWeight: "600", paddingHorizontal: 8 }}>
                                Pick up now
                            </Text>
                            <DownArrow />

                        </View>
                    </View>
                    {/* picking up location */}
                    <View style={{
                        borderWidth: 2,
                        borderColor: "#000",
                        borderRadius: 15,
                        marginBottom: windowHeight(15),
                        paddingHorizontal: windowWidth(15),
                        paddingVertical: windowHeight(5),
                    }}>

                        <View style={{ flexDirection: "row" }}>
                            <PickLocation />

                            <View style={{
                                width: Dimensions.get("window").width * 1 - 110,
                                borderBottomWidth: 1,
                                borderBottomColor: "#999",
                                marginLeft: 5,
                                height: windowHeight(20),
                            }}>
                                <Text style={{
                                    color: "#2371F0",
                                    fontSize: 18,
                                    paddingLeft: 5,
                                }}>
                                    Current Location
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            paddingVertical: 12
                        }}>
                            <PlaceHolder />
                            <View style={{
                                marginLeft: 5,
                                width: Dimensions.get("window").width * 1 - 110
                            }}>
                                <GooglePlacesAutocomplete
                                    placeholder="Where to?"
                                    onPress={(data, details = null) => {
                                        setKeyboardAvoidingHeight(true)
                                        setPlace({
                                            description: data.description,
                                            place_id: data.place_id
                                        })
                                    }}
                                    query={{
                                        key: `${process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API!}`,
                                        language: "en"
                                    }}
                                    styles={{
                                        textInputContainer: {
                                            width: "100"

                                        },
                                        textInput: {
                                            height: 38,
                                            color: "#000",
                                            fontSize: 16
                                        },
                                        predefinedPlacesDescription: {
                                            color: "#000"
                                        }
                                    }}

                                    textInputProps={{
                                        onChangeText: (text) => handleInputChange(text),
                                        value: query,
                                        onFocus: () => setKeyboardAvoidingHeight(true)
                                    }}
                                    onFail={(error) => console.log(error)}
                                    fetchDetails={true}
                                    debounce={200}
                                />
                            </View>
                        </View>
                    </View>
                    {/* last sessions */}
                    {places.map((place: any, index: number) => (
                        <Pressable
                            key={index}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: windowHeight(20)
                            }}
                        >
                            <PickUpLocation />
                            <Text style={{ paddingLeft: 15, fontSize: 18 }} >{place.description} </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}