import { addDoc, collection, deleteDoc, doc, getDocs, query, runTransaction, setDoc, where, writeBatch } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { useMutation } from "react-query";
import { uploadBytes, ref as storageRef, getDownloadURL, deleteObject } from "firebase/storage";
import { CombatToken, CustomToken } from "@model/CombatMap";
import { COLORS_MAP } from "@components/ColorPicker/ColorPicker";

export const useCreateCustomToken = (onSuccess: () => void) => {
    return useMutation({
        mutationKey: ["addToken"],
        onSuccess,
        mutationFn: async (newToken: CustomToken) => {
            const ref = collection(firestore, "customTokens");
            const response = await addDoc(ref, {...newToken, image: ""});
            const id = response.id;
            let imageURL = ""

            if (newToken?.image instanceof File) {
            const imageRef = storageRef(storage, `images/customTokens/${id}`);
            await uploadBytes(imageRef, newToken?.image);
            imageURL = await getDownloadURL(imageRef);
            } else {
            imageURL = newToken?.image || "";
            }

            if (imageURL) {
                const tokenRef = doc(firestore, "customTokens", id);
                await setDoc(tokenRef, {
                image: imageURL
            }, {merge: true})
            }
        }
    })
}

export const useEditCustomToken = (onSuccess: () => void) => {
    return useMutation({
        mutationKey: ["edit-token"],
        onSuccess,
        mutationFn: async (token: CustomToken) => {
            runTransaction(firestore, async () => {
                const docId = token?.docId;
                if (!docId) return;

                let imageURL = ""

                if (token?.image instanceof File) {
                const imageRef = storageRef(storage, `images/customTokens/${docId}`);
                await uploadBytes(imageRef, token?.image);
                imageURL = await getDownloadURL(imageRef);
                } else {
                imageURL = token?.image || "";
                }

                delete(token.docId);
                const tokenRef = doc(firestore, "customTokens", docId)
                await setDoc(tokenRef, {
                ...token,
                image: imageURL
                })
                const combatTokensQuery = query(collection(firestore, "combatTokens"), where("baseTokenId", "==", docId));
                const combatTokensSnapshot = await getDocs(combatTokensQuery);
                console.log("combatTokensSnapshot", combatTokensSnapshot.size)
                if (combatTokensSnapshot.size > 0) {
                    console.log("FOUND TOKJENS")
                    combatTokensSnapshot.forEach(async (doc) => {
                        const data = doc.data() as CombatToken;
                        console.log("DATA", data)

                        delete(data?.docId);
                        await setDoc(doc.ref, {
                            data: {
                                ...data.data,
                                width: token.width,
                                length: token.height,
                                image: imageURL,
                                opacity: token?.opacity,
                                color: token?.canChangeColor ? (COLORS_MAP.Gray) : null
                            },
                        }, {merge: true})
                    });
                    console.log("COMMITTING")
                }
            });
        }
    })
}

export const useDeleteCustomTokens = (onSuccess?: () => void) => {
    return useMutation({
        mutationKey: ["delete-npc"],
        onSuccess,
        mutationFn: async (docid: string) => {
            const imageRef = storageRef(storage,  `images/customTokens/${docid}`);
            const docRef = doc(firestore, "customTokens", docid)
            await deleteDoc(docRef);
            await deleteObject(imageRef)
        }
    })
}

export function useCustomTokens() {
    const ref = query(collection(firestore, "customTokens"));
    const characterQuery = useFirestoreQuery(["customTokensList"], ref, { subscribe: true });
    const { data, isLoading, refetch } = characterQuery;

    const tokens =  data?.docs.map(document => {
        return({...document.data(), docId: document?.id } as CustomToken)
    })

    return { tokens, isLoading, refetch };
}