import { useState, useEffect, ChangeEvent } from "react";
import { useMemoContext } from "../../../context/memo-context";
import { useAuthContext } from "../../../context/auth-context";
import { editMemoDetails, deleteMemo } from "../../../services/api/memo";
import { updateCategoryMemos } from "../../../utils/update-category-memos";






export default function MemoEditForm() {

    const { accessToken } = useAuthContext();
    const { categories, setCategories, currentOpenedCategory, setCurrentSelectedMemo, currentSelectedMemo } = useMemoContext();

    const [title, setTitle] = useState<string | undefined>(currentSelectedMemo?.title || "")
    const [content, setContent] = useState<string | undefined>(currentSelectedMemo?.content || "")






    useEffect(() => {


        if (currentSelectedMemo) {
            setTitle(currentSelectedMemo.title)
            setContent(currentSelectedMemo.content || "")
        }





    }, [currentSelectedMemo])

    const onChangeMemoDetails = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "title") {
            setTitle(value);
        } else if (name === "content") {
            setContent(value);
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const title = formData.get("title");
        const content = formData.get("content");

        if (currentOpenedCategory === undefined || !currentSelectedMemo) {
            return;
        }

        const payload = {
            category_id: currentOpenedCategory,
            title: (title ?? "").toString(),
            content: (content ?? "").toString()
        }

        try {
            const response = await editMemoDetails(accessToken!, currentSelectedMemo.id, payload);

            if (response && 'ok' in response && response.ok) {

                const currentCategory = categories?.find((category) => category.id === currentOpenedCategory)

                const newCategories = await updateCategoryMemos(accessToken!, categories!, currentCategory!)

                setCategories(newCategories)
            } else {
                throw new Error("There was an issue with the editing of the memo")
            }

        } catch (err) {
            console.log(err)
        }
    }

    const onDeleteMemo = async (id: number) => {

        try {

            const response = await deleteMemo(accessToken!, id)


            if (response && 'ok' in response && response.ok) {
                setCurrentSelectedMemo(null)
                setTitle("")
                setContent("")

                const currentCategory = categories?.find((category) => category.id === currentOpenedCategory)
                const newMemos = currentCategory!.memos!.filter((m) => m.id !== id)


                const updatedCategories = categories!.map(category =>
                    category.id === currentOpenedCategory
                        ? { ...category, memos: newMemos }
                        : category
                )
                setCategories(updatedCategories)
            } else {
                throw new Error("There was an issue with the deletion of the memo")
            }

        } catch (error) {
            console.log(error)
        }



    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Title</span>
                </div>
                <input id="memo-title" type="text" onChange={onChangeMemoDetails} name="title" placeholder="Type here" value={title} className="input input-bordered w-full bg-white" />

            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Content</span>
                </div>
                <textarea id="memo-content" onChange={onChangeMemoDetails} name="content" placeholder="Type here" value={content} className="input input-bordered w-full bg-white h-32" />
            </label>
            <div className="mt-8 flex justify-between space-x-6">
                <button type="submit" id="save-memo" disabled={!currentSelectedMemo} className="btn bg-green-500 text-white border-none">
                    SAVE
                </button>
                <button id="delete-memo" type="button" onClick={() => onDeleteMemo(currentSelectedMemo!.id)} disabled={!currentSelectedMemo} className="btn bg-red-500 text-white border-none">
                    DELETE
                </button>
            </div>
        </form>
    )
}