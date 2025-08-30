import { useState, useEffect } from "react"
import { Category, useMemoContext } from "../../../context/memo-context"
import { useAuthContext } from "../../../context/auth-context";
import { updateCategoryMemos } from "../../../utils/update-category-memos";

import MemoItem from "../memo/memo-item";

interface Props {
    category: Category
}



export default function CategoryItem({ category }: Props) {

    const { accessToken } = useAuthContext()
    const { categories, setCategories, currentOpenedCategory, setCurrentOpenedCategory, setCurrentSelectedMemo } = useMemoContext()

    const [expanded, setExpanded] = useState<boolean>(false);
    const [minimized, setMinimized] = useState<boolean>(true);


    useEffect(() => {
        if (currentOpenedCategory !== category.id) {
            setMinimized(true)
            setExpanded(false)
        }
    }, [currentOpenedCategory, category.id])


    const toggleCategoryItem = async () => {

        setCurrentOpenedCategory(category.id);
        setCurrentSelectedMemo(null);

        if (expanded) {
            setMinimized(true)
            setExpanded(false)
            setCurrentOpenedCategory(undefined);

        }
        if (minimized) {
            setExpanded(true)
            setMinimized(false)
        }

        const newCategories = await updateCategoryMemos(accessToken!, categories!, category)


        setCategories(newCategories!)

    }

    return (
        <li key={category.id} id={`category-${category.id}`} className="text-grey-200">
            <div className="relative flex flex-col text-left">
                <button
                    id={`category-${category.id}-title`}
                    onClick={toggleCategoryItem}
                    className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {category.name}
                    <svg
                        className={`w-5 h-5 ml-2 -mr-1 transition-transform duration-200 ${expanded ? 'rotate-180' : ''
                            }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                {expanded && category.memos && category.memos.length > 0 && (
                    <div className="cursor-pointer w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 ring-black focus:outline-none z-10">
                        {
                            category.memos.map((memo) => (
                                <MemoItem key={memo.id} memo={memo} />
                            ))
                        }
                    </div>
                )}
            </div>
        </li>
    )
}