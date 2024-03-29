import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, Ionicons, AntDesign } from "@expo/vector-icons";
import Header from "../components/Header";
import { MarbleContext } from "../contexts/MarbleContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import StatsModal from "../components/StatsModal";

export default function HomeScreen({ navigation }) {
	const [isLoading, setIsLoading] = useState(true);
	const [sound, setSound] = useState(null);
	const [soundStatus, setSoundStatus] = useState(null);
	const [showStatsModal, setShowStatsModal] = useState(false);

	const { updateMarblesCount } = useContext(MarbleContext);

	useEffect(() => {
		let isMounted = true;

		const updateMarblesCountFromStorage = async () => {
			try {
				const value = await AsyncStorage.getItem("marbles");
				if (value !== null && isMounted) {
					updateMarblesCount(parseInt(value));
					setIsLoading(false);
				} else if (value === null && isMounted) {
					updateMarblesCount(25);
					setIsLoading(false);
				}
			} catch (e) {
				alert("couldnt get marbles ");
			}
		};

		updateMarblesCountFromStorage();

		return () => {
			isMounted = false;
		};
	}, []);

	async function playBgMusic() {
		const { sound } = await Audio.Sound.createAsync(require("../../assets/sound/bg_music.mp3"));
		setSound(sound);

		await sound.playAsync();
		setSoundStatus(true);
		await sound.setIsLoopingAsync(true);
	}

	useEffect(() => {
		playBgMusic();
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, []);

	const toggleMusicPlay = async () => {
		if (soundStatus) {
			await sound.pauseAsync();
			setSoundStatus(false);
		} else {
			await sound.playAsync();
			setSoundStatus(true);
		}
	};

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
							activeOpacity={0.8}
							onPress={() => navigation.navigate("GamePlay")}
							className=" w-4/5 px-10 py-6 rounded-lg bg-green-600 border-4 border-white flex flex-row space-x-4"
						>
							<FontAwesome5 name="play" size={24} color="white" />
							<Text className=" font-bold text-white text-center text-3xl">Play Game</Text>
						</TouchableOpacity>

						<TouchableOpacity
							activeOpacity={0.8}
							onPress={toggleMusicPlay}
							className=" w-4/5 px-10 py-6 rounded-lg bg-green-600 border-4 border-white flex flex-row space-x-4"
						>
							<FontAwesome5 name={soundStatus ? "volume-up" : "volume-mute"} size={24} color="white" />
							<Text className=" font-bold text-white text-center text-3xl">Sound</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => setShowStatsModal(true)}
							className=" w-4/5 px-10 py-6 rounded-lg bg-green-600 border-4 border-white flex flex-row space-x-4"
						>
							<Ionicons name="stats-chart" size={24} color="white" />
							<Text className=" font-bold text-white text-center text-3xl">Stats</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							className=" w-4/5 px-10 py-6 rounded-lg bg-green-600 border-4 border-white flex flex-row space-x-4"
						>
							<FontAwesome5 name="info-circle" size={24} color="white" />
							<Text className=" font-bold text-white text-center text-3xl">Help</Text>
						</TouchableOpacity>
					</View>
					<StatsModal showStatsModal={showStatsModal} closeModal={() => setShowStatsModal(false)} />
					<StatusBar style="auto" />
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
}
