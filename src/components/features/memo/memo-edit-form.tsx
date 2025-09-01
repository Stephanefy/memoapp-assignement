import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useMemoContext } from '../../../context/memo-context';
import { useAuthContext } from '../../../context/auth-context';
import {
  editMemoDetails,
  deleteMemo,
} from '../../../services/api/memo-service';
import { showError } from '../../../utils/error';
import { updateMemoState } from '../../../utils/update-memo-state';

type FormData = {
  title: string | undefined;
  content: string | undefined;
};

export default function MemoEditForm() {
  const { accessToken } = useAuthContext();
  const {
    categories,
    setCategories,
    currentOpenedCategory,
    setCurrentSelectedMemo,
    currentSelectedMemo,
  } = useMemoContext();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
  });
  const [updateMemoError, setUpdateMemoError] = useState<string>('');

  const dismissTimerRef = useRef<number | null>(null);
  const notifyError = showError(setUpdateMemoError, dismissTimerRef);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (dismissTimerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearTimeout(dismissTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (currentSelectedMemo) {
      setFormData({
        title: currentSelectedMemo.title || '',
        content: currentSelectedMemo.content || '',
      });
    } else {
      setFormData({
        title: '',
        content: '',
      });
    }
  }, [currentSelectedMemo]);

  const onChangeMemoDetails = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = formData.get('title');
    const content = formData.get('content');

    if (!title || !content) {
      notifyError(new Error('The title and content fields are required'));
      return;
    }

    if (currentOpenedCategory === undefined || !currentSelectedMemo) {
      return;
    }

    const payload = {
      category_id: currentOpenedCategory,
      title: (title ?? '').toString(),
      content: (content ?? '').toString(),
    };

    try {
      const updatedMemo = await editMemoDetails(
        accessToken!,
        currentSelectedMemo.id,
        payload
      );

      if (updatedMemo) {
        const updatedCategories = updateMemoState(
          categories!,
          currentOpenedCategory,
          'UPDATE',
          updatedMemo
        );

        setCategories(updatedCategories!);
      } else {
        throw new Error('There was an issue with the editing of the memo');
      }
    } catch (error) {
      notifyError(error);
    }
  };

  const onDeleteMemo = async (id: number) => {
    try {
      const response = await deleteMemo(accessToken!, id);

      if (response && 'ok' in response && response.ok) {
        setCurrentSelectedMemo(null);
        setFormData({
          title: '',
          content: '',
        });

        const updatedCategories = updateMemoState(
          categories!,
          currentOpenedCategory!,
          'DELETE',
          undefined,
          id
        );

        setCategories(updatedCategories!);
      } else {
        throw new Error('There was an issue with the deletion of the memo');
      }
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <form onSubmit={onUpdate} className="relative">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Title</span>
        </div>
        <input
          id="memo-title"
          type="text"
          onChange={onChangeMemoDetails}
          name="title"
          placeholder="Type here"
          value={formData.title}
          className="input input-bordered w-full bg-white"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Content</span>
        </div>
        <textarea
          id="memo-content"
          onChange={onChangeMemoDetails}
          name="content"
          placeholder="Type here"
          value={formData.content}
          className="input input-bordered w-full bg-white h-32"
        />
      </label>
      {updateMemoError && (
        <div role="alert" className="absolute">
          <span className="text-red-500">{updateMemoError}</span>
        </div>
      )}
      <div className="mt-8 flex justify-between space-x-6">
        <button
          type="submit"
          id="save-memo"
          disabled={!currentSelectedMemo}
          className="btn bg-green-500 text-white border-none"
        >
          SAVE
        </button>
        <button
          id="delete-memo"
          type="button"
          onClick={() => onDeleteMemo(currentSelectedMemo!.id)}
          disabled={!currentSelectedMemo}
          className="btn bg-red-500 text-white border-none"
        >
          DELETE
        </button>
      </div>
    </form>
  );
}
