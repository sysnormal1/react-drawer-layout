//src/components/LeftDrawer.tsx
import { ChevronLeft, SearchOutlined } from "@mui/icons-material";
import {
  Divider,
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  alpha,
  styled,
  useTheme,
  useMediaQuery,
  Box
} from "@mui/material";
import _ from "lodash";
import React, { ReactNode, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { DrawerItem, DrawerItemTypography } from './DrawerItem.js';
import { DrawerItemList } from "./DrawerItemList.js";


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const openedMixin = (theme: any, width?: number | string) => ({
  width,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme: any) => ({
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

const StyledDrawer : any = styled(MuiDrawer, { 
  shouldForwardProp: (prop: any) => prop !== 'open' && prop !== 'width'
})(
  (params: any) => ({
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
  }),
);

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

export interface LeftDrawerProps extends Omit<MuiDrawerProps, 'open'> {
  collapsed?: boolean;
  width?: number | string;
  items?: DrawerItem[];        // ← agora tipado, não ReactNode
  translater?: (key: string) => string;
  searchText?: string;
  setCollapsed?: (value: boolean) => void;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  typography?: DrawerItemTypography;
  resizable?: boolean;
  onWidthChange?: (width: number) => void;

}

const MIN_WIDTH = 200;
const MAX_WIDTH = 600;


const LeftDrawer = forwardRef<HTMLDivElement, LeftDrawerProps>(
  ({
    collapsed = false,
    width: initialWidth = 240,
    items = [],
    translater,
    searchText = 'search',
    setCollapsed,
    currentPath,
    onNavigate,
    typography,
    resizable = true,
    onWidthChange,
    ...drawerProps
  }, ref) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [searchQuery, setSearchQuery] = useState('');
    const [width, setWidth] = useState<number>(
      typeof initialWidth === 'number' ? initialWidth : 240
    );
    const contentRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

     // auto-ajuste via ResizeObserver
    useEffect(() => {
      if (!contentRef.current || collapsed) return;

      let rafId: number;
      let debounceId: ReturnType<typeof setTimeout>;

      const measure = () => {
        if (!contentRef.current) return;

        const clone = contentRef.current.cloneNode(true) as HTMLElement;
        clone.style.cssText = `
          position: fixed;
          visibility: hidden;
          width: max-content;
          max-width: ${MAX_WIDTH}px;
          pointer-events: none;
          top: -9999px;
          left: -9999px;
        `;

        clone.querySelectorAll('.MuiCollapse-root').forEach(el => {
          (el as HTMLElement).style.height = 'auto';
          (el as HTMLElement).style.overflow = 'visible';
        });
        clone.querySelectorAll('.MuiCollapse-hidden').forEach(el => {
          el.classList.remove('MuiCollapse-hidden');
        });

        document.body.appendChild(clone);
        const naturalWidth = clone.offsetWidth;
        document.body.removeChild(clone);

        const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, naturalWidth + 32));
        setWidth(newWidth);
        onWidthChange?.(newWidth);
      };

      const debouncedMeasure = () => {
        clearTimeout(debounceId);
        // aguarda a animação do Collapse terminar antes de medir
        debounceId = setTimeout(() => {
          rafId = requestAnimationFrame(measure);
        }, 300); // 300ms = duração padrão da animação do MUI Collapse
      };

      // mede na montagem sem debounce
      rafId = requestAnimationFrame(measure);

      const mutationObserver = new MutationObserver((mutations) => {
        const relevant = mutations.some(m =>
          m.type === 'attributes' &&
          m.attributeName === 'class' &&
          (m.target as HTMLElement).classList.contains('MuiCollapse-root')
        );
        if (relevant) debouncedMeasure();
      });

      mutationObserver.observe(contentRef.current, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class'],
      });

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(debounceId);
        mutationObserver.disconnect();
      };

    }, [collapsed, items]);

     // drag para redimensionar
    const handleDragStart = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      const startX = e.clientX;
      const startWidth = width;

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidth + e.clientX - startX));
        setWidth(newWidth);
        onWidthChange?.(newWidth);  // ← notifica o RootLayout
      };

      const onMouseUp = () => {
        isDragging.current = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }, [width]);

    const text = _.capitalize(
      translater ? translater(searchText) : searchText
    );

    const contentHeader = (
      <DrawerHeader>
        <Search>
          <SearchIconWrapper>
            <SearchOutlined />
          </SearchIconWrapper>
          <SearchInputBase
            placeholder={text}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            inputProps={{ 'aria-label': text }}
          />
        </Search>
        <IconButton onClick={() => setCollapsed?.(true)}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
    );


     const contentList = (
      <Box ref={contentRef} sx={{ overflowX: 'hidden' }}>
        <DrawerItemList
          items={items}
          collapsed={collapsed}
          currentPath={currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')}
          onNavigate={onNavigate ?? (path => { window.location.href = path; })}
          searchQuery={searchQuery}
          typography={typography}
        />
      </Box>
    );

    // alça de resize na borda direita
    const resizeHandle = resizable && !collapsed && !isSmallScreen ? (
      <Box
        onMouseDown={handleDragStart}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 4,
          cursor: 'col-resize',
          zIndex: 1,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            opacity: 0.3,
          },
        }}
      />
    ) : null;

    const drawerContent = (
      <>
        {contentHeader}
        <Divider />
        {contentList}
        {resizeHandle}
      </>
    );

    return isSmallScreen ? (
      <MuiDrawer
        ref={ref}
        variant="temporary"
        open={!collapsed}
        {...drawerProps}
      >
        {drawerContent}
      </MuiDrawer>
    ) : (
      <StyledDrawer
        ref={ref}
        variant="permanent"
        open={!collapsed}
        width={width}
        {...drawerProps}
      >
        {drawerContent}
      </StyledDrawer>
    );  
  }
);

LeftDrawer.displayName = "LeftDrawer";

export default LeftDrawer;
