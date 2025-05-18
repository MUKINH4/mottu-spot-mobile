import { getMotoById, updateMoto } from "@/actions/moto-crud";
import MotoForm from "@/components/MotoForm";
import { MotoDTO, Status } from "@/types/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function EditMotoScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id, patioId } = route.params;
  const [initialData, setInitialData] = useState<MotoDTO | null>(null);

    console.log(route.params)

  useEffect(() => {
    (async () => {
      const moto = await getMotoById(id);
      console.log(moto)
      setInitialData(moto);
    })();
  }, [id]);

  console.log(patioId)
  const handleUpdateMoto = async (data: MotoDTO) => {
    console.log(data)
    await updateMoto(id, data);
    navigation.goBack();
  };

  if (!initialData) return null;

  return (
    <MotoForm
      title="Editar Moto"
      buttonText="Atualizar"
      initialData={initialData}
      onSubmit={handleUpdateMoto}
    />
  );
}
