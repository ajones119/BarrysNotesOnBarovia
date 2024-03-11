import { addDoc, collection, deleteDoc, doc, query, setDoc, where } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { CombatMap, CombatToken } from '@model/CombatMap';
import { useMutation } from 'react-query';
import { uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";

export const useUpdateCombatMap = (docId: string) => {
    return useMutation({
        mutationKey: ["combat-mutate"],
        mutationFn: async (updatedCombat: Partial<CombatMap>) => {
            const ref = doc(firestore, "combatMaps", docId)
            let imageURL = "";
            if (updatedCombat?.mapImage){
                if (updatedCombat?.mapImage instanceof File) {
                    const imageRef = storageRef(storage, `images/combats/${docId}`);
                    await uploadBytes(imageRef, updatedCombat?.mapImage);
                    imageURL = await getDownloadURL(imageRef)
                } else {
                    imageURL = typeof updatedCombat?.mapImage === "string" ? updatedCombat?.mapImage || "" : "";
                }

                updatedCombat["mapImage"] = imageURL;
            }

            await setDoc(ref, {
                ...updatedCombat
            }, {merge: true})
        }
    })
}

export const useAddCombatMap = () => {
    const ref = collection(firestore, "combatMaps");
    const mutation = useFirestoreCollectionMutation(ref);
    return mutation;
}

export const useCombatMap = (combatId: string) => {
    const ref = query(collection(firestore, "combatMaps"), where("combatDocId", "==", combatId));

    const CombatQuery = useFirestoreQuery([`${combatId}-campaignCombatMapsList`], ref, { subscribe: true });

    const { data, isLoading, isRefetching, refetch } = CombatQuery;

    const CombatData = data?.docs.map(combat => ({
        ...combat?.data(),
        docId: combat.id,
    }) as CombatMap) || [];
    return { combatMap: CombatData[0], isLoading, isRefetching, refetch };
}

export const useAddCombatToken = (combatMapDocId: string) => {
    return useMutation({
        mutationKey: ["add-combat-token", combatMapDocId],
        mutationFn: async (newToken: CombatToken) => {
            const combatTokensRef = collection(firestore, "combatTokens");
            await addDoc(combatTokensRef, {
                ...newToken,
                combatMapDocId,
            })
        }
    })
}

export const useDeleteCombatToken = () => {
    return useMutation({
        mutationKey: ["delete-combat-token"],
        mutationFn: async (docId: string) => {
            const tokenRef = doc(firestore, "combatTokens", docId);
            await deleteDoc(tokenRef);
        }
    })
}

export const useCombatMapTokens = (combatMapDocId: string) => {
    const ref = query(collection(firestore, "combatTokens"), where("combatMapDocId", "==", combatMapDocId));

    const CombatTokensQuery = useFirestoreQuery([`${combatMapDocId}-campaignCombatTokensList`], ref, { subscribe: true });

    const { data, isLoading, isRefetching, refetch } = CombatTokensQuery;

    const tokens = data?.docs.map(token => ({
        ...token?.data(),
        docId: token.id,
    }) as CombatToken) || [];
    console.log(tokens)
    return { tokens, isLoading, isRefetching, refetch };
}

export const mutateCombatToken = async (docId: string, newCombatToken: Partial<CombatToken>) => {
    if (docId) {
        const ref = doc(firestore, "combatTokens", docId);
        await setDoc(ref, {...newCombatToken}, {merge: true})
    }
}

