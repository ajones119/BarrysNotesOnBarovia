import { addDoc, collection, deleteDoc, doc, query, setDoc, where } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { CombatMap, CombatToken } from '@model/CombatMap';
import { useMutation } from 'react-query';
import { uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";
import { Socket, connect } from "socket.io-client";
import { API_URL, LOCAL_API_URL } from "./constants";
import { useEffect, useRef, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

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

export const useCombatMapTokens = (combatMapDocId: string, disabled = false) => {
    const ref = query(collection(firestore, "combatTokens"), where("combatMapDocId", "==", combatMapDocId));

    const CombatTokensQuery = useFirestoreQuery(
        [`${combatMapDocId}-campaignCombatTokensList`, "disabled"],
        ref,
        { subscribe: true },
        {enabled: !disabled}
        );

    const { data, isLoading, isRefetching, refetch } = CombatTokensQuery;

    const tokens = data?.docs.map(token => ({
        ...token?.data(),
        docId: token.id,
    }) as CombatToken) || [];
    return { tokens, isLoading, isRefetching, refetch };
}

export const mutateCombatToken = async (docId: string, newCombatToken: Partial<CombatToken>) => {
    if (docId) {
        const ref = doc(firestore, "combatTokens", docId);
        await setDoc(ref, {...newCombatToken}, {merge: true})
    }
}

export const useMutateCombatToken = () => {
    return useMutation({
        mutationKey: ["combat-token"],
        mutationFn: async ({id, token}: {id: string, token: Partial<CombatToken>}) => await mutateCombatToken(id, token)
    });
}


//SOCKET SERVICES
export const useCombatMapSocketService = (campaignDocId: string, onRecievedTokenUpdate: (tokenId: string, tokenData: CombatToken) => void, handleSocketCursorUpdate: (cursors: {color: string, x: number, y: number, id: string}) => void, dependency: any) => {
    const socketRef = useRef<Socket|null>(null)
    const [isConnected ,setIsConnected] = useState(false);

    const joinCombatSocketRoom = () => {
        socketRef.current?.emit("join_room", campaignDocId);
    }

    const connectToSocket = () => {
        if (!socketRef?.current?.connected) {
            socketRef.current = connect(process.env.SERVER_URL || "");
        }
        joinCombatSocketRoom();
        setIsConnected(socketRef?.current?.connected)
    }

    const updateTokenPosition = (tokenId: string, tokenData: CombatToken) => {
        socketRef.current?.emit("update_combat_token", {
            room: campaignDocId,
            tokenId,
            tokenData
        })
    }

    const updatePingingCursor = (cursor: {color: string, x: number, y: number}) => {
        socketRef.current?.emit("update_pinging_cursor", {
            room: campaignDocId,
            ...cursor,
            id: socketRef.current.id
        })
    }

    useEffect(() => {
        socketRef.current = connect(process.env.SERVER_URL || "");
    }, []);

    useEffect(() => {
        !socketRef?.current?.connected && connectToSocket();
    }, [socketRef?.current?.connected])

    

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current?.on("recieve_combat_token", (data) => {
                socketRef?.current?.id !== data?.senderId && onRecievedTokenUpdate(data?.tokenId, data?.tokenData)
            })
            socketRef.current?.on("recieve_pinging_cursor", (data) => {
                socketRef?.current?.id !== data?.senderId && handleSocketCursorUpdate(data)
            })
        }
        
        return(() => {
            socketRef.current?.off('recieve_combat_token');
            socketRef.current?.off('recieve_pinging_cursor');
        })
    }, [socketRef.current, JSON.stringify({...dependency})]);

    return {
        updateTokenPosition,
        updatePingingCursor,
        socket: socketRef.current,
        isConnected: socketRef.current?.connected,
        reconnect: connectToSocket
    }

}



