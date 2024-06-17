import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { logOutService } from "../utils/users-service";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header ({ setUser }) {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

    const handleLogOut = (e) => {
        e.preventDefault();
        logOutService();
        setUser(null);
        navigate("/")
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/home")}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/todo")}>
                <ListItemIcon>
                    <CreateIcon />
                </ListItemIcon>
                <ListItemText primary={"Todo"} />
                </ListItemButton>
            </ListItem>
            
        </List>
        <Divider />
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={handleLogOut}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
                </ListItemButton>
            </ListItem>
        </List>
        </Box>
    );

    return <Box>
            <Button onClick={toggleDrawer(true)}><MenuIcon sx={{ color: '#000' }} /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
}