import { View, Text, TextInput, StyleProp, TextStyle, StyleSheet } from "react-native";
import React from "react";

export function Input(props: InputProps) {
    return (
        <View>
            <Text>{props.label}</Text>
            <TextInput
                placeholder={props.placeHolder}
                style={[styles.input, props.style]}
                value={props.value}
                onChangeText={props.onChangeText}
                multiline={props.multiline}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        backgroundColor: "#dad7cd",
        borderRadius: 4,
        fontSize: 16,
        margin: 8,
    },
});

export interface InputProps {
    label?: string;
    placeHolder?: string;
    value: string;
    style?: StyleProp<TextStyle>;
    onChangeText: (text: string) => void;
    multiline?: boolean;
}
