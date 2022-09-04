import React, { useContext, useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons";
import { StatsContext } from "../contexts/StatsContext";

export default function StatsModal({ showStatsModal, closeModal }) {
	const { playsCount, winsCount } = useContext(StatsContext);

	const getWinRatio = () => {
		const percentage = (winsCount / playsCount) * 100;

		return Math.round(percentage);
	};
	return (
		<Modal visible={showStatsModal} animationType="slide" transparent={true} onRequestClose={closeModal}>
			<View className=" flex-1 bg-black/80 justify-center items-center px-8">
				<View className=" bg-green-500 border-4 border-white rounded-lg p-4 w-full">
					<View className=" flex-row items-center justify-center space-x-4">
						<Ionicons name="stats-chart" size={24} color="white" />

						<Text className=" text-4xl font-extrabold text-white text-center">Your Stats</Text>
					</View>

					<View className=" mt-6">
						<Text className=" text-2xl font-extrabold text-white text-center mb-2">Games Played</Text>
						<Text className=" text-6xl font-extrabold text-white text-center">{playsCount}</Text>
					</View>

					<View className=" mt-4">
						<Text className=" text-2xl font-extrabold text-white text-center mb-2">Games Won</Text>
						<Text className=" text-6xl font-extrabold text-white text-center">{winsCount}</Text>
					</View>

					<View className=" mt-4">
						<Text className=" text-2xl font-extrabold text-white text-center mb-2">Win Ratio:</Text>
						{playsCount && winsCount ? (
							<Text className=" text-6xl font-extrabold text-white text-center">{getWinRatio()} %</Text>
						) : (
							<Text className=" text-6xl font-extrabold text-white text-center">0 %</Text>
						)}
					</View>
				</View>
			</View>
		</Modal>
	);
}
