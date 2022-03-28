import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

// import CalendarFilter from './calendarFilter'
import { Avatar, Stack } from "@mui/material";
// import { deepOrange } from "@mui/material/colors";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden"
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    }
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme)
    })
}));

export default function CalendarNav(props) {

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer variant="permanent" open={props.drawer}>
                <DrawerHeader>
                    <IconButton onClick={props.handleDrawer}>
                        {props.drawer ? (
                            <ChevronLeftIcon />
                        ) : (
                            <KeyboardDoubleArrowRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <div style={{ marginTop: 10, marginBottom: 10, paddingLeft: 20 }}>
                    <Stack direction="row" spacing={2}>
                        <Avatar sx={{ bgcolor: '#9F05FF', borderRadius: '5px', width: 30, height: 30, fontSize: 15 }} variant="square">
                            TH
                        </Avatar>
                        <p>Nguyễn Thanh Hoài</p>
                    </Stack>
                </div>
                <Divider />
                <List>
                    {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                        <ListItemButton
                            key={text}
                            sx={{
                                minHeight: 48,
                                justifyContent: props.drawer ? "initial" : "center",
                                px: 2.5
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: props.drawer ? 3 : "auto",
                                    justifyContent: "center"
                                }}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: props.drawer ? 1 : 0 }} />
                        </ListItemButton>
                    ))}
                </List>
                <Divider />
                <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItemButton
                            key={text}
                            sx={{
                                minHeight: 48,
                                justifyContent: props.drawer ? "initial" : "center",
                                px: 2.5
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: props.drawer ? 3 : "auto",
                                    justifyContent: "center"
                                }}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: props.drawer ? 1 : 0 }} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ ml: 50 }}>
                {/* <CalendarFilter /> */}
            </Box>
        </Box>
    );
}
