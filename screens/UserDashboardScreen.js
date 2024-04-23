import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const UserDashboardScreen = ({route}) => {
    const {userName} = route.params;

  return (
    <SafeAreaView className="flex-1 bg-white mb-[70]">
    <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
    <Header name={userName}></Header>
    <ScrollView>
      <View className="flex-1 px-3 pb-10 h-[75vh]  items-center mt-3 justify-center">
            <Text className = "text-blue-500 text-xl">UserDashboardScreen</Text>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default UserDashboardScreen

const styles = StyleSheet.create({})