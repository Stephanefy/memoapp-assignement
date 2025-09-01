import { Category, Memo, MemoDetails } from '../context/memo-context';

type MemoCrudType = 'ADD' | 'UPDATE' | 'DELETE';

/**
* Unlike the updateCategoryMemos function, 
* this one is called for correctly updating the category list with new memo list
* after CRUD actions like memo addition, memo edit and memo deletion
*/
export function updateMemoState(
    categories: Category[],
    categoryId: number,
    type: MemoCrudType,
    newMemo?: MemoDetails,
    memoId?: number
) {
    const currentCategory = categories?.find(
        (category) => category.id === categoryId
    );

    switch (type) {
        case 'ADD': {
            if (!currentCategory || !newMemo) return categories;
            const newMemos: Memo[] = [
                ...(currentCategory.memos ?? []),
                newMemo as unknown as Memo,
            ];
            const updatedCategories = categories.map((category) =>
                category.id === currentCategory.id
                    ? { ...category, memos: newMemos }
                    : category
            );
            return updatedCategories;
        }
        case 'UPDATE': {
            if (!currentCategory || !newMemo) return categories;
            const editNewMemos: Memo[] = (currentCategory.memos ?? []).map((memo) =>
                memo.id === newMemo.id ? (newMemo as unknown as Memo) : memo
            );
            const updatedCategories = categories.map((category) =>
                category.id === categoryId
                    ? { ...category, memos: editNewMemos }
                    : category
            );
            return updatedCategories;
        }
        case 'DELETE': {
            if (!currentCategory || memoId == null) return categories;
            const afterDeletionNewMemos: Memo[] = (
                currentCategory.memos ?? []
            ).filter((m) => m.id !== memoId);
            const updatedCategories = categories.map((category) =>
                category.id === categoryId
                    ? { ...category, memos: afterDeletionNewMemos }
                    : category
            );
            return updatedCategories;
        }
        default:
            return categories;
    }
}
