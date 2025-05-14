import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';

export default function AddMotoScreen({ route }: any) {
    const { patioId, patioName } = route.params;
    const navigation = useNavigation<any>()

    const [status, setStatus] = useState();
    const [descricao, setDescricao] = useState("");
    const [placa, setPlaca] = useState("");
    
    return (
        <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>Adicionar Moto</Text>

        <Text style={styles.label}>Placa</Text>
        <TextInput
          style={styles.input}
          placeholder="BRA2E19"
          placeholderTextColor="#999"
          value={placa}
          onChangeText={setPlaca}
        />
        <Text style={styles.label}>Status</Text>
        <Picker selectedValue={status}
            onValueChange={(itemValue, itemIndex) => {
                setStatus(itemValue);
            }}
            style={[styles.input, styles.picker]}
            itemStyle={styles.pickerItem}
            >
            <Picker.Item value="ATIVO" label="Disponível" style={styles.input}/>
            <Picker.Item value="INATIVO" label="Indisponível" style={styles.input} />
        </Picker>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrição da moto"
          placeholderTextColor="#999"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} >Adicionar moto</Text>
        </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
    
    )
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
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: '#333',
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    pickerItem: {
        fontSize: 16,
        color: '#333',
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
  