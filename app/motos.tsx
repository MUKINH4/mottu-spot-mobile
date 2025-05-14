import { getMotos } from "@/actions/fetchData";
import { AddMotoDTO } from "@/types/types";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text } from "react-native";

export default function MotosScreen() {

    const [data, setData] = useState<[]>([]);

    const getAllMotos = async () => {
        try {
            const response = await getMotos()
            setData(response)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllMotos()
    }, [])

    function renderItem({item}: {item: AddMotoDTO}){
        return (
            <>
            <ScrollView style={styles.card}>
                <Text style={styles.cardTitle}>{item.placa}</Text>
                <Text>Status: {item.status}</Text>
                <Text>{item.descricao}</Text>
                <Text>Patio: {item.patioId}</Text>
            </ScrollView>
            </>
        )
    }

    return (
        <FlatList data={data} renderItem={renderItem} />
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
    }
})
