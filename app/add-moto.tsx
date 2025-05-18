import { addMoto } from "@/actions/moto-crud";
import MotoForm from "@/components/MotoForm";
import { MotoDTO } from "@/types/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";

export default function AddMotoScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { patioId, patioName } = route.params;

  const handleAddMoto = async (data: MotoDTO) => {
    await addMoto({ ...data, patioId });
    navigation.goBack();
  };

  return (
    <MotoForm
      patioName={patioName}
      title="Adicionar Moto"
      buttonText="Salvar"
      onSubmit={handleAddMoto}
    />
  );
}
