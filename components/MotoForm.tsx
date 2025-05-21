import { MotoDTO, Status } from "@/types/types";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

interface MotoFormProps {
  initialData?: {
    placa: string;
    descricao: string;
    status: Status;
  };
  onSubmit: (data: MotoDTO) => Promise<void>;
  title: string;
  buttonText: string;
  patioName?: string;
}

export default function MotoForm({ initialData, onSubmit, title, buttonText, patioName }: MotoFormProps) {
  const [placa, setPlaca] = useState(initialData?.placa || "");
  const [descricao, setDescricao] = useState(initialData?.descricao || "");
  const [status, setStatus] = useState<Status>(initialData?.status || "ATIVO");

  const handleSave = async () => {
    if (!placa.trim() || !descricao.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    try {
      await onSubmit({ placa, descricao, status });
      Alert.alert("Sucesso", "Operação realizada com sucesso!");
    } catch (error: any) {
      console.error(error)
      Alert.alert("Erro", error.toString());
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.form}
      >
        {patioName != undefined ? <Text style={styles.title}>{title} no {patioName}</Text> : <Text style={styles.title}>{title}</Text>}

        <Text style={styles.label}>Placa</Text>
        <TextInput
          style={styles.input}
          value={placa}
          onChangeText={text => setPlaca(text.toUpperCase())}
          autoCapitalize="characters"
          placeholder="ABC1E19"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Descrição da moto"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Status</Text>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Disponível" value="ATIVO" />
          <Picker.Item label="Indisponível" value="INATIVO" />
        </Picker>

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
