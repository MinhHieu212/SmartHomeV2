import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../components/Header'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const UserListScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView className="flex-1 bg-white mb-[70]">
    <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
    <Header name="User List"></Header>
    <ScrollView>
      <View className="flex-1 px-3 pb-10 h-[75vh]  items-center mt-3 justify-center">
            <Text className = "text-blue-500 text-xl">UserListScreen</Text>
            <TouchableOpacity onPress={() => navigation.navigate("UserDashBoard", { userName :  "User 1"})}>
              <Text className = "text-xl rounded-xl mt-5 px-4 py-2 bg-blue-400 text-white font-bold">User 1</Text>
            </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default UserListScreen

const styles = StyleSheet.create({})