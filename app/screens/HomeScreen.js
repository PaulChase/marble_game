import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	ActivityIndicator,
	ImageBackground,
	SafeAreaView,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { MarbleContext } from "../contexts/MarbleContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

export default function HomeScreen({ navigation }) {
	const [isLoading, setIsLoading] = useState(true);
	const [sound, setSound] = useState(null);

	const { getMarblesCount } = useContext(MarbleContext);

	useEffect(() => {
		let isMounted = true;

		const getMarblesCountFromStorage = async () => {
			try {
				const value = await AsyncStorage.getItem("marbles");
				if (value !== null && isMounted) {
					getMarblesCount(parseInt(value));
					setIsLoading(false);
				} else if (value === null && isMounted) {
					getMarblesCount(25);
					setIsLoading(false);
				}
			} catch (e) {
				console.log("couldnt get marbles ");
			}
		};

		getMarblesCountFromStorage();

		return () => {
			isMounted = false;
		};
	}, []);

	async function playSound() {
		console.log("Loading Sound");
		const { sound } = await Audio.Sound.createAsync(require("../../assets/Forever.mp3"));
		setSound(sound);

		console.log("Playing Sound");
		await sound.playAsync();
		await sound.setIsLoopingAsync(true);
	}

	useEffect(() => {
		playSound();
		return sound
			? () => {
					console.log("Unloading Sound");
					sound.unloadAsync();
			  }
			: undefined;
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="green" />
			</View>
		);
	}
	return (
		<View className="flex-1">
			<ImageBackground
				source={require("../../assets/home_bg.jpeg")}
				resizeMode="cover"
				className=" flex-1  px-4 py-10 "
			>
				<SafeAreaView className=" flex-1">
					{/* top nav */}
					<Header />

					{/* actions */}
					<View className="flex-1  space-y-8  justify-center items-center ">
						<TouchableOpacity
							onPress={() => navigation.navigate("GamePlay")}
							className=" w-4/5 px-10 py-6 rounded-lg bg-green-600 border-4 border-white flex flex-row space-x-4"
						>
							<FontAwesome5 name="play" size={24} color="white" />
							<Text className=" font-bold text-white text-center text-3xl">Play Game</Text>
						</TouchableOpacity>
						<TouchableOpacity className=" w-4/5 px-10 py-6 rounded-lg bg-green-600 border-4 border-white flex flex-row space-x-4">
							<Ionicons name="settings" size={24} color="white" />
							<Text className=" font-bold text-white text-center text-3xl">Settings</Text>
						</TouchableOpacity>
						<TouchableOpacity className=" w-4/5 px-10 py-6 rounded-lg bg-green-600 border-4 border-white flex flex-row space-x-4">
							<FontAwesome5 name="info-circle" size={24} color="white" />
							<Text className=" font-bold text-white text-center text-3xl">Help</Text>
						</TouchableOpacity>
					</View>
					<StatusBar style="auto" />
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
}
