import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components/ImageGallery'

import { useForm } from '../../hooks'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal/thunks'

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector((state) => state.journal);

    const { title, body, date, onInputChange, formState } = useForm(note);

    const inputRef = useRef()

    const fecha = useMemo(() => {
        return new Date().toUTCString(date)
    }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota Actualizada', messageSaved, 'success')
        }
    }, [messageSaved])


    const onSaveNote = () => {
        dispatch(startSavingNote())
    }

    const onFileInputChange = ({ target }) => {

        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files));
    }
    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid container direction='row' justifyContent='space-between'
            alignItems='center' sx={{ mb: 1 }}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='ligth'>{fecha}</Typography>
            </Grid>
            <Grid item>

                <input
                    type="file"
                    multiple
                    ref={inputRef}
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                />

                <IconButton
                    color='primary'
                    //hacemos referncia al input de tipo file y a su evento onclick
                    onClick={() => inputRef.current.click()}
                    disabled={isSaving}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    color='primary'
                    sx={{ padding: 2 }}
                    disabled={isSaving}
                    onClick={onSaveNote}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>


            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder="ingrese un titulo"
                    label='Titulo'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    onChange={onInputChange}
                    value={title}
                />

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder="¿Que paso el dia de hoy?"
                    minRows={5}
                    name='body'
                    onChange={onInputChange}
                    value={body}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                </Button>
            </Grid>

            <ImageGallery images={note.imagesUrls} />
        </Grid>
    )
}
