# @sysnormal/react-drawer-layout

[![npm](https://img.shields.io/npm/v/@sysnormal/react-drawer-layout)](https://www.npmjs.com/package/@sysnormal/react-drawer-layout)
[![GitHub tag](https://img.shields.io/github/v/tag/sysnormal1/react-drawer-layout)](https://github.com/sysnormal1/react-drawer-layout)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

![React](https://img.shields.io/badge/React-18+-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6)
![MUI](https://img.shields.io/badge/MUI-Material%20UI-007FFF)

![AI Assisted](https://img.shields.io/badge/AI-Assisted-blue)

**@sysnormal/react-drawer-layout** is a React layout library that provides a complete application shell — top app bar, collapsible navigation drawer, dark/light theme management, and dynamic top bar content — with minimal setup.

Designed to work standalone or alongside [@sysnormal/react-sso](https://github.com/sysnormal1/react-sso).

---

## 🚀 Main Features

- 🗂️ `RootLayout` — full app shell with top bar and left navigation drawer
- 🌗 Auto dark/light theme — detects system preference, persists user toggle in `localStorage`
- 📐 Auto-resizing drawer — expands automatically as nested menu items are opened, with manual drag support
- 🧭 Typed `DrawerItem` — structured menu items with icon, label, path, and nested children
- 🎨 Configurable typography — font size, weight, family per menu item
- 🪝 `useRootLayoutContext` — access theme mode, drawer state, and top bar setters from anywhere inside the layout
- 🏷️ `useTopBar` — dynamically set the top bar title and extra content from any screen
- 📱 Responsive — temporary drawer on small screens, permanent mini-drawer on desktop
- 🔌 Router-agnostic — `onNavigate` callback, compatible with React Router, TanStack Router, or any routing solution

---

## 📦 Installation

```bash
npm install @sysnormal/react-drawer-layout
```

Peer dependencies (must be installed in your project):

```bash
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled
```

---

## 🚀 Quick Start

```tsx
import { RootLayout } from '@sysnormal/react-drawer-layout';
import { useNavigate } from 'react-router-dom';

const items = [
  { id: 1, label: 'Home', path: '/', icon: <HomeIcon /> },
  {
    id: 2, label: 'Settings', icon: <SettingsIcon />,
    children: [
      { id: 3, label: 'Profile', path: '/settings/profile', icon: <PersonIcon /> },
    ]
  },
];

export default function App() {
  const navigate = useNavigate();

  return (
    <RootLayout
      drawerItems={items}
      onNavigate={navigate}
      topBarProps={{ defaultTitle: 'My App' }}
    >
      <Outlet />
    </RootLayout>
  );
}
```

---

## 🔌 RootLayout

The main component. Renders the full application shell.

```tsx
import { RootLayout } from '@sysnormal/react-drawer-layout';

<RootLayout
  drawerItems={items}
  onNavigate={navigate}
  topBarProps={{ defaultTitle: 'My App', actions: <UserMenu /> }}
  drawerWidth={260}
  drawer={true}
  topBar={true}
>
  <MyPageContent />
</RootLayout>
```

### `RootLayout` props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Page content rendered in the main area |
| `theme` | `Theme` | auto-detected | External MUI theme. When provided, the theme toggle button is hidden |
| `topBar` | `boolean` | `true` | Show or hide the top app bar |
| `topBarProps` | `TopAppBarProps` | — | Props forwarded to the top bar |
| `drawer` | `boolean` | `true` | Show or hide the navigation drawer |
| `drawerWidth` | `number` | `240` | Initial drawer width in pixels |
| `drawerItems` | `DrawerItem[]` | `[]` | Navigation menu items |
| `drawerTypography` | `DrawerItemTypography` | — | Typography options for menu item labels |
| `currentPath` | `string` | `window.location.pathname` | Highlights the active menu item |
| `onNavigate` | `(path: string) => void` | `window.location.href` | Called when a menu item is clicked |
| `translater` | `(text: string) => string` | — | i18n function for drawer labels (e.g. search placeholder) |

---

## 🧭 DrawerItem

Typed structure for navigation menu items:

```ts
import { DrawerItem } from '@sysnormal/react-drawer-layout';

const items: DrawerItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    path: '/',
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    label: 'Registers',
    icon: <ListIcon />,
    children: [
      { id: 3, label: 'Users', path: '/users', icon: <PeopleIcon /> },
      { id: 4, label: 'Products', path: '/products', icon: <InventoryIcon /> },
    ],
  },
];
```

### `DrawerItem` fields

| Field | Type | Description |
|---|---|---|
| `id` | `string \| number` | Unique identifier |
| `label` | `string` | Display label |
| `path` | `string` | Navigation path (optional for group items) |
| `icon` | `ReactNode` | Icon rendered before the label |
| `children` | `DrawerItem[]` | Nested items — renders an expandable submenu |
| `onClick` | `() => void` | Custom click handler (used when no `path` is set) |

Items with `children` and no `path` act as collapsible group headers. Items with `path` navigate when clicked.

---

## 🎨 Drawer Typography

Customize the font size, weight, and family of menu item labels:

```tsx
<RootLayout
  drawerTypography={{
    fontSize: '0.8rem',
    fontWeight: 400,
    fontFamily: 'Roboto, sans-serif',
    letterSpacing: '0.02em',
  }}
>
```

### `DrawerItemTypography` fields

| Field | Type | Default | Description |
|---|---|---|---|
| `fontSize` | `string \| number` | `0.825rem` | Label font size |
| `fontWeight` | `string \| number` | `500` | Label font weight |
| `fontFamily` | `string` | inherited | Label font family |
| `letterSpacing` | `string \| number` | `0.02em` | Label letter spacing |

---

## 📐 Auto-resizing Drawer

The drawer automatically measures menu item widths when nested items are expanded and adjusts its width to fit the content — no item labels are truncated.

The user can also manually resize the drawer by dragging its right edge.

Both behaviors are enabled by default and can be disabled:

```tsx
<RootLayout drawerWidth={300} /> {/* fixed initial width */}
```

Drag the right border of the drawer to resize manually. The width is constrained between `200px` and `600px`.

---

## 🌗 Theme Management

When no external `theme` is provided, `RootLayout` automatically:

- Detects the system preference (`prefers-color-scheme`)
- Persists the user's manual toggle in `localStorage` under the key `drawerLayoutTheme`
- Reacts to system theme changes in real time (while no manual choice has been made)

The toggle button in the top bar switches between light and dark mode.

To use your own theme and disable the built-in toggle:

```tsx
import { createTheme } from '@mui/material';

const myTheme = createTheme({ palette: { mode: 'dark', primary: { main: '#1976d2' } } });

<RootLayout theme={myTheme}>
  <MyApp />
</RootLayout>
```

When `theme` is passed externally, the toggle button is hidden and the theme is fully controlled by the caller.

---

## 🪝 `useRootLayoutContext`

Access the internal layout state from any component inside `RootLayout`:

```tsx
import { useRootLayoutContext } from '@sysnormal/react-drawer-layout';

function MyComponent() {
  const {
    mode,               // 'light' | 'dark'
    toggleMode,         // () => void
    drawerCollapsed,    // boolean
    setDrawerCollapsed, // (value: boolean) => void
    drawerWidth,        // number (current, including resize)
    setDrawerWidth,     // (value: number) => void
    topBarTitle,        // ReactNode
    setTopBarTitle,     // (value: ReactNode) => void
    topBarChildren,     // ReactNode
    setTopBarChildren,  // (value: ReactNode) => void
    theme,              // Theme (active MUI theme)
  } = useRootLayoutContext();
}
```

> Must be used inside a component that is a descendant of `RootLayout`.

---

## 🏷️ `useTopBar`

Dynamically set the top bar title and extra content (buttons, icons, etc.) from any screen. Content is automatically cleared when the component unmounts.

```tsx
import { useTopBar } from '@sysnormal/react-drawer-layout';
import { Button } from '@mui/material';

function TasksScreen() {
  const { setTopBarTitle, setTopBarChildren } = useTopBar();

  useEffect(() => {
    setTopBarTitle('Task Management');
    setTopBarChildren(
      <Button color="inherit" onClick={handleNew}>
        New Task
      </Button>
    );
  }, []);

  return <div>...</div>;
}
```

Only set what you need — `setTopBarTitle` and `setTopBarChildren` are independent:

```tsx
// title only
const { setTopBarTitle } = useTopBar();
useEffect(() => { setTopBarTitle('Dashboard'); }, []);
```

---

## 🔗 Integration with `@sysnormal/react-sso`

The two libraries are fully independent — `react-drawer-layout` knows nothing about authentication, and `react-sso` knows nothing about the drawer. Integration is done in the app:

```tsx
import { AuthProvider, UserMenu, useAuth, useGetAllowedResources, flatToNestedArray } from '@sysnormal/react-sso';
import { RootLayout, DrawerItem } from '@sysnormal/react-drawer-layout';
import parse from 'html-react-parser';

function AppContent() {
  const { token } = useAuth();
  const getAllowedResources = useGetAllowedResources();
  const navigate = useNavigate();
  const [drawerItems, setDrawerItems] = useState<DrawerItem[]>([]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      const result = await getAllowedResources({ systemId: 1 });
      if (result.success && result.data) {
        const nested = flatToNestedArray(result.data, 'resourceId', 'resourceParentId');
        setDrawerItems(
          nested
            .filter(r => r.resourceShowInMenu === 1)
            .map(r => ({
              id: r.resourceId,
              label: r.resourceName,
              path: r.resourcePath ?? undefined,
              icon: r.resourceIcon ? parse(r.resourceIcon) : undefined,
              children: r.children?.map(/* recursive */),
            }))
        );
      }
    })();
  }, [token]);

  return (
    <RootLayout
      drawerItems={drawerItems}
      onNavigate={navigate}
      topBarProps={{ actions: <UserMenu logoutLabel="Sign out" /> }}
    >
      <Outlet />
    </RootLayout>
  );
}

export default function App() {
  return (
    <AuthProvider appTitle="My System">
      <AppContent />
    </AuthProvider>
  );
}
```

---

## 📱 Responsive Behavior

| Screen | Drawer behavior |
|---|---|
| Desktop (`sm` and above) | Permanent mini-drawer (icons only when collapsed) |
| Mobile (below `sm`) | Temporary overlay drawer, closes after navigation |

---

## 🧰 Technologies Used

- **React 18+**
- **TypeScript 5+**
- **MUI (Material UI) 6+**
- **Lodash**

---

## 🧬 Clone the repository

```bash
git clone https://github.com/sysnormal1/react-drawer-layout.git
cd react-drawer-layout
npm install
```

## 🔧 Build

```bash
npm run build
```

---

## ⚖️ License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Alencar Velozo**
GitHub: [@aalencarvz1](https://github.com/aalencarvz1)

---

## 🏢 Organization

**Sysnormal**
GitHub: [@sysnormal1](https://github.com/sysnormal1)

---

## Acknowledgements

Parts of this project were developed with the assistance of AI-based tools for code generation, review and documentation.
