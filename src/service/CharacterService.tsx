import React, { useState, useEffect } from "react";
import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import {
  useFirestoreCollectionMutation,
  useFirestoreDocument,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import {
  ButtonStatuses,
  LoadingButton,
} from "@components/Button/LoadingButton";
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

export const useAddCharacterButton = (
  newCharacter: PlayerCharacter,
  onClick: () => void,
  validate: () => boolean,
) => {
  const ref = collection(firestore, "characters");
  const mutation = useFirestoreCollectionMutation(ref);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(
    ButtonStatuses.Idle,
  );

  const {
    name = "",
    player = "",
    campaignDocId = "",
    characterImageURL = "",
    backstory = "",
    className = "",
    dndBeyondURL = "",
    passivePerception = 0,
    initiativeBonus = 0,
    armorClass = 0,
    maxHealth = 0,
  } = newCharacter;

  const handleClick = () => {
    const valid = validate();
    if (valid) {
      mutation.mutate({
        name,
        player,
        characterImageURL,
        backstory,
        className,
        dndBeyondURL,
        campaignDocId,
        passivePerception,
        initiativeBonus,
        armorClass,
        maxHealth,
      });
    }

    if (!mutation.error && valid) {
      setButtonStatus(mutation.status as ButtonStatuses);

      onClick();
    } else {
      setButtonStatus(ButtonStatuses.Error as ButtonStatuses);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setButtonStatus(ButtonStatuses.Idle), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [buttonStatus]);

  return (
    <LoadingButton
      color="success"
      size="large"
      isLoading={mutation.isLoading}
      status={buttonStatus}
      onClick={handleClick}
    >
      Save Character
    </LoadingButton>
  );
};

export const useUpdateCharacterButton = (
  newCharacter: PlayerCharacter,
  onClick: () => void,
  validate: () => boolean,
) => {
  const npcs = collection(firestore, "characters");
  const ref = doc(npcs, newCharacter.docId || "1");
  const mutation = useFirestoreDocumentMutation(ref);

  const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(
    ButtonStatuses.Idle,
  );

  const handleClick = () => {
    const valid = validate();
    if (valid) {
      mutation.mutate({
        ...newCharacter
      });
    }

    if (!mutation.error && valid) {
      setButtonStatus(mutation.status as ButtonStatuses);

      onClick();
    } else {
      setButtonStatus(ButtonStatuses.Error as ButtonStatuses);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setButtonStatus(ButtonStatuses.Idle), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [buttonStatus]);

  return (
    <LoadingButton
      color="success"
      size="large"
      isLoading={mutation.isLoading}
      status={buttonStatus}
      onClick={handleClick}
    >
      Update Character
    </LoadingButton>
  );
};

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
