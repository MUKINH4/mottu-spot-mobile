import { api } from "@/actions/fetchData";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MotosByPatioScreen({ route, navigation }: any) {

    const { patioNome, patioId } = route.params;
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        (async () => {
            const cached = await AsyncStorage.getItem(`motos_${patioId}`);
            if (cached) setData(JSON.parse(cached));
            fetchData();
        })();
    }, [patioId]);

    const onRefresh = () => {
        setRefreshing(true)
        fetchData()
    }

    async function fetchData() {
        try {
            const response = await api.get(`patio/${patioId}`)
            const motos = response.data.motos;
            setData(motos);
            await AsyncStorage.setItem(`motos_${patioId}`, JSON.stringify(motos));
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false)
        }
    }

    // editar e excluir moto
    const handleEdit = (item: any) => {
        navigation.navigate('edit-moto', { id: item.id });
    };
    const handleDelete = async (item: any) => {
        // await deleteMoto(item.id);
        fetchData();
    };


    const renderItem = ({ item }: { item: any }) => (
         <View style={styles.card}>
            <Text style={styles.cardTitle}>Placa: {item.placa}</Text>
            <Text style={styles.cardDetails}>Descrição: {item.descricao}</Text>
            <View style={styles.statusContainer}>
                <Ionicons
                    name="ellipse"
                    size={16}
                    color={item.status === "ATIVO" ? "#00A651" : "#FF0000"} // Verde para ativo, vermelho para inativo
                    style={styles.statusIcon}
                />
                <Text style={[styles.statusText, { color: item.status === "ATIVO" ? "#00A651" : "#FF0000" }]}>
                    {item.status === "ATIVO" ? "Disponível" : "Indisponível"}
                </Text>
            </View>
            <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                    <Ionicons name="pencil" size={20} color="#fff" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                    <Ionicons name="trash" size={20} color="#fff" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Motos no {patioNome}</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>
                        Ainda não há motos neste pátio
                        
                    </Text>
                    )}
                contentContainerStyle={styles.list}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2F3A4A",
        padding: 16,
    },
    header: {
        fontSize: 24, // Aumentado
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 16,
    },
    list: {
        paddingBottom: 16,
    },
    card: {
        backgroundColor: "#6FBF92",
        borderRadius: 8,
        padding: 20, // Aumentado
        marginBottom: 16, // Aumentado
    },
    cardTitle: {
        fontSize: 20, // Aumentado
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 8, // Aumentado
    },
    cardDetails: {
        fontSize: 16, // Aumentado
        color: "#D9D9D9",
        marginBottom: 8, // Aumentado
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    statusIcon: {
        marginRight: 8,
    },
    statusText: {
        fontSize: 16, // Aumentado
        fontWeight: "bold",
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    actionIcon: {
        marginHorizontal: 8,
    },
    emptyText: {
        textAlign: "center",
        margin: 'auto',
        fontSize: 24,
        color: "white"
    },
});