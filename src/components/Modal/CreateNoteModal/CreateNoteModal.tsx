import React, {useEffect, useState} from 'react';
import { Modal } from '../Modal';
import { Grid, Typography } from '@mui/material';
import css from "./CreateNoteModal.module.scss"
import { useAddNote, useGenerateAssistedNoteNote } from '@services/NotesService';
import { Note } from '@model/Note';
import CharacterPicker from '../../CharacterPicker/CharacterPicker';
import TextEditor from '../../TextEditor';
import { PlayerCharacter } from '@model/PlayerCharacter';
import { Button } from '@components/Button/Button';
import { TextInput } from '@components/TextInput/TextInput';
import Spinner from '@components/Spinner';
import { useCampaign } from '@services/CampaignService';
import { useSearchParams } from 'react-router-dom';
import useLocalCharacter from '@hooks/useLocalCharacter';

declare interface CreateNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string,
    characters: PlayerCharacter[],
    seedNotes?: Note[],
};

export const DEFAULT_NOTE = {date: new Date()}

const CreateNoteModal = ({isOpen, onClose, campaignId, characters, seedNotes = []}: CreateNoteModalProps) => {
    const {selectedCharacter} = useLocalCharacter(campaignId)
    const date = new Date()
    const defaultNote: Note = {...DEFAULT_NOTE, campaignDocId: campaignId, date, characterDocId: selectedCharacter || undefined}
    const {data: campaign} = useCampaign(campaignId);
    const [newNote, setNewNote] = useState<Note>(defaultNote);
    const [prompt, setPrompt] = useState("");
    const {mutate: generate, isLoading: isGenerating} = useGenerateAssistedNoteNote((note: string) => setNewNote({ ...newNote, content: note}));

    const handleOnClose = () => {
        onClose();
    }

    const {mutate, isLoading} = useAddNote(handleOnClose);

    const {
        content,
    } = newNote;

    useEffect(() => {
        setNewNote({...newNote, date: new Date(), content: "", characterDocId: selectedCharacter || undefined})
    }, [isOpen])

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                    <Button
                        color="success"
                        size="large"
                        isLoading={isLoading}
                        onClick={() => {
                                mutate(newNote)
                        }}
                ><Typography>Save Note</Typography></Button>
                ]}>
                <div className={css.CreateNoteModal}>
                    <div className={css.editor}>
                        {isGenerating ? <Spinner /> :
                            <TextEditor value={content || ""} onChange={(value) => setNewNote({ ...newNote, content: value,})} preview="edit" height={250} />
                        }
                    </div>
                    <CharacterPicker characters={characters} value={newNote.characterDocId} onChange={value => setNewNote({ ...newNote, characterDocId: value})} />
                    { campaign?.aiApiKey && 
                        <div className={css.properties}>
                            <TextInput value={prompt || ""} onChange={(value) => setPrompt(String(value))} placeholder='Prompt' className={css.promptEditor} />
                            <div className={css.generateButton}>
                                <Button onClick={() => generate({seedNotes, prompt, campaign: campaign})}><Typography>Generate</Typography></Button>
                            </div>
                        </div>
                    }
                </div>
            </Modal>
        </div>
    );
}

export default CreateNoteModal;
