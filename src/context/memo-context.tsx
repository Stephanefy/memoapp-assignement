import React, { createContext, useState, PropsWithChildren, useContext } from "react";

export type Category = {
    id: number,
    name: string
    memos?: Memo[]
}

export type Memo = {
    id: number,
    title: string,
    content: string
}


export type MemoDetails = {
    category_id: number
    content: string
    id: number
    title: string
}


type MemoContextType = {
    currentOpenedCategory: number | undefined
    currentSelectedMemo: MemoDetails | null
    categories: Category[] | null
    memos: Memo[] | null
    setCurrentOpenedCategory: React.Dispatch<React.SetStateAction<number | undefined>>
    setCurrentSelectedMemo: React.Dispatch<React.SetStateAction<MemoDetails | null>>
    setCategories: React.Dispatch<React.SetStateAction<Category[] | null>>
    setMemos: React.Dispatch<React.SetStateAction<Memo[] | null>>

}

export const MemoContext = createContext<MemoContextType | undefined>(undefined);


export const MemoContextProvider = ({ children }: PropsWithChildren) => {

    const [currentOpenedCategory, setCurrentOpenedCategory] = useState<number | undefined>(undefined)
    const [currentSelectedMemo, setCurrentSelectedMemo] = useState<MemoDetails | null>(null)
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [memos, setMemos] = useState<Memo[] | null>(null);

    return (
        <MemoContext.Provider value={{ setCurrentSelectedMemo, currentSelectedMemo, currentOpenedCategory, setCurrentOpenedCategory, categories, memos, setCategories, setMemos }}>
            {children}
        </MemoContext.Provider>
    )
}


export const useMemoContext = () => {
    const context = useContext(MemoContext);
    if (!context) throw new Error("useMemoContext must be inside a provider")
    return context
}