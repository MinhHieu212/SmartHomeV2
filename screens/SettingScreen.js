import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../hooks/AuthContext";
import Header from "../components/Header";
import { RightArrow } from "../assets/Icons";
import { StatusBar } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const SettingScreen = () => {
  const { logout } = useContext(AuthContext);
  const [notice, setNotice] = useState(true);
  const [calling, setCalling] = useState(true);
  const themeOption = [
    { label: "Light", value: "light-theme" },
    { label: "Dark", value: "dark-theme" },
  ];
  const langOption = [
    { label: "VN", value: "vietnamese-lang" },
    { label: "US", value: "english-lang" },
  ];
  const [themeOpen, setThemeOpen] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLangaue] = useState("vietnamese-lang");

  return (
    <SafeAreaView className="flex-1 bg-white mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name="Settings"></Header>
      <View className="flex-1 pb-10 px-3 mt-3 ">
        {/* <ScrollView> */}
        <Text className="text-xl font-bold mb-3">Account</Text>
        <View className="m-3 gap-y-4 mb-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-medium text-[#6F7EA8]">
              Change infomation
            </Text>
            <RightArrow></RightArrow>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-medium text-[#6F7EA8]">
              Change password
            </Text>
            <RightArrow></RightArrow>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-medium text-[#6F7EA8]">
              Add new account
            </Text>
            <RightArrow></RightArrow>
          </View>
        </View>
        <Text className="text-xl font-bold mb-3">Notification</Text>
        <View className="m-3 my-2 gap-y-1 ">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-medium text-[#6F7EA8]">
              Allow notification
            </Text>
            <View>
              <Switch
                trackColor={{ false: "#D4E2FD", true: "#2666DE" }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setNotice(!notice)}
                value={notice}
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              />
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-medium text-[#6F7EA8]">
              Calling is allowed
            </Text>
            <View>
              <Switch
                trackColor={{ false: "#D4E2FD", true: "#2666DE" }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setCalling(!calling)}
                value={calling}
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              />
            </View>
          </View>
          {/* <Text className="text-xl font-bold">Add new account</Text> */}
        </View>
        <Text className="text-xl font-bold mb-2">Appearance</Text>
        <View className="m-3 my-5 gap-y-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-medium text-[#6F7EA8]">Theme</Text>
            <View>
              <DropDownPicker
                items={themeOption}
                open={themeOpen}
                setOpen={() => setThemeOpen(!themeOpen)}
                value={theme}
                setValue={(val) => setTheme(val)}
                className="w-[100]"
                theme="DARK"
                dropDownDirection="TOP"
              ></DropDownPicker>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-medium text-[#6F7EA8]">Language</Text>
            <View>
              <DropDownPicker
                items={langOption}
                open={langOpen}
                setOpen={() => setLangOpen(!langOpen)}
                value={language}
                setValue={(val) => setLangaue(val)}
                className="w-[100]"
                dropDownDirection="BOTTOM"
                theme="DARK"
              ></DropDownPicker>
            </View>
          </View>
        </View>

        <View className="items-center justify-center mt-6">
          <TouchableOpacity
            className="w-[80vw] h-[50] bg-[#2666DE] items-center justify-center rounded-xl"
            onPress={() => logout()}
          >
            <Text className="font-bold text-white text-lg">Sign out</Text>
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
