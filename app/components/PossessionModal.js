import React, { useContext, useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons";
import { StatsContext } from "../contexts/StatsContext";
import { MarbleContext } from "../contexts/MarbleContext";
import { PlaysLeftContext } from "../contexts/PlaysLeftContext";

export default function PossessionModal({ showModal, closeModal }) {
	const { marblesCount } = useContext(MarbleContext);
	const { playsLeft } = useContext(PlaysLeftContext);

	return (
		<Modal visible={showModal} animationType="slide" transparent={true} onRequestClose={closeModal}>
			<View className=" flex-1 bg-black/80 justify-center items-center px-8">
				<View className=" bg-green-500 border-4 border-white rounded-lg p-4 w-full">
					<View className=" flex-row items-center justify-center space-x-4">
						<Ionicons name="gift" size={24} color="white" />

						<Text className=" text-4xl font-extrabold text-white text-center">Your Rewards</Text>
					</View>

					<View className=" mt-6">
						<Text className=" text-2xl font-extrabold text-white text-center mb-2">Marbles Left</Text>
						<Text className=" text-6xl font-extrabold text-white text-center">{marblesCount}</Text>
					</View>

					<View className=" mt-4">
						<Text className=" text-2xl font-extrabold text-white text-center mb-2">No of Plays Left</Text>
						<Text className=" text-6xl font-extrabold text-white text-center">{playsLeft}</Text>
					</View>

					<TouchableOpacity
						onPress={closeModal}
						className=" w-full px-10 py-4 mt-8 rounded-lg bg-gray-600 border-4 border-white flex flex-row justify-center items-center space-x-4"
					>
						<FontAwesome name="close" size={24} color="white" />
						<Text className=" font-bold text-white  text-3xl">Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
