import React, { useState, useEffect } from 'react';
import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocumentDeletion, useFirestoreQuery } from "@react-query-firebase/firestore";
import { Note } from '@model/Note';
import { useMutation } from 'react-query';
import OpenAI from "openai";
import { Campaign } from '@model/Campaign';

export function useCampaignNotes(campaignDocId: string): {notes: Note[], isLoading: boolean, refetch: () => void} {
    const ref = query(
        collection(firestore, "notes"),
        where("campaignDocId", "==", campaignDocId),
    );
    const notesQuery = useFirestoreQuery([`${campaignDocId}-campaignNotesList`], ref, { subscribe: true });
    const { data, isLoading, refetch } = notesQuery;
    const notesData = data?.docs.map(note =>( {...note.data(), docId: note.id, date: note.data()?.date?.toDate()})) || [];

    return { notes: notesData, isLoading, refetch };
  }

  export const useAddNote = (onSuccess?: () => void) => {
    const ref = collection(firestore, "notes");
    const mutation = useFirestoreCollectionMutation(ref, {onSuccess});
  
    return {...mutation, mutate: (newNote: Note) => mutation.mutate(newNote)}
  }

export const useDeleteNote = (noteID: string) => {
  const col = collection(firestore, "notes");
  const ref = doc(col, noteID);
  const mutation = useFirestoreDocumentDeletion(ref);
  return mutation;
}

export const useGenerateSummaryNote = (onSuccess = (_message: any) => {}) => {
  return useMutation({
    mutationKey: ["generateAINote"],
    onSuccess,
    mutationFn: async ({notes = [], campaign}: {notes: Note[], campaign: Campaign}) => {
      
      let message = `Make me a D&D summary based on the following notes.
      Each note has a date attached to when it was taken and the note itself is formatted in markdown.
      Notes are seperated with the deliminator //--//.
      Try to parse out important or exciting information and return the summary in a formatted markdown.
      Try Make the overall summary a few paragraphs that are readable and interesting, like a tv drama recap with a cliff hanger. Make it so it covers generally everything, dedicate the last paragraph to being more specific with the most recen entries with regards to their dates.
      After that add a section for important clues and events.
      `;

      const parsedNotes = notes.map((note, index) => `${index} - ${note.content} - ${note?.date?.toDateString()}`)

      message += parsedNotes?.join("//--//")

      const openai = new OpenAI({
        apiKey: campaign?.aiApiKey,
        dangerouslyAllowBrowser: true
      });

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": message}],
        
      });
      console.log(chatCompletion.choices[0].message.content)
      return chatCompletion.choices[0].message.content
    }
  })
}

export const useGenerateAssistedNoteNote = (onSuccess = (_message: any) => {}) => {
  return useMutation({
    mutationKey: ["generateAINote"],
    onSuccess,
    mutationFn: async ({seedNotes = [], prompt = "", campaign}: {seedNotes: Note[], prompt: string, campaign: Campaign}) => {
      console.log(seedNotes)
      
      let message = `
        Given a prompt and some recent notes for context, generate a single note for my dnd campaign, make it readable and fun, and utilize markdown to make it more interesting.
        The note just needs to be anywhere from a sentance to a paragraph or two. it does not need any real world date info, or headers. 
        The prompt is "${prompt}" and the campaign is called ${campaign?.title}.
        The previous notes for context are seperated with the deliminator //--// and have a date attached to them. they are:
      `;

      const parsedNotes = seedNotes.map((note, index) => `${index} - ${note.content} - ${note?.date?.toDateString()}`)

      message += parsedNotes?.join("//--//")

      const openai = new OpenAI({
        apiKey: campaign?.aiApiKey,
        dangerouslyAllowBrowser: true
      });

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": message}],
        
      });
      console.log(chatCompletion.choices[0].message.content)
      return chatCompletion.choices[0].message.content
    }
  })
}