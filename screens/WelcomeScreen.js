import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Alert,
  StatusBar,
} from "react-native";
import React from "react";

const WelcomeScreen = ({ navigation }) => {
  const handleScanQRCode = () => {
    Alert.alert(
      "",
      "Sorry, now this feature is enable",
      [
        {
          text: "Oke",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#d3f0f6]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <ImageBackground
        source={require("../assets/background.jpg")}
        className="flex-1"
        resizeMode="contain"
      >
        <View className="flex-1 justify-between my-14 items-center">
          <View>
            <Text className="text-3xl font-bold text-[#2666DE] mt-4 text-center w-[80vw]">
              Welcome back to the brilliance of your smart home!
            </Text>
          </View>

          {/* button login and Scan QR code */}
          <View>
            <View className="items-center justify-center mt-10">
              <TouchableOpacity
                className="w-[85vw] h-[55] bg-[#2666DE] shadow-lg shadow-slate-100 items-center justify-center rounded-xl"
                onPress={() => navigation.navigate("Login")}
              >
                <Text className="font-bold text-white text-lg">Login</Text>
              </TouchableOpacity>
            </View>
            <View className="items-center justify-center mt-3">
              <TouchableOpacity
                className="w-[85vw] h-[55] bg-white items-center justify-center rounded-xl"
                onPress={() => handleScanQRCode()}
              >
                <Text className="font-bold  text-lg">Scan QR code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
