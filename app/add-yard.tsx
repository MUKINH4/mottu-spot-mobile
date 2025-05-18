import { addYard } from "@/actions/yard-crud";
import YardForm from "@/components/YardForm";
import { YardDTO } from "@/types/types";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function AddYardScreen() {
  const navigation = useNavigation();

  const handleAddYard = async (data: YardDTO) => {
    await addYard(data);
    navigation.goBack();
  };

  return (
    <YardForm
      title="Adicionar Pátio"
      buttonText="Salvar"
      onSubmit={handleAddYard}
    />
  );
}
