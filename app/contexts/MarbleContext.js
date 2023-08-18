import React, { useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MarbleContext = React.createContext();

export default function MarbleContextComponent({ children }) {
	const [marblesCount, setMarblesCount] = React.useState(25);

	const addMarbles = (marbles) => setMarblesCount(marblesCount + marbles);
	const subtractMarbles = (marbles) => setMarblesCount(marblesCount - marbles);

	const updateMarblesCount = (marbles) => {
		setMarblesCount(marbles);
	};

	useEffect(() => {
		let isMounted = true;

		const updateMarblesInStorage = async () => {
			try {
				await AsyncStorage.setItem("marbles", marblesCount.toString());
			} catch (error) {
				alert("couldnt set marbles");
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
		<MarbleContext.Provider value={{ marblesCount, addMarbles, subtractMarbles, updateMarblesCount }}>
			{children}
		</MarbleContext.Provider>
	);
}
