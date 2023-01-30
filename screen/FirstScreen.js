import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const FirstScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onpress = () => {
    navigation.navigate("Home");
  };
  return (
    <View className=" h-full bg-indigo-300 ">
      {/* Image*/}
      <View>
        <Image
          className=" h-full rounded-3xl"
          source={{
            uri: "https://i.pinimg.com/564x/59/d5/de/59d5deb6fb4da086edfb4dc61625c57b.jpg",
          }}
        />
      </View>

      {/* text*/}
      <View className=" px-10 absolute z-10 top-36">
        <Text className=" text-4xl tracking-widest uppercase">
          Life sayings & Quotes
        </Text>
      </View>

      {/* icon */}
      <View className=" px-10 absolute z-10 bottom-4 right-4">
        <Pressable
          onPress={onpress}
          className=" h-14 w-14 bg-black rounded-full items-center justify-center"
        >
          <Feather name="arrow-right" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({});
