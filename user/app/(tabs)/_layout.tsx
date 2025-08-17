import { View, Text } from 'react-native'
import React from 'react'
import useGetUserData from '@/hooks/useGetUserData'

export default function _layout() {
  const { user, loading } = useGetUserData();

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>{user?.name}</Text>
    </View>
  )
}