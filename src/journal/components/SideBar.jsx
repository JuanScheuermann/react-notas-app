import { useSelector } from "react-redux";
import {
    Drawer,
    Box,
    Toolbar,
    Typography,
    Divider,
    List,
} from "@mui/material";
import { SidebarItem } from "./SidebarItem";


export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector((status) => status.auth);
    const { notes } = useSelector((status) => status.journal);



    return (
        <Box component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant="h6" component='div' noWrap>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map(note => (
                            <SidebarItem key={note.id} {...note} />
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}
