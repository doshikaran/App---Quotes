import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
} from "react-native";
//import Tts from 'react-native-tts'
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { FontAwesome, Feather, Entypo } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import * as Clipboard from "expo-clipboard";
import { authentication } from "../firebase";
import { signOut } from "firebase/auth"; //Tts.setDefaultLanguage('en-US')
//Tts.setDefaultVoice("com.apple.ttsbundle.Moira-compact")
//Tts.setDefaultRate(0.5);
//Tts.setDefaultPitch(1.1)

const HomeScreen = () => {
  {
    /* const [user, setUser] = useState(null);
  useEffect(() => {
    const subscriber = onAuthStateChanged((user) => {
      console.log(user.displayName);

      setUser(user);
    });
    return subscriber;
  }, []);
*/
  }
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const date = new Date();
    const currentHour = date.getHours();
    if (currentHour >= 6 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 16) {
      setGreeting("Good afternoon");
    } else if (currentHour >= 16 && currentHour < 24) {
      setGreeting("Good evening");
    } else {
      setGreeting("Hello");
    }
  }, []);

  const [quote, setQuote] = useState(" Be patient api is fetching your quote");
  const [author, setAuthor] = useState(
    " Be patient api is fetching your quote"
  );
  const [isLoading, setIsLoading] = useState(false);
  const random = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((info) => {
        console.log("====================================");
        console.log(JSON.stringify(info));
        console.log("====================================");
        setQuote(info.content);
        setAuthor(info.author);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    random();
  }, []);

  //  const speak = () => {
  //    Tts.speak(quote)
  //  }

  const speak = () => {
    Speech.speak(quote);
  };

  const [copiedText, setCopiedText] = useState("");
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(quote);
    Alert.alert(" The text has been copied");
    // Snackbar.show({
    // text: " Copied",

    //})
  };

  const tweet = () => {
    const url = "https://twitter.com/intent/tweet?text=" + quote;
    Linking.openURL(url);
    Alert.alert(" you are directed to twitter now");
  };

  const [isLogdIn, setIsLogdIn] = useState(false);
  const LogOut = () => {
    signOut(authentication)
      .then((userCredential) => {
        setIsLogdIn(false);
        navigation.navigate("Login");
        Alert.alert("You are logged out");
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error.message);
        console.log("====================================");
      });
  };

  return (
    <View className=" bg-amber-300 h-full">
      <SafeAreaView>
        <Header />

        <View className=" px-6 mt-5">
          {/** text */}
          <View>
            <Text className=" text-2xl uppercase text-black tracking-widest">
              {greeting},
            </Text>
            <Text className=" text-2xl uppercase text-black tracking-widest">
              Welcome Back !
            </Text>
            <Text className=" mt-5 font-light tracking-wider text-sm">
              Unlock wisdom from the most famous and unforgotten quotes.
            </Text>
          </View>

          <View className=" bg-white mt-20 rounded-2xl">
            {/* quote */}
            <View className=" items-center px-10 py-5">
              <Text className=" text-lg uppercase tracking-widest font-semibold">
                Quote for the Day
              </Text>
              <Text className=" mt-3 text-sm tracking-wider">" {quote} "</Text>
              <Text className=" mt-1 ml-auto uppercase"> - {author}</Text>

              {isLoading ? (
                <TouchableOpacity
                  onPress={random}
                  className=" mt-4 bg-black p-4 rounded-full w-full items-center justify-center"
                >
                  <Text className="text-xs font-thin text-white">
                    Be patient api is fetching your quote
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={random}
                  className=" mt-4 bg-gray-200 p-4 rounded-full w-full items-center justify-center"
                >
                  <Text className=" uppercase text-xs font-bold">
                    New Quote
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* icons */}
            <View className=" flex-row px-10 items-center justify-between mb-2">
              <TouchableOpacity
                onPress={speak}
                className=" bg-gray-200 p-2 rounded-full border "
              >
                <FontAwesome name="volume-up" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={copyToClipboard}
                className=" bg-gray-200 p-2 rounded-full border "
              >
                <Feather name="copy" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={tweet}
                className=" bg-gray-200 p-2 rounded-full border "
              >
                <Entypo name="twitter" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {/* sign out */}
          <TouchableOpacity
            className=" bg-black rounded-full px-5 py-3 items-center mt-10"
            onPress={LogOut}
          >
            <Text className=" text-lg uppercase text-white tracking-widest ">
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
