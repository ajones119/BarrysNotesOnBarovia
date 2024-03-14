import { useLocalStorage } from "usehooks-ts";

const useLocalCharacter = (campaignId: string) => {
    const [selectedCharacters, setSelectedCharacters] = useLocalStorage<any>(`BnoB-selectedCharacters`, "")


    return {
        selectedCharacter: selectedCharacters[campaignId],
        setSelectedCharacter: (characterId: string) => {
            const characters = {...selectedCharacters};
            characters[campaignId] = characterId;
            setSelectedCharacters(characters);
        }
};
}

export default useLocalCharacter;