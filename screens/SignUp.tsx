import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useContext, useState } from "react";

import { Input } from "../components/Auth/Input";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    updatePhoneNumber,
} from "@react-native-firebase/auth";
import { storeUser } from "../store/API/Api";

export function SignUp() {
    const auth = getAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            storeUser(response.user.uid!);
        } catch (err) {
            console.log(err);
        }
    };

    const signIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={styles.inputContainer}>
            <Input placeHolder="email" value={email} onChangeText={text => setEmail(text)} />
            <Input placeHolder="Password" value={password} onChangeText={text => setPassword(text)} />
            <View style={styles.btnContainer}>
                <Button onPress={signUp} title="Sign Up" />
                <Button onPress={signIn} title="Sign In" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 16,
        padding: 20,
    },

    btnContainer: {
        margin: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
});
