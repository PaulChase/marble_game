import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons";
import Marble from "./Marble";
import { Audio } from "expo-av";

export default function WinModal({ computerStake, reward, closeWinModal, navigation, ifWon }) {
	const [sound, setSound] = useState(null);
	async function playSound() {
		const { sound: winSound } = await Audio.Sound.createAsync(require("../../assets/sound/win_sound.wav"));
		setSound(winSound);
		await winSound.playAsync();
	}
	useEffect(() => {
		playSound();

		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, []);
	return (
		<Modal visible={ifWon} animationType="slide" transparent={true}>
			<View className=" flex-1 bg-black/70 justify-center items-center px-8">
				<View className=" bg-green-500 border-4 border-white rounded-lg p-4 w-full">
					<Text className=" text-4xl font-extrabold text-white text-center">Your Won!</Text>
					<View className="  flex-row items-center justify-center my-2">
						<Text>
							<FontAwesome5 name="angry" size={66} color="white" />
						</Text>
					</View>
					<Text className=" text-3xl font-extrabold text-white text-center">
						I staked {computerStake} <Marble size={34} />
					</Text>
					<Text className=" text-3xl font-extrabold text-white text-center mt-2">You have received</Text>
					<Text className=" text-4xl font-extrabold text-white text-center">
						{reward} <Marble size={34} />
					</Text>

					<View className=" mt-4 space-y-4">
						<TouchableOpacity
							onPress={closeWinModal}
							className=" w-full px-10 py-4 rounded-lg bg-blue-800 border-4 border-white flex flex-row justify-center items-center space-x-4"
						>
							<FontAwesome name="repeat" size={24} color="white" />
							<Text className=" font-bold text-white  text-3xl">Play Again</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => navigation.goBack()}
							className=" w-full px-10 py-4 rounded-lg bg-gray-600 border-4 border-white flex flex-row justify-center items-center space-x-4"
						>
							<FontAwesome name="home" size={24} color="white" />
							<Text className=" font-bold text-white  text-3xl">Go to Home</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}
