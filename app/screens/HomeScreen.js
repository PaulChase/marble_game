import React from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, SafeAreaView, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";

export default function HomeScreen({ navigation }) {
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
