import { api } from "@/actions/api";
import { deleteMoto } from "@/actions/moto-crud";
import FindDeviceButton from "@/components/find-moto-btn";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MotosByPatioScreen({ route, navigation }: any) {

    const { patioNome, patioId } = route.params
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        (async () => {
            const cached = await AsyncStorage.getItem(`motos_${patioId}`);
            if (cached) setData(JSON.parse(cached));
            fetchData();
        })();
    }, [patioId]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation, patioId]);

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
        } catch (error: any) {
            Alert.alert("Erro", error)
            console.log(error)
        } finally {
            setRefreshing(false)
        }
    }

    const handleEdit = (item: any) => {
        navigation.navigate('edit-moto', { id: item.id, patioId: patioId });
    };
    const handleDelete = (item: any) => {
        Alert.alert(
            "Confirmar",
            "Tem certeza que deseja deletar esta moto?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sim",
                    onPress: async () => {
                        try {
                            await deleteMoto(item.id);
                            Alert.alert("Sucesso", "Moto deletada com sucesso!");
                            fetchData();
                        } catch (error: any) {
                            Alert.alert("Erro", error.message || "Não foi possível deletar a moto. Tente novamente mais tarde.");
                        }
                    },
                },
            ]
        );
    };


    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
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
                </View>
                <View>
                    <FindDeviceButton onPress={() => console.log("Botão apertado!")}></FindDeviceButton>
                </View>
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