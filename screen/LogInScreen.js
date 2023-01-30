import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { authentication } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";

const Regex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const LogInScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [isLogdIn, setIsLogdIn] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");

  const validEmail = (email) => {
    setEmailValid(Regex.test(email));
  };

  const LogInUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        setIsLogdIn(true);
        navigation.navigate("First");
      })
      .catch((error) => {
        console.log("====================================");
        Alert.alert(error.message);
        console.log("====================================");
      });
  };

  

  return (
    <View className=" h-full bg-white px-3 py-10">
      <SafeAreaView>
        <View className=" mt-10  space-y-8 items-center">
          <Text className=" uppercase text-xl tracking-widest font-bold">
            welcome back
          </Text>
          <Text className=" uppercase text-xl tracking-widest font-extralight text-gray-400 ">
            Access your Account
          </Text>
        </View>

        <View className=" mt-5 p-5 space-y-3">
          <View className="  px-3 py-2 space-y-3 justify-center">
            <Text className=" font-extrabold uppercase tracking-widest">
              Email
            </Text>
            <TextInput
              onEndEditing={validEmail}
              className=" bg-gray-200 p-4 rounded-xl text-black"
              placeholder="EMAIL"
              onChangeText={setEmail}
            />
          </View>
          <View className=" px-3 py-2 space-y-3 justify-center">
            <Text className=" font-extrabold uppercase tracking-widest">
              Password
            </Text>
            <TextInput
              className=" bg-gray-200 p-4 rounded-xl text-black"
              placeholder="password"
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <View className=" flex-row items-center px-3 justify-between">
            <Text className=" text-xl uppercase font-bold">Log In</Text>
            <TouchableOpacity
              onPress={LogInUser}
              className=" bg-slate-700 rounded-full items-center justify-center h-12 w-12"
            >
              <AntDesign name="arrowright" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className=" mt-3 items-center ">
            <Text className=" text-xs tracking-widest font-thin">or</Text>
          </View>

          <View className=" space-y-5 px-5 mt-2">
            <TouchableOpacity
              onPress={() => Alert.alert("Apple Login")}
              className=" bg-gray-200 flex-row items-center p-3 space-x-10 rounded-2xl"
            >
              <FontAwesome5 name="apple" size={20} color="black" />
              <Text className=" uppercase text-xs font-bold tracking-widest">
                Apple
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className=" bg-gray-200 flex-row items-center p-3 space-x-10 rounded-2xl">
              <FontAwesome name="google" size={20} color="black" />
              <Text className=" uppercase text-xs font-bold tracking-widest">
                Google
              </Text>
            </TouchableOpacity>
          </View>

          <Pressable
            onPress={() => {
              navigation.navigate("SignUp");
            }}
            className=" mt-3 items-center"
          >
            <Text className=" text-xs tracking-widest font-thin">
              Don't have an account? Create one
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({});
