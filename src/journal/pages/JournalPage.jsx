import { AddOutlined } from '@mui/icons-material'
import { backdropClasses, IconButton, Typography } from '@mui/material'
import { positions } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {

    const { isSaving, active } = useSelector((state) => state.journal);
    const dispatch = useDispatch();

    const onClickNewNote = () => {
        dispatch(startNewNote());
        console.log(isSaving);
    }

    return (
        <JournalLayout>

            {/*  <Typography>Journal Page</Typography> */}

            {
                (!!active) //por defecto active es null por eso la doble negacion
                    ? <NoteView />
                    : <NothingSelectedView />
            }

            <IconButton
                onClick={onClickNewNote}
                disabled={isSaving}
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout>
    )
}
