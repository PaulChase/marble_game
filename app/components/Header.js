import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { MarbleContext } from "../contexts/MarbleContext";
import Marble from "./Marble";
import { PlaysLeftContext } from "../contexts/PlaysLeftContext";
import PossessionModal from "./PossessionModal";

export default function Header() {
	const [showModal, setShowModal] = React.useState(false);
	const { marblesCount } = React.useContext(MarbleContext);
	const { playsLeft } = React.useContext(PlaysLeftContext);
	return (
		<>
			<View className=" flex-row items-center justify-between">
				<View className="  flex-row space-x-4 py-2 px-4 bg-white rounded-3xl self-start">
					<FontAwesome5 name="user-circle" size={24} color="orange" />
					<Text className=" text-gray-800 font-bold text-2xl">Level 1</Text>
				</View>

				<TouchableOpacity onPress={() => setShowModal(true)} activeOpacity={0.8}>
					<View className="  flex-row space-x-3 py-2 px-4 bg-white rounded-3xl self-start">
						<Marble />
						<Text className=" text-gray-800 font-bold text-2xl">{marblesCount}</Text>
						<FontAwesome5 name="play" size={24} color="orange" />
						<Text className=" text-gray-800 font-bold text-2xl">{playsLeft}</Text>
					</View>
				</TouchableOpacity>
			</View>
			<PossessionModal showModal={showModal} closeModal={() => setShowModal(false)} />
		</>
	);
}
