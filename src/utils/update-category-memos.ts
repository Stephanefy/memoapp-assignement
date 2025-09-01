import { getMemosOfCategory } from '../services/api/memo-service';
import { Category, Memo } from '../context/memo-context';

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
