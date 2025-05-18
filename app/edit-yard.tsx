import { getYardById, updateYard } from "@/actions/yard-crud";
import YardForm from "@/components/YardForm";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

export default function EditYardScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params;

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    (async () => {
      const yard = await getYardById(id);
      setInitialData(yard);
    })();
  }, [id]);

  const handleUpdateYard = async (data: {
    nome: string;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
  }) => {
    await updateYard(id, data);
    navigation.goBack();
  };

  if (!initialData) return null;

  return (
    <YardForm
      title="Editar Pátio"
      buttonText="Atualizar"
      initialData={initialData}
      onSubmit={handleUpdateYard}
    />
  );
}
