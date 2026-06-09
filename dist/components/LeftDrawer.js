import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//src/components/LeftDrawer.tsx
import { ChevronLeft, SearchOutlined } from "@mui/icons-material";
import { Divider, Drawer as MuiDrawer, IconButton, InputBase, alpha, styled, useTheme, useMediaQuery } from "@mui/material";
import _ from "lodash";
import { forwardRef, useState } from "react";
import { DrawerItemList } from "./DrawerItemList.js";
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
}));
const openedMixin = (theme, width) => ({
    width,
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
const StyledDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'width'
})((params) => ({
    width: params.width,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(params.theme),
                '& .MuiDrawer-paper': openedMixin(params.theme, params.width),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(params.theme),
                '& .MuiDrawer-paper': closedMixin(params.theme),
            },
        },
    ],
}));
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto"
    }
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));
const SearchInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    }
}));
const LeftDrawer = forwardRef(({ collapsed = false, width = 240, items = [], translater, searchText = 'search', setCollapsed, currentPath, onNavigate, ...drawerProps }, ref) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [searchQuery, setSearchQuery] = useState('');
    const text = _.capitalize(translater ? translater(searchText) : searchText);
    const contentHeader = (_jsxs(DrawerHeader, { children: [_jsxs(Search, { children: [_jsx(SearchIconWrapper, { children: _jsx(SearchOutlined, {}) }), _jsx(SearchInputBase, { placeholder: text, value: searchQuery, onChange: e => setSearchQuery(e.target.value), inputProps: { 'aria-label': text } })] }), _jsx(IconButton, { onClick: () => setCollapsed?.(true), children: _jsx(ChevronLeft, {}) })] }));
    const contentList = (_jsx(DrawerItemList, { items: items, collapsed: collapsed, currentPath: currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/'), onNavigate: onNavigate ?? (path => { window.location.href = path; }), searchQuery: searchQuery }));
    return isSmallScreen ? (_jsxs(MuiDrawer, { ref: ref, variant: "temporary", open: !collapsed, ...drawerProps, children: [contentHeader, _jsx(Divider, {}), contentList] })) : (_jsxs(StyledDrawer, { ref: ref, variant: "permanent", open: !collapsed, width: width, ...drawerProps, children: [contentHeader, _jsx(Divider, {}), contentList] }));
});
LeftDrawer.displayName = "LeftDrawer";
export default LeftDrawer;
