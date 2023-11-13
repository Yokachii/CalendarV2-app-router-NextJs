"use client"

import { useForm, SubmitHandler, useFormState } from 'react-hook-form';
import {envoyerFormulaire} from '@/utils/action'

type FormData = {
  nom: string;
  // Ajoutez d'autres champs selon vos besoins
};

export default function MonFormulaire() {
  const { register, handleSubmit, control } = useForm<FormData>();
  const { errors } = useFormState({ control });

  const onSubmit: SubmitHandler<FormData> = async (data:any) => {
    // Appelez votre action.ts ou effectuez toute logique de traitement ici
    await envoyerFormulaire(data)
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Nom:
        <input {...register('nom', { required: 'Ce champ est requis' })} />
      </label>

      {errors.nom && <p>{errors.nom.message}</p>}

      <button type="submit">Envoyer</button>
    </form>
  );
}