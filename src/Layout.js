import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Path from './Comman/Paths';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LoginIcon from '@mui/icons-material/Login';


const drawerWidth = 240;


export default function Layout(props) {
    const { Auth, component } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const location = useLocation()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <Link to={Path.dashboard} className='mb-1 d-block'>
                    <ListItem disablePadding>
                        <ListItemButton selected={location.pathname === Path.dashboard}>
                            <ListItemIcon>
                                <SpaceDashboardRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"DashBoard"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={Path.ProductScreen} className='mb-1 d-block'>
                    <ListItem disablePadding>
                        <ListItemButton selected={location.pathname === Path.ProductScreen}>
                            <ListItemIcon>
                                <ProductionQuantityLimitsRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"ProductScreen"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={Path.UserScreen} className='mb-1 d-block'>
                    <ListItem disablePadding>
                        <ListItemButton selected={location.pathname === Path.UserScreen}>
                            <ListItemIcon>
                                <PersonRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"UserScreen"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={Path.LoginScreen} className='mb-1 d-block'>
                    <ListItem disablePadding>
                        <ListItemButton selected={location.pathname === Path.LoginScreen}>
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary={"LoginScreen"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>

        </div>
    );

    const container = window !== undefined ? () => window.document.body : undefined;


    if (!Auth) {
        return <Navigate to={Path.LoginScreen} />
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: "100%" },
                    ml: { sm: `${drawerWidth}px` },
                    zIndex: "9999",
                    background: "black"
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Admin Nike
                    </Typography>

                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                {
                    component
                }
            </Box>
        </Box>
    );
}
