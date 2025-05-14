import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface AddButtonProps {
  onPress: () => void;
}

export default function AddButton({ onPress }: AddButtonProps) {

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontAwesome6 name="add" size={16} color="white"/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00A651",
    paddingVertical: 8,
    paddingHorizontal: 21,
    borderRadius: 20,
    marginRight: 10,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});