import React, { useState, createContext, PropsWithChildren, useContext } from 'react';


const DrawerContext = createContext<DrawContextType | null>(null)


type DrawContextType = {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}



export const DrawerContextProvider = ({ children }: PropsWithChildren) => {

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    return (
        <DrawerContext.Provider value={{
            drawerOpen,
            setDrawerOpen
        }}>
            {children}
        </DrawerContext.Provider>
    );
}


export const useDrawerContext = () => {
    const ctx = useContext(DrawerContext);
    if (!ctx) throw new Error("This component must be wrapped by Drawer Context");
    return ctx
}
