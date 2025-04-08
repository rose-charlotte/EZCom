import { View, Text, Button, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../store/context/UserContext";
import { Input } from "../components/Auth/Input";
import { MessagesContext } from "../store/context/MessageContext";
import { storeMessages } from "../Store/API/Api";

export function Message() {
    const user = useContext(UserContext);
    const messageCtx = useContext(MessagesContext);

    const [message, setMessage] = useState<string | undefined>();
    //ATTENTION A ID
    async function onSubmitMessage() {
        await storeMessages(message!);
        messageCtx.addMessage(message!);
    }

    return (
        <View>
            <Text>auteur: {user!.email}</Text>
            {/* <Input placeHolder /> */}

            <Input
                style={styles.input}
                value={message!}
                onChangeText={text => setMessage(text)}
                label="Message:"
                multiline
            />

            <Button title="Envoyer" onPress={onSubmitMessage} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 150,
        textAlignVertical: "top",
    },
});
