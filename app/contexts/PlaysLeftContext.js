import React, { useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PlaysLeftContext = React.createContext();

export default function PlaysLeftContextComponent({ children }) {
	const [playsLeft, setPlaysLeft] = React.useState(25);

	const incrementPlaysLeft = () => setPlaysLeft(playsLeft + 1);
	const decrementPlaysLeft = () => setPlaysLeft(playsLeft - 1);

	// get plays left count from storage
	useEffect(() => {
		let isMounted = true;

		const getPlaysCountFromStorage = async () => {
			try {
				const value = await AsyncStorage.getItem("playsLeft");
				if (value !== null && isMounted) {
					setPlaysLeft(parseInt(value));
				} else if (value === null && isMounted) {
					// this will run for the 1st time

					setPlaysLeft(30);
				}
			} catch (e) {
				console.log("couldnt get plays count ");
			}
		};

		getPlaysCountFromStorage();

		return () => {
			isMounted = false;
		};
	}, []);

	// set the plays count in storage after its value changes
	useEffect(() => {
		const updatePlaysLeftInStorage = async () => {
			try {
				await AsyncStorage.setItem("playsLeft", playsLeft.toString());
			} catch (error) {
				alert("couldnt set plays");
			}
		};

		updatePlaysLeftInStorage();
	}, [playsLeft]);

	return (
		<PlaysLeftContext.Provider value={{ playsLeft, incrementPlaysLeft, decrementPlaysLeft }}>
			{children}
		</PlaysLeftContext.Provider>
	);
}
