import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import {
  useFirestoreCollectionMutation,
  useFirestoreDocument,
  useFirestoreDocumentDeletion,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";

import { PlayerCharacter } from "@model/PlayerCharacter";

export function useCharacter(characterDocId = "") {
  const ref = doc(firestore, "characters", characterDocId);

  const campaignQuery = useFirestoreDocument(
    ["singleCharacter", characterDocId],
    ref,
    { subscribe: true },
  );

  const { data, isLoading } = campaignQuery;

  const character: PlayerCharacter = {
    docId: characterDocId,
    name: data?.data()?.name,
    ...data?.data()
  };

  return { character, isLoading };
}

export function useCharacters() {
  const ref = query(collection(firestore, "characters"));

  const characterQuery = useFirestoreQuery(["charactersList"], ref, {
    subscribe: true,
  });

  const { data, isLoading, refetch } = characterQuery;

  const charactersData = data?.docs.map((character) => {
    return {
      docId: character.id,
      name: character.data().name,
      ...character.data()
    };
  });

  return { characters: charactersData, isLoading, refetch };
}

export function useCampaignCharacters(campaignDocId: string): {characters: PlayerCharacter[], isLoading: boolean, refetch: () => void} {
  const ref = query(
    collection(firestore, "characters"),
    where("campaignDocId", "==", campaignDocId),
  );

  const characterQuery = useFirestoreQuery(
    [`${campaignDocId}-campaignCharactersList`],
    ref,
    { subscribe: true },
  );

  const { data, isLoading, refetch } = characterQuery;

  const charactersData = data?.docs.map((character) => {

    return {
      docId: character.id,
      name: character.data().name,
      ...character.data()
    };
  });

  return {
    characters: campaignDocId && charactersData?.length ? charactersData : [],
    isLoading,
    refetch,
  };
}

export const useCreatePlayerCharacter = (onSuccess: () => void) => {
  const ref = collection(firestore, "characters");
  const mutation = useFirestoreCollectionMutation(ref, {onSuccess: onSuccess});

  return {
    ...mutation,
      mutate: (newPC: PlayerCharacter) => mutation.mutate(newPC),
  }
}

export const useEditPlayerCharacter = (pc: PlayerCharacter | null = null, onSuccess: () => void) => {
  const docId = pc?.docId || "bad value";
  const pcs = collection(firestore, "characters");
  const ref = doc(pcs, docId) ;
  const mutation = useFirestoreDocumentMutation(ref,{}, {onSettled: onSuccess});
  
  return {...mutation,
      mutate: (newPC: PlayerCharacter) => {
          delete newPC?.docId
          mutation.mutate(newPC)
      },
  }
}

export const useDeletePlayerCharacter = (characterDocId: string) => {
  const col = collection(firestore, "characters");
  const ref = doc(col, characterDocId);
  const mutation = useFirestoreDocumentDeletion(ref);    

  return mutation;
}
