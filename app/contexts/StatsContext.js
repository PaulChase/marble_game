import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StatsContext = React.createContext();

export default function StatsContextComponent({ children }) {
	const [playsCount, setPlaysCount] = React.useState(0);
	const [winsCount, setWinsCount] = React.useState(0);

	const incrementPlays = () => setPlaysCount(playsCount + 1);
	const incrementWins = () => setWinsCount(winsCount + 1);

	// get plays count from storage
	useEffect(() => {
		let isMounted = true;

		const getPlaysCountFromStorage = async () => {
			try {
				const value = await AsyncStorage.getItem("plays");
				if (value !== null && isMounted) {
					setPlaysCount(parseInt(value));
				} else if (value === null && isMounted) {
					// this will run for the 1st time

					setPlaysCount(0);
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

	// get wins count from storage
	useEffect(() => {
		let isMounted = true;

		const getWinsCountFromStorage = async () => {
			try {
				const value = await AsyncStorage.getItem("wins");
				if (value !== null && isMounted) {
					setWinsCount(parseInt(value));
				} else if (value === null && isMounted) {
					// this will run for the 1st time
					setWinsCount(0);
				}
			} catch (e) {
				console.log("couldnt get plays count ");
			}
		};

		getWinsCountFromStorage();

		return () => {
			isMounted = false;
		};
	}, []);

	// set the plays count in storage after its value changes
	useEffect(() => {
		const updatePlaysCountInStorage = async () => {
			try {
				await AsyncStorage.setItem("plays", playsCount.toString());
			} catch (error) {
				alert("couldnt set plays");
			}
		};

		updatePlaysCountInStorage();
	}, [playsCount]);

	// set the wins count in storage after its value changes
	useEffect(() => {
		const updateWinsCountInStorage = async () => {
			try {
				await AsyncStorage.setItem("wins", winsCount.toString());
			} catch (error) {
				alert("couldnt set wins");
			}
		};

		updateWinsCountInStorage();
	}, [winsCount]);

	return (
		<StatsContext.Provider value={{ playsCount, winsCount, incrementPlays, incrementWins }}>
			{children}
		</StatsContext.Provider>
	);
}
