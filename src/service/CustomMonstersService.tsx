import { addDoc, collection, deleteDoc, doc, query, setDoc } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { useFirestoreDocumentDeletion, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { BaseCharacter } from "@model/BaseCharacter";
import { useMutation } from "react-query";
import { uploadBytes, ref as storageRef, getDownloadURL, deleteObject } from "firebase/storage";

export const useCreateCustomMonster = (onSuccess: () => void) => {
    return useMutation({
        mutationKey: ["addMonster"],
        onSuccess,
        mutationFn: async (newMonster: BaseCharacter) => {
            const ref = collection(firestore, "customMonsters");
            const response = await addDoc(ref, {...newMonster, characterImageURL: ""});
            const id = response.id;
            let imageURL = ""

            if (newMonster?.characterImageURL instanceof File) {
            const imageRef = storageRef(storage, `images/customMonsters/${id}`);
            await uploadBytes(imageRef, newMonster?.characterImageURL);
            imageURL = await getDownloadURL(imageRef);
            } else {
            imageURL = newMonster?.characterImageURL || "";
            }

            if (imageURL) {
                const npcRef = doc(firestore, "customMonsters", id);
                await setDoc(npcRef, {
                characterImageURL: imageURL
            }, {merge: true})
            }
        }
    })
}

export const useEditCustomMonster = (onSuccess: () => void) => {
    return useMutation({
        mutationKey: ["edit-monster"],
        onSuccess,
        mutationFn: async (monster: BaseCharacter) => {
            const docId = monster?.docId;
            if (!docId) return;

            let imageURL = ""

            if (monster?.characterImageURL instanceof File) {
            const imageRef = storageRef(storage, `images/customMonsters/${docId}`);
            await uploadBytes(imageRef, monster?.characterImageURL);
            imageURL = await getDownloadURL(imageRef);
            } else {
            imageURL = monster?.characterImageURL || "";
            }

            delete(monster.docId);
            const monsterRef = doc(firestore, "customMonsters", docId)
            await setDoc(monsterRef, {
            ...monster,
            characterImageURL: imageURL
            })
        }
    })
}

export const useDeleteCustomMonster = (onSuccess?: () => void) => {
    return useMutation({
        mutationKey: ["delete-npc"],
        onSuccess,
        mutationFn: async (docid: string) => {
            const imageRef = storageRef(storage,  `images/customMonsters/${docid}`);
            const docRef = doc(firestore, "customMonsters", docid)
            await deleteDoc(docRef);
            await deleteObject(imageRef)
        }
    })
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