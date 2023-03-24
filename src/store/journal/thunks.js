import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDb } from "../../firebase/config";
import { 
    addNewEmptyNote, 
    noteUpdated, 
    savingNewNote, 
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote, 
    setSaving,
    deleteNoteById
} from "./journalSlice";
import {fileUpload, loadNotes} from '../../helpers'

export const startNewNote = () => {

    return async(dispatch, getState) => {

        dispatch(savingNewNote());

        const {uid} = getState().auth;

        //uid
        const newNote = {
            title: '',
            body: '',
            imagesUrls:[],
            date: new Date().getTime(),
        }

        const newDock = doc( collection(FirebaseDb, `${uid}/journal/notes`) )
        await setDoc(newDock, newNote);

        newNote.id = newDock.id;

        //dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }
};

export const startLoadingNotes = () => {

    return async(dispatch, getState) => {

        const {uid} = getState().auth;
        if(!uid) throw new Error('El uid no existe');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

    };
};

export const startSavingNote = () => {

    return async(dispatch, getState) => {

        dispatch(setSaving())

        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const noteToFireStore = {...note}
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDb, `${uid}/journal/notes/${note.id}`);

        await setDoc(docRef, noteToFireStore, {merge: true});
        dispatch(noteUpdated(note))
    }
}

export const startUploadingFiles = (files = []) => {

    return async(dispatch) => {

        dispatch(setSaving());

        //await fileUpload(files[0]);
        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push( fileUpload(file) );
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        
        dispatch(setPhotosToActiveNote(photosUrls))
    }
}

export const startDeletingNote = () => {

    return async(dispatch, getState) => {

        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const docRef = doc(FirebaseDb, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}