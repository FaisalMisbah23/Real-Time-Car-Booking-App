import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { useEffect, useState } from "react"

export default function useGetUserData() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<UserType>()

    useEffect(() => {
        const getLoggedInUserData = async () => {
            const accessToken = await AsyncStorage.getItem("accessToken");
            await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then((res) => {
                setUser(res.data.user)
                setLoading(false);
            }).catch((error) => {
                console.log(error)
                setLoading(false);
            })
        }
        getLoggedInUserData();
    }, [])
    return { user, loading }
}