import React, { useState, useEffect } from 'react';
import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocument, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { Character } from "../model/Character";
import { ButtonStatuses, LoadingButton } from "../components/Button/LoadingButton"

export function useCharacter(characterDocId = "") {
  const ref = doc(firestore, "characters", characterDocId);

  const campaignQuery = useFirestoreDocument(["singleCharacter", characterDocId], ref, {subscribe: true});
  
  const { data, isLoading } = campaignQuery;

  const characterData = data?.data() || {};

  const character = new Character(
    characterDocId,
    characterData.name,
    characterData.campaignDocId,
    characterData.characterImageURL,
    characterData.player,
    characterData.backstory,
    characterData.className,
    characterData.dndBeyondURL,
  );

  return { character, isLoading };
}

export const useAddCharacterButton = (newCharacter: Character, onClick: () => void, validate: () => boolean) => {
  const ref = collection(firestore, "characters");
  const mutation = useFirestoreCollectionMutation(ref);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);

  const { name = "", player = "", campaignDocId = "", characterImageURL = "", backstory = "", className = "", dndBeyondURL = "" } = newCharacter;

  const handleClick = () => {

    const valid = validate();
    console.log('VALID', valid)
    if (valid) {
      mutation.mutate({ name, player, characterImageURL, backstory, className, dndBeyondURL, campaignDocId })
      console.log("ERROR", mutation.error)
    }

    if (!mutation.error && valid){
      setButtonStatus(mutation.status as ButtonStatuses)

      onClick();
    } else {
      setButtonStatus(ButtonStatuses.Error as ButtonStatuses)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setButtonStatus(ButtonStatuses.Idle), 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [buttonStatus])

  return (
    <LoadingButton color="success" size="large" isLoading={mutation.isLoading} status={buttonStatus} onClick={handleClick}>Save Character</LoadingButton>
  );
}

export const useUpdateCharacterButton = (newCharacter: Character, onClick: () => void, validate: () => boolean) => {
  const npcs = collection(firestore, "characters");
  const ref = newCharacter.docId && doc(npcs, newCharacter.docId);
  const mutation = useFirestoreDocumentMutation(ref);

  const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);

  const { name = "", player = "", campaignDocId = "", characterImageURL = "", backstory = "", className = "", dndBeyondURL = "", docId } = newCharacter;
  console.log(newCharacter)

  const handleClick = () => {

    const valid = validate();
    console.log('VALID', valid)
    if (valid) {
      mutation.mutate({ docId, name, player, characterImageURL, backstory, className, dndBeyondURL, campaignDocId })
      console.log("ERROR", mutation.error)
    }

    if (!mutation.error && valid){
      setButtonStatus(mutation.status as ButtonStatuses)

      onClick();
    } else {
      setButtonStatus(ButtonStatuses.Error as ButtonStatuses)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setButtonStatus(ButtonStatuses.Idle), 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [buttonStatus])

  return (
    <LoadingButton color="success" size="large" isLoading={mutation.isLoading} status={buttonStatus} onClick={handleClick}>Update Character</LoadingButton>
  );
}

export function useCharacters() {
  const ref = query(collection(firestore, "characters"));

  const characterQuery = useFirestoreQuery(["charactersList"], ref, { subscribe: true });

  console.log("characterQ", characterQuery)
  
  const { data, isLoading, refetch } = characterQuery;

  const charactersData = data?.docs.map(character => {
    const {
      name,
      characterImageURL,
      player,
      backstory,
      className,
      campaignDocId,
      dndBeyondURL
    } = character.data()
    console.log("YA")
    return new Character(
      character.id,
      name,
      campaignDocId,
      characterImageURL,
      player,
      backstory,
      className,
      dndBeyondURL
    );
  });

  return { characters: charactersData, isLoading, refetch };
}

export function useCampaignCharacters(campaignDocId: string) {
  const ref = query(collection(firestore, "characters"), where("campaignDocId", "==", campaignDocId));

  const characterQuery = useFirestoreQuery([`${campaignDocId}-campaignCharactersList`], ref, { subscribe: true });
  
  const { data, isLoading, refetch } = characterQuery;

  const charactersData = data?.docs.map(character => {
    const {
      name,
      characterImageURL,
      player,
      backstory,
      className,
      campaignDocId,
      dndBeyondURL
    } = character.data()
    return new Character(
      character.id,
      name,
      campaignDocId,
      characterImageURL,
      player,
      backstory,
      className,
      dndBeyondURL
    );
  });

  return { characters: campaignDocId && charactersData, isLoading, refetch };
}
