import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type FindDeviceButtonProps = {
    onPress: () => void
}

export default function FindDeviceButton({ onPress }: FindDeviceButtonProps){
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>Encontrar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3E505B',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
    text: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'
    }
})