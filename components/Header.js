import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View className=" px-6 py-5">
      <View className=" flex-row items-center justify-between">
        {/* 4 dots */}
        <View className=" space-y-3">
          <View className=" flex-row space-x-3">
            <View className=" h-2 w-2 rounded-full bg-black" />
            <View className=" h-2 w-2 rounded-full bg-black" />
          </View>
          <View className=" flex-row space-x-3">
            <View className=" h-2 w-2 rounded-full bg-black" />
            <View className=" h-2 w-2 rounded-full bg-black" />
          </View>
        </View>

        {/*text*/}
        <Text className=" text-lg uppercase tracking-widest font-extrabold">/ quotes</Text>

        {/* image */}
        <View>
            <Image 
            className=" h-12 w-12 rounded-xl"
            source={{uri: "https://i.pinimg.com/474x/86/d2/45/86d2457cd340e4e560b832eef12e88e7.jpg"}}/>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
