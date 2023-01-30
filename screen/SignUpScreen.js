import {
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { authentication } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
//import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const next = () => {
    navigation.navigate("Login");
  };

  const SignUpUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        setIsSignedIn(true);
        navigation.navigate("Login");
        Alert.alert("Account is created. Please Log in")
      })
      .catch((error) => {
        console.log("====================================");
        Alert.alert(error.message);
        console.log("====================================");
      });
  };

  {/*const SignInUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
*/}

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className=" h-full bg-white px-5 py-10 ">
      <SafeAreaView>
        {/* sign Up , access account */}
        <View className=" mt-10  space-y-8 items-center">
          <Text className=" uppercase text-xl tracking-widest font-bold">
            Sign Up
          </Text>
          <Text className=" uppercase text-xl tracking-widest font-extralight text-gray-400 ">
            Create your Account
          </Text>
        </View>

        {/* apple and google button */}
        <View className=" flex-row space-x-10 mt-14 items-center justify-center">
          <Pressable
            onPress={() => console.warn("apple sign")}
            className=" bg-gray-200 px-11 py-5 rounded-2xl"
          >
            <FontAwesome5 name="apple" size={20} color="black" />
          </Pressable>
          <Pressable
            onPress={() => console.warn("google sign")}
            className=" bg-gray-200 px-11 py-5 rounded-2xl"
          >
            <FontAwesome name="google" size={20} color="black" />
          </Pressable>
        </View>

        <View className=" mt-3 items-center ">
          <Text className=" text-xs tracking-widest font-thin">
            or sign up with email
          </Text>
        </View>

        <View className=" mt-4 p-5">
        <View className="  px-5 py-2 space-y-3 justify-center">
            <Text className=" font-extrabold uppercase tracking-widest">
              Full Name
            </Text>
            <TextInput
              className=" bg-gray-200 p-4 rounded-full text-black"
              placeholder="FULL NAME"
              onChangeText={setFullName}
            />
          </View>

          <View className="  px-5 py-2 space-y-3 justify-center">
            <Text className=" font-extrabold uppercase tracking-widest">
              Email
            </Text>
            <TextInput
              className=" bg-gray-200 p-4 rounded-full text-black"
              placeholder="EMAIL"
              onChangeText={setEmail}
            />
          </View>

          <View className=" px-5 py-2 space-y-3 justify-center">
            <Text className=" font-extrabold uppercase tracking-widest">
              Password
            </Text>
            <TextInput
              className=" bg-gray-200 p-4 rounded-full text-black"
              placeholder="PASSWORD"
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            className=" bg-slate-700 rounded-full p-3 items-center mt-5"
            onPress={SignUpUser}
            
          >
            <Text
              className=" text-lg uppercase text-white tracking-widest"
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={next}
          className=" px-5 py-2 space-y-3 items-center">
            <Text className=" text-xs text-gray-400">
              Already have an Account? Go to Log in
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
