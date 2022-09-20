import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Marble({ size = 24 }) {
	return <FontAwesome5 name="basketball-ball" size={size} color="orange" />;
}
