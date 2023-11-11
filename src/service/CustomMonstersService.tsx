import { collection, doc, query } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocumentDeletion, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { BaseCharacter } from "@model/BaseCharacter";

export const useCreateCustomMonster = (onSuccess: () => void) => {
    const ref = collection(firestore, "customMonsters");
    const mutation = useFirestoreCollectionMutation(ref, {onSuccess: onSuccess});
  
    return {
        mutate: (newMonster: BaseCharacter) => mutation.mutate(newMonster),
        isLoading: mutation.isLoading
    }
}

export const useEditCustomMonster = (monster: BaseCharacter | null = null, onSuccess: () => void) => {
    const docId = monster?.docId || "bad value";
    const monsters = collection(firestore, "customMonsters");
    const ref = doc(monsters, docId) ;
    const mutation = useFirestoreDocumentMutation(ref,{}, {onSettled: onSuccess});
    
  
    return {
        mutate: (newMonster: BaseCharacter) => {
            delete newMonster?.docId
            mutation.mutate(newMonster)
        },
        isLoading: mutation.isLoading
    }
}

export const useDeleteCustomMonster = (monster: BaseCharacter, onSuccess?: () => void) => {
    const monsters = collection(firestore, "customMonsters");
    const ref = doc(monsters, monster.docId);
    const mutation = useFirestoreDocumentDeletion(ref, {onSettled: onSuccess});
  
    return {
        mutate: () => mutation.mutate(),
        isLoading: mutation.isLoading,
        error: mutation.error
    }
}

export function useCustomMonsters() {
    const ref = query(collection(firestore, "customMonsters"));
    const characterQuery = useFirestoreQuery(["customMonstersList"], ref, { subscribe: true });
    const { data, isLoading, refetch } = characterQuery;

  
    const monsters =  data?.docs.map(document => {
        return({...document.data(), docId: document?.id } as BaseCharacter)
    })

    return { monsters, isLoading, refetch };
  }