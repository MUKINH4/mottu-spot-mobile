import { getYards } from "@/actions/fetchData";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Home() {

  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const onRefresh = () => {
    setRefreshing(true)
    fetchData();
  }

  const fetchData = async () => {
    try {
      const response = await getYards();
      setData(response);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setRefreshing(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePress = (item: any) => {
    navigation.navigate("motos", { patioNome: item.nome, patioId: item.id }); // Navegar para a tela de motos
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.cardSubtitle}>
        {item.endereco.logradouro}, {item.endereco.numero}, {item.endereco.bairro} - {item.endereco.cidade}, {item.endereco.estado}
      </Text>
      <Text style={styles.cardDetails}>
        CEP: {item.endereco.cep}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} >
      {/* Barra de busca */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#00A651" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Buscar pátio" placeholderTextColor="#999" />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#00A651" />
        </TouchableOpacity>
      </View>

      {/* Lista de pátios */}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#00A651"]} />
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#6FBF92", // Fundo verde claro
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cardDetails: {
    fontSize: 12,
    color: "#D9D9D9",
  },
});