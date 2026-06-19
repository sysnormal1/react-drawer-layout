// src/hooks/useTopBar.ts
import { useEffect } from 'react';
import { useRootLayoutContext } from '../components/RootLayoutContext.js';
export function useTopBar() {
    const { setTopBarTitle, setTopBarChildren } = useRootLayoutContext();
    // limpa automaticamente ao desmontar a tela que usou o hook
    useEffect(() => {
        return () => {
            setTopBarTitle(null);
            setTopBarChildren(null);
        };
    }, [setTopBarTitle, setTopBarChildren]);
    return { setTopBarTitle, setTopBarChildren };
}
