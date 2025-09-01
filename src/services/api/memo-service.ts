import { request } from '../../utils/request-helper';
import { Memo, MemoDetails } from '../../context/memo-context';
const BASE_URL = 'https://challenge-server.tracks.run/memoapp';

export type MemoPayload = {
    category_id: number;
    title: string;
    content: string;
};

export async function getMemosOfCategory(
    accessToken: string,
    categoryId: number
) {
    try {
        const memos = await request<Memo[]>(
            `${BASE_URL}/memo?category_id=${categoryId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCESS-TOKEN': accessToken,
                },
            }
        );

        return memos;
    } catch (error) { }
    return [];
}

export async function getMemoDetails(accessToken: string, id: number) {
    try {
        const memo = await request<Memo>(`${BASE_URL}/memo/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': accessToken,
            },
        });

        return memo;
    } catch (error) { }
    return [];
}

export async function editMemoDetails(
    accessToken: string,
    memoId: number,
    payload: MemoPayload
) {
    const memo = await request<MemoDetails>(`${BASE_URL}/memo/${memoId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'X-ACCESS-TOKEN': accessToken,
        },
    });

    return memo;
}

export async function addNewMemo(accessToken: string, payload: MemoPayload) {
    const newMemo = await request<Memo>(`${BASE_URL}/memo`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'X-ACCESS-TOKEN': accessToken,
        },
    });

    return newMemo;
}

export async function deleteMemo(accessToken: string, memoId: number) {
    try {
        const response = await fetch(`${BASE_URL}/memo/${memoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': accessToken,
            },
        });
        return response;
    } catch (error) { }
    return [];
}
