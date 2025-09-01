import { getMemosOfCategory } from '../services/api/memo-service';
import { Category, Memo } from '../context/memo-context';

/**
 * When a category item is clicked, 
 * this function will call the API server to fetch memos of the clicked category item,
 * create a new version of the selected category and inject the fetched memos,
 * then recreate a new category list with the new version of the selected category item
 * for at last being used as the new category list to update the state
 */
export async function updateCategoryMemos(
    accessToken: string,
    categories: Category[],
    category: Category
) {
    const data = await getMemosOfCategory(accessToken!, category.id);

    const memos = data ? (Array.isArray(data) ? data : [data]) : [];

    const newcategoryWithMemos = {
        ...category,
        memos: memos as Memo[],
    };

    const newCategories = categories?.map((c) =>
        c.id === category.id ? newcategoryWithMemos : c
    );

    return newCategories;
}
