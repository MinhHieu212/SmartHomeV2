import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectMessage } from "../redux/voiceSlice/voiceSlide";

const VoiceScreen = () => {
  const message = useSelector(selectMessage);

  return (
    <SafeAreaView className="flex-1 bg-white mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name="Voice AI"></Header>
      <ScrollView>
        <View className="flex-1 px-3 pb-10 h-[75vh] items-center mt-3 justify-center">
          <View className="absolute top-10">
            <ScrollView horizontal>
              <View className="border-2 p-1 flex-row items-center rounded-2xl mx-5 border-blue-400">
                {message ? (
                  <Text className="font-semibold text-lg text-gray-400 capitalize px-3">
                    {message}
                  </Text>
                ) : (
                  <Text className="font-semibold px-3 text-lg text-gray-400">
                    No message available
                  </Text>
                )}
              </View>
            </ScrollView>
          </View>

          <Image source={require("../assets/VoiceImage.png")}></Image>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VoiceScreen;

const styles = StyleSheet.create({});
