import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SidebarItem = ({ title, body, date, id, imagesUrls = [] }) => {

    const dispatch = useDispatch();

    const selectNote = () => {
        dispatch(setActiveNote({ title, body, date, id, imagesUrls }))
    }

    const shortTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title

    }, [title])
    return (
        <ListItem disablePadding >
            <ListItemButton onClick={selectNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={shortTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    );
};
