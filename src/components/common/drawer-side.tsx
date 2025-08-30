import { useMemoContext } from "../../context/memo-context"
import CategoryItem from "../features/category/category-item";
import { addNewMemo } from "../../services/api/memo";
import { useAuthContext } from "../../context/auth-context";
import { updateCategoryMemos } from "../../utils/update-category-memos";

export default function DrawerSide() {

    const { categories, setCategories, currentOpenedCategory } = useMemoContext();
    const { accessToken } = useAuthContext();


    const onAddANewMemo = async () => {

        if (!currentOpenedCategory) {
            console.error("Missing required category id");
            return;
        }

        const payload = {
            category_id: currentOpenedCategory!,
            title: "New Memo",
            content: ""
        }
        await addNewMemo(accessToken!, payload)

        const currentCategory = categories?.find((category) => category.id === currentOpenedCategory)

        const newCategories = await updateCategoryMemos(accessToken!, categories!, currentCategory!)

        setCategories(newCategories)
    }


    return (
        <div className="drawer-side">
            <ul className="relative menu bg-white min-h-[80%] w-[40%] md:w-72 p-4 mt-32 border border-gray-300 rounded-md z-50">
                {
                    categories && categories.length ? categories?.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    )) :
                        (
                            <p className="text-2xl text-slate-600">You have to login with a valid access token to see your memos</p>
                        )
                }
                <div className="absolute bottom-0 left-0 w-full bg-white p-4 flex justify-end z-10 border-t">
                    <button
                        id="new-memo"
                        onClick={onAddANewMemo}
                        disabled={currentOpenedCategory === undefined}
                        className="btn bg-green-400 border-none text-white"
                    >
                        NEW
                    </button>
                </div>
            </ul>
        </div>
    )
}