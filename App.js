import React from "react";
import HomeScreen from "./app/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GamePlayScreen from "./app/screens/GamePlayScreen";
import MarbleContextComponent from "./app/contexts/MarbleContext";
import StatsContextComponent from "./app/contexts/StatsContext";
import PlaysLeftContextComponent from "./app/contexts/PlaysLeftContext";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<MarbleContextComponent>
			<StatsContextComponent>
				<PlaysLeftContextComponent>
					<NavigationContainer>
						<Stack.Navigator initialRouteName="Home">
							<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
							<Stack.Screen name="GamePlay" component={GamePlayScreen} options={{ headerShown: false }} />
						</Stack.Navigator>
					</NavigationContainer>
				</PlaysLeftContextComponent>
			</StatsContextComponent>
		</MarbleContextComponent>
	);
}
