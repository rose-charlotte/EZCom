import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import { GlobalStyles } from "./constants/styles";
import { Message } from "./screens/Message";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Profil } from "./screens/Profil";
import { useContext, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { UserContext } from "./store/context/UserContext";

import { SignUp } from "./screens/SignUp";
import { MessageContextProvider } from "./store/context/MessageContext";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

export function App() {
    const [user, setUser] = useState<FirebaseAuthTypes.User>();

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);

    // Handle user state changes
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
        setUser(user ?? undefined);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        <UserContext.Provider value={user}>
            {/* <MessageContextProvider> */}
            <StatusBar style="auto" />
            <NavigationContainer>
                <BottomTabs.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: GlobalStyles.colors.paleBlue },
                        headerTintColor: GlobalStyles.colors.darkBlue,
                        tabBarStyle: { backgroundColor: GlobalStyles.colors.paleBlue },
                        tabBarActiveTintColor: GlobalStyles.colors.darkBlue,
                        tabBarInactiveTintColor: GlobalStyles.colors.lightBlue,
                    }}
                >
                    {user && (
                        <>
                            <BottomTabs.Screen
                                name="Profil"
                                component={Profil}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Ionicons name="person-circle-sharp" size={size} color={color} />
                                    ),
                                }}
                            />
                            <BottomTabs.Screen
                                name="Home"
                                component={Home}
                                options={{
                                    tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                                }}
                            />
                            <BottomTabs.Screen
                                name="Message"
                                component={Message}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
                                    ),
                                }}
                            />
                        </>
                    )}

                    {!user && <BottomTabs.Screen name="Signup" component={SignUp} />}
                </BottomTabs.Navigator>
            </NavigationContainer>
            {/* </MessageContextProvider> */}
        </UserContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
