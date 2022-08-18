import React from "react";
import { Text, View } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { MarbleContext } from "../contexts/MarbleContext";
import Marble from "./Marble";

export default function Header() {
	const { marblesCount } = React.useContext(MarbleContext);
	return (
		<View className=" flex-row items-center justify-between">
			<View className="  flex-row space-x-4 py-2 px-4 bg-white rounded-3xl self-start">
				<FontAwesome5 name="user-circle" size={24} color="yellow" />
				<Text className=" text-gray-800 font-bold text-2xl">PaulChase</Text>
			</View>

			<View className="  flex-row space-x-4 py-2 px-4 bg-white rounded-3xl self-start">
				<Marble />
				<Text className=" text-gray-800 font-bold text-2xl">{marblesCount}</Text>
			</View>
		</View>
	);
}
