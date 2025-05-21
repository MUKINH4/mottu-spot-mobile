import { getMotoById, updateMoto } from "@/actions/moto-crud";
import MotoForm from "@/components/MotoForm";
import { MotoDTO } from "@/types/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

export default function EditMotoScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id, patioId } = route.params;
  const [initialData, setInitialData] = useState<MotoDTO | null>(null);

  console.log(id)

  useEffect(() => {
    (async () => {
      const moto = await getMotoById(id);
      setInitialData(moto);
    })();
  }, [id]);

  const handleUpdateMoto = async (data: MotoDTO) => {
    console.log(data)
    await updateMoto(id, {...data, patioId});
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
