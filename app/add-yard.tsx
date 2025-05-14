import { addYard } from "@/actions/add-yard";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

export default function AddYardScreen() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [pais, setPais] = useState("");

  const handleSave = async () => {
    try {
      const numeroParsed = Number(numero);
      if (isNaN(numeroParsed)) {
        return Alert.alert("Erro", "O campo Número deve ser um valor numérico");
      }
      const response = await addYard({nome, cep, logradouro, numero, bairro, cidade, estado, pais})
      navigation.goBack();
      return response;
    } catch (error){
      console.log("Erro bosta: ", error)
    }
    
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>Adicionar Pátio</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o CEP"
          placeholderTextColor="#999"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Logradouro</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o logradouro"
          placeholderTextColor="#999"
          value={logradouro}
          onChangeText={setLogradouro}
        />

        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o número"
          placeholderTextColor="#999"
          value={numero}
          onChangeText={setNumero}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Bairro</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o bairro"
          placeholderTextColor="#999"
          value={bairro}
          onChangeText={setBairro}
        />

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe a cidade"
          placeholderTextColor="#999"
          value={cidade}
          onChangeText={setCidade}
        />

        <Text style={styles.label}>Estado</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o estado"
          placeholderTextColor="#999"
          value={estado}
          onChangeText={setEstado}
        />

        <Text style={styles.label}>País</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o país"
          placeholderTextColor="#999"
          value={pais}
          onChangeText={setPais}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F3A4A",
  },
  form: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: "#000000",
  },
  button: {
    backgroundColor: "#00A651",
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
