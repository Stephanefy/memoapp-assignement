import { useState } from 'react';
import { MemoDetails, useMemoContext } from '../../context/memo-context';
import CategoryItem from '../features/category/category-item';
import { addNewMemo } from '../../services/api/memo-service';
import { useAuthContext } from '../../context/auth-context';
import { updateMemoState } from '../../utils/update-memo-state';

export default function DrawerSide() {
  const {
    categories,
    setCategories,
    currentOpenedCategory,
    setCurrentSelectedMemo,
  } = useMemoContext();
  const { accessToken } = useAuthContext();
  const [addMemoError, setAddMemoError] = useState<string>('');

  const onAddANewMemo = async () => {
    if (!currentOpenedCategory) {
      return;
    }

    const payload = {
      category_id: currentOpenedCategory!,
      title: 'New Memo',
      content: '',
    };

    try {
      const createdMemo = (await addNewMemo(
        accessToken!,
        payload
      )) as MemoDetails;

      const updatedCategories = updateMemoState(
        categories!,
        currentOpenedCategory,
        'ADD',
        createdMemo
      );
      setCategories(updatedCategories!);
      setCurrentSelectedMemo(createdMemo);
    } catch (err) {
      setAddMemoError('Failed to create a new memo');

      setTimeout(() => {
        setAddMemoError('');
      }, 3000);
    }
  };

  return (
    <div className="drawer-side">
      <ul className="relative menu bg-white min-h-[80%] w-[50%] md:w-72 p-4 mt-32 border border-gray-300 z-50">
        {categories && categories.length ? (
          categories?.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))
        ) : (
          <p className="text-base text-slate-600">
            You have to login with a valid access token to see your memos
          </p>
        )}

        <div className="absolute bottom-0 left-0 w-full bg-white p-4 flex justify-end items-center z-10 border-t space-x-4">
          {addMemoError && (
            <div className="">
              <div role="alert" className="text-red-500 text-left">
                <span>{addMemoError}</span>
              </div>
            </div>
          )}
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
  );
}
