import { getMotos } from "@/actions/fetchData";
import { AddMotoDTO } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function MotosScreen() {

    const [data, setData] = useState<[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const getAllMotos = async () => {
        try {
            const response = await getMotos()
            setData(response)
            return response
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false)
        }
    }

    useEffect(() => {
        getAllMotos()
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        getAllMotos()
    }

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
        <View style={styles.container}>

            <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#00A651" style={styles.searchIcon} />
            <TextInput style={styles.searchInput} placeholder="Buscar moto" placeholderTextColor="#999" />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter" size={20} color="#00A651" />
            </TouchableOpacity>
          </View>
            <FlatList data={data} renderItem={renderItem} refreshing={refreshing} onRefresh={onRefresh}/>
        </View>
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
    },
    container: {
    flex: 1,
    backgroundColor: "#2F3A4A", // Fundo escuro
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  filterButton: {
    marginLeft: 8,
  },
})
