import React, { useState, useContext, useEffect } from "react";
import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View, Modal, BackHandler } from "react-native";
import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons";
import Header from "../components/Header";
import { MarbleContext } from "../contexts/MarbleContext";
import WinModal from "../components/WinModal";
import LostModal from "../components/LostModal";
import { StatsContext } from "../contexts/StatsContext";
import { PlaysLeftContext } from "../contexts/PlaysLeftContext";

const STAKE_MAX = 10;
const STAKE_MIN = 1;
const PLAY_TIME = 5;

export default function GamePlayScreen({ navigation }) {
	const [computerStake, setComputerStake] = useState(null);
	const [isEven, setIsEven] = useState(false);
	const [ifWon, setIfWon] = useState(false);
	const [ifLost, setifLost] = useState(false);
	const [userStake, setUserStake] = useState(5);
	const [reward, setReward] = useState(null);
	const [punishment, setPunishment] = useState(null);
	const [timeLeft, setTimeLeft] = useState(PLAY_TIME);

	const { addMarbles, subtractMarbles } = useContext(MarbleContext);
	const { incrementPlays, incrementWins } = useContext(StatsContext);
	const { incrementPlaysLeft, decrementPlaysLeft } = useContext(PlaysLeftContext);

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
		incrementWins();
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
		decrementPlaysLeft();
	};

	const handleCheckWin = () => {
		if (computerStake % 2 == 0 && isEven) {
			giveRewards();
		} else if (computerStake % 2 != 0 && !isEven) {
			giveRewards();
		} else {
			givePunishment();
		}
		incrementPlays();
	};

	const setComputerNumber = () => {
		const randomNumber = Math.floor(Math.random() * STAKE_MAX) + 1;
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

	useEffect(() => {
		if (!timeLeft) {
			handleCheckWin();
			return;
		}

		const timerID = setInterval(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);

		return () => clearInterval(timerID);
	}, [timeLeft]);

	// don't allow the user to leave if the countdown is still counting
	useEffect(() => {
		const backHandlerEvent = BackHandler.addEventListener("hardwareBackPress", () => true);

		return () => backHandlerEvent.remove();
	}, []);

	const resetTimer = () => setTimeLeft(PLAY_TIME);

	const closeWinModal = () => {
		setIfWon(false);
		setComputerNumber();
		resetTimer();
	};

	const closeLostModal = () => {
		setifLost(false);
		setComputerNumber();
		resetTimer();
	};

	return (
		<View className="flex-1">
			<ImageBackground source={require("../../assets/game_bg.jpg")} resizeMode="cover" className=" flex-1  px-4 py-10 ">
				<SafeAreaView className=" flex-1">
					{/* top nav */}
					<Header />

					<View className=" flex-1 mt-20">
						<Text className=" text-4xl font-extrabold text-white text-center">Your Turn!</Text>
					</View>

					<View className=" flex-1 mt-20  items-center justify-center">
						<Text className=" text-9xl font-extrabold text-white text-center">{timeLeft}</Text>
						<Text className=" text-4xl font-extrabold text-white text-center">secs</Text>
					</View>

					{/* actions */}
					<View className="flex-1   justify-end items-center  ">
						<Text className=" text-xl font-extrabold text-white text-center mb-3">Is My number Odd or Even?</Text>

						<View className=" flex-row  items-center    space-x-4 h-20 mb-6 bg-gray-50 p-2 rounded-lg">
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => setIsEven(false)}
								className={`  flex-1 items-center justify-center  h-full rounded-lg ${
									isEven === false ? " bg-blue-600" : "bg-gray-400"
								}  `}
							>
								<Text className="text-4xl  font-extrabold text-white">Odd</Text>
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => setIsEven(true)}
								className={`  flex-1 items-center justify-center  h-full rounded-lg ${
									isEven ? " bg-blue-500" : "bg-gray-400"
								}  `}
							>
								<Text className="text-4xl  font-extrabold text-white">Even</Text>
							</TouchableOpacity>
						</View>

						<Text className=" text-xl font-extrabold text-white text-center mb-3">Stake your Marbles</Text>

						<View className=" flex-row  items-center    space-x-4 h-20 bg-gray-50 p-2 rounded-lg">
							<TouchableOpacity
								onPress={decrementStake}
								className="  flex-1 items-center justify-center  h-full rounded-lg bg-pink-500 border-4 border-white "
							>
								<FontAwesome5 name="chevron-down" size={28} color="white" />
							</TouchableOpacity>

							<View className="rounded-lg bg-gray-200  items-center justify-center h-full   flex-1 ">
								<Text className="text-4xl text-gray-700 font-extrabold">{userStake}</Text>
							</View>

							<TouchableOpacity
								onPress={incrementStake}
								className=" flex-1  h-full items-center justify-center rounded-lg bg-blue-500 border-4 border-white "
							>
								<FontAwesome5 name="chevron-up" size={28} color="white" />
							</TouchableOpacity>
						</View>
						{/* <TouchableOpacity
							onPress={handleCheckWin}
							className=" w-full px-10 py-6 rounded-lg bg-green-800 border-4 border-white flex flex-row justify-center items-center space-x-4"
						>
							<FontAwesome5 name="play" size={24} color="white" />
							<Text className=" font-bold text-white  text-3xl">Stake</Text>
						</TouchableOpacity> */}
					</View>
				</SafeAreaView>
			</ImageBackground>

			{/* lost modal */}
			{ifLost && (
				<LostModal
					ifLost={ifLost}
					navigation={navigation}
					closeLostModal={closeLostModal}
					computerStake={computerStake}
					punishment={punishment}
				/>
			)}

			{/* won modal */}
			{ifWon && (
				<WinModal
					ifWon={ifWon}
					navigation={navigation}
					closeWinModal={closeWinModal}
					reward={reward}
					computerStake={computerStake}
				/>
			)}
		</View>
	);
}
