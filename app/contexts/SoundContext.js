import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Audio } from "expo-av";

export const SoundContext = React.createContext();

export default function SoundContextComponent({ children }) {
	const [sound, setSound] = useState(25);

	useEffect(() => {
		let isMounted = true;

		const updateMarblesInStorage = async () => {
			try {
				await AsyncStorage.setItem("marbles", marblesCount.toString());
			} catch (error) {
				console.log("couldnt set marbles");
			}
		};

		if (isMounted) {
			updateMarblesInStorage();
		}

		return () => {
			isMounted = false;
		};
	}, [marblesCount]);

	return (
		<SoundContext.Provider value={{ marblesCount, addMarbles, subtractMarbles, getMarblesCount }}>
			{children}
		</SoundContext.Provider>
	);
}
