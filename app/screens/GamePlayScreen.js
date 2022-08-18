import React, { useState, useContext, useEffect } from "react";
import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View, Modal } from "react-native";
import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons";
import Header from "../components/Header";
import { MarbleContext } from "../contexts/MarbleContext";
import Marble from "../components/Marble";

const STAKE_MAX = 5;
const STAKE_MIN = 1;

export default function GamePlayScreen({ navigation }) {
	const [computerStake, setComputerStake] = useState(null);
	const [isEven, setIsEven] = useState(null);
	const [ifWon, setIfWon] = useState(false);
	const [ifLost, setifLost] = useState(false);
	const [userStake, setUserStake] = useState(3);
	const [reward, setReward] = useState(null);
	const [punishment, setPunishment] = useState(null);

	const { marblesCount, addMarbles, subtractMarbles } = useContext(MarbleContext);

	const incrementStake = () => {
		if (userStake === STAKE_MAX) return;
		setUserStake(userStake + 1);
	};

	const decrementStake = () => {
		if (userStake === STAKE_MIN) return;

		setUserStake(userStake - 1);
	};

	const giveRewards = () => {
		if (computerStake >= userStake) {
			setReward(userStake);
			setIfWon(true);
			addMarbles(userStake);
		} else if (computerStake < userStake) {
			setReward(computerStake);
			setIfWon(true);
			addMarbles(computerStake);
		}
	};

	const givePunishment = () => {
		if (computerStake >= userStake) {
			setPunishment(userStake);
			setifLost(true);
			subtractMarbles(userStake);
		} else if (computerStake < userStake) {
			setPunishment(computerStake);
			setifLost(true);
			subtractMarbles(computerStake);
		}
	};

	const handleCheckWin = () => {
		if (isEven === null) {
			alert("😠 Choose the type of number I staked! (Odd or Even)");
			return;
		}
		if (computerStake % 2 == 0 && isEven) {
			giveRewards();
		} else if (computerStake % 2 != 0 && !isEven) {
			giveRewards();
		} else {
			givePunishment();
		}
	};

	const setComputerNumber = () => {
		const randomNumber = Math.floor(Math.random() * 5) + 1;
		setComputerStake(randomNumber);
	};

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			setComputerNumber();
		}

		return () => {
			isMounted = false;
		};
	}, []);

	const closeWinModal = () => {
		setIfWon(false);
		setComputerNumber();
	};

	const closeLostModal = () => {
		setifLost(false);
		setComputerNumber();
	};

	return (
		<View className="flex-1">
			<ImageBackground source={require("../../assets/game_bg.jpg")} resizeMode="cover" className=" flex-1  px-4 py-10 ">
				<SafeAreaView className=" flex-1">
					{/* top nav */}
					<Header />

					<View className=" flex-1 mt-20">
						<Text className=" text-4xl font-extrabold text-white text-center">Your Turn!!!</Text>
					</View>

					{/* actions */}
					<View className="flex-1  space-y-8  justify-end items-center  ">
						<View className=" flex-row  items-center    space-x-4 h-20">
							<TouchableOpacity
								onPress={() => setIsEven(false)}
								className={`  flex-1 items-center justify-center  h-full rounded-lg ${
									isEven === false ? " bg-blue-600" : "bg-gray-600"
								}  `}
							>
								<Text className="text-4xl  font-extrabold text-white">Odd</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => setIsEven(true)}
								className={`  flex-1 items-center justify-center  h-full rounded-lg ${
									isEven ? " bg-blue-600" : "bg-gray-600"
								}  `}
							>
								<Text className="text-4xl  font-extrabold text-white">Even</Text>
							</TouchableOpacity>
						</View>
						<View className=" flex-row  items-center    space-x-4 h-20">
							<TouchableOpacity
								onPress={decrementStake}
								className="  flex-1 items-center justify-center  h-full rounded-lg bg-pink-500 border-4 border-white "
							>
								<FontAwesome5 name="chevron-down" size={24} color="white" />
							</TouchableOpacity>

							<View className="rounded-lg bg-white  items-center justify-center h-full   flex-1 ">
								<Text className="text-4xl text-gray-700 font-extrabold">{userStake}</Text>
							</View>

							<TouchableOpacity
								onPress={incrementStake}
								className=" flex-1  h-full items-center justify-center rounded-lg bg-blue-500 border-4 border-white "
							>
								<FontAwesome5 name="chevron-up" size={24} color="white" />
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							onPress={handleCheckWin}
							className=" w-full px-10 py-6 rounded-lg bg-green-800 border-4 border-white flex flex-row justify-center items-center space-x-4"
						>
							<FontAwesome5 name="play" size={24} color="white" />
							<Text className=" font-bold text-white  text-3xl">Stake</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</ImageBackground>

			{/* lost modal */}

			<Modal visible={ifLost} animationType="slide" transparent={true} onRequestClose={() => setifLost(false)}>
				<View className=" flex-1 bg-black/70 justify-center items-center px-8">
					<View className=" bg-red-500 border-4 border-white rounded-lg p-4 w-full">
						<Text className=" text-4xl font-extrabold text-white text-center">Your Lost!</Text>
						<Text className=" text-7xl font-extrabold text-white text-center my-4">😜</Text>
						<Text className=" text-3xl font-extrabold text-white text-center">
							I staked {computerStake} <Marble size={34} />
						</Text>
						<Text className=" text-3xl font-extrabold text-white text-center mt-2">You just lost</Text>
						<Text className=" text-4xl font-extrabold text-white text-center">
							{punishment} <Marble size={34} />
						</Text>

						<View className=" mt-4 space-y-4">
							<TouchableOpacity
								onPress={closeLostModal}
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

			{/* won modal */}

			<Modal visible={ifWon} animationType="slide" transparent={true} onRequestClose={() => setIfWon(false)}>
				<View className=" flex-1 bg-black/70 justify-center items-center px-8">
					<View className=" bg-green-500 border-4 border-white rounded-lg p-4 w-full">
						<Text className=" text-4xl font-extrabold text-white text-center">Your Won!</Text>
						<Text className=" text-7xl font-extrabold text-white text-center my-4">😒</Text>
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
		</View>
	);
}
