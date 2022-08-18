import React from "react";
import { View } from "react-native";

export const MarbleContext = React.createContext();

export default function MarbleContextComponent({ children }) {
	const [marblesCount, setMarblesCount] = React.useState(28);

	const addMarbles = (marbles) => setMarblesCount(marblesCount + marbles);
	const subtractMarbles = (marbles) => setMarblesCount(marblesCount - marbles);

	return (
		<MarbleContext.Provider value={{ marblesCount, addMarbles, subtractMarbles }}>{children}</MarbleContext.Provider>
	);
}
