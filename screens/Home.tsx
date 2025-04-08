import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GlobalStyles } from "../constants/styles";
import { UserContext } from "../store/context/UserContext";
import { MessagesContext } from "../store/context/MessageContext";
import { fetchMessages } from "../Store/API/Api";

const Home = () => {
    const messagesCtx = useContext(MessagesContext);
    const [messages, setMessages] = useState<{ id: string; message: any }[]>([]);

    useEffect(() => {
        async function getMessages() {
            const messages = await fetchMessages();
            setMessages(messages);
        }
        getMessages();
    }, []);

    console.log(messagesCtx.messages);
    function renderMessage(itemData: { item: { id: string; message: any } }) {
        return (
            <View>
                <Text>{itemData.item.message}</Text>
            </View>
        );
    }
    return (
        <View style={styles.root}>
            <Text style={styles.title}>CM2 en vadrouille!</Text>

            <Image source={require("../assets/images/img1.jpg")} style={styles.img} />
            <FlatList data={messages} renderItem={renderMessage} keyExtractor={item => item.id} />
        </View>
    );
};

export default Home;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        backgroundColor: GlobalStyles.colors.blue,
    },
    img: {
        width: "100%",
        height: 200,
        marginVertical: 50,
    },
    title: {
        fontSize: 24,
        color: GlobalStyles.colors.yellow,
        margin: 50,
    },
    text: {
        color: GlobalStyles.colors.creme,
    },
});
