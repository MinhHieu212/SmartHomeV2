import { View, Text, Modal, Pressable, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectMessage } from "../redux/voiceSlice/voiceSlide";
import LottieView from "lottie-react-native";

export default function VoiceModal({
  modalVisible = false,
  setModalVisible = () => {},
}) {
  const message = useSelector(selectMessage);

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 bg-slate-300">
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 items-center bg-blue-100 bg-transparent z-0 justify-center">
          <View className="w-[70%] h-[300] items-center rounded-2xl z-10 relative">
            <View className="w-[300] h-[180] items-center justify-center">
              <LottieView
                style={{
                  flex: 1,
                  width: 350,
                  height: 200,
                }}
                source={require("../assets/Animation - 1714027483600.json")}
                autoPlay
                loop
              />
            </View>
            <Text className="font-semibold text-lg text-purple-950 bg-white p-3 rounded-lg capitalize px-5">
              {message}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
