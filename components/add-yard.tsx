import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function AddYard() {
  const handlePress = () => {
    console.log("Botão adicionar clicado!");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>+ adicionar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00A651",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});