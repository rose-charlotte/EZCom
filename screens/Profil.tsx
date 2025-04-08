import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { UserContext } from "../store/context/UserContext";
import { signOut, getAuth, FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Input } from "../components/Auth/Input";

export function Profil() {
    const auth = getAuth();
    const user = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState(user!.email);

    const deconnection = async () => {
        console.log("signing out");
        auth.signOut();
        // signOut(auth); // .then(() => console.log("User signed out!"));
    };

    const onFormSubmit = () => {
        console.log(firstName, lastName, email);
    };

    return (
        <View>
            <Button title="Deconnection" onPress={deconnection} />
            <Text>Votre profil</Text>
            <Input placeHolder="Prénom" value={firstName} onChangeText={text => setFirstName(text)} />
            <Input placeHolder="Nom" value={lastName} onChangeText={text => setLastName(text)} />
            <Input placeHolder="Email" value={email!} onChangeText={text => setEmail(text)} />
            <Button title="Enregistrer" onPress={onFormSubmit} />
        </View>
    );
}

export interface User {
    email: string;
    password: string;
}
