import { YardDTO } from "@/types/types";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

interface YardFormProps {
  initialData?: YardDTO;
  onSubmit: (data: YardDTO) => Promise<void>;
  title: string;
  buttonText: string;
}

export default function YardForm({ initialData, onSubmit, title, buttonText }: YardFormProps) {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [cep, setCep] = useState(initialData?.cep || "");
  const [logradouro, setLogradouro] = useState(initialData?.logradouro || "");
  const [numero, setNumero] = useState(initialData?.numero || "");
  const [bairro, setBairro] = useState(initialData?.bairro || "");
  const [cidade, setCidade] = useState(initialData?.cidade || "");
  const [estado, setEstado] = useState(initialData?.estado || "");
  const [pais, setPais] = useState(initialData?.pais || "");

  const handleSave = async () => {
    try {
      await onSubmit({ nome, cep, logradouro, numero, bairro, cidade, estado, pais });
      Alert.alert("Sucesso", "Operação realizada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível realizar a operação.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome do pátio"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          value={cep}
          onChangeText={setCep}
          placeholder="CEP"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Logradouro</Text>
        <TextInput
          style={styles.input}
          value={logradouro}
          onChangeText={setLogradouro}
          placeholder="Logradouro"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          value={numero}
          onChangeText={setNumero}
          placeholder="Número"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Bairro</Text>
        <TextInput
          style={styles.input}
          value={bairro}
          onChangeText={setBairro}
          placeholder="Bairro"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          value={cidade}
          onChangeText={setCidade}
          placeholder="Cidade"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Estado</Text>
        <TextInput
          style={styles.input}
          value={estado}
          onChangeText={setEstado}
          placeholder="Estado"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>País</Text>
        <TextInput
          style={styles.input}
          value={pais}
          onChangeText={setPais}
          placeholder="País"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>{buttonText}</Text>
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
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#00A651",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
