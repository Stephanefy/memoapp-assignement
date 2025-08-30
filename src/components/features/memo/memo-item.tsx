import { useAuthContext } from "../../../context/auth-context";
import { Memo, MemoDetails, useMemoContext } from "../../../context/memo-context"
import { getMemoDetails } from "../../../services/api/memo";

interface Props {
    memo: Memo
}

export default function MemoItem({ memo }: Props) {


    const { accessToken } = useAuthContext();
    const { setCurrentSelectedMemo } = useMemoContext();

    const onMemoItemClick = async (id: number) => {

        const memoDetailsData = await getMemoDetails(accessToken!, id) as MemoDetails;

        console.log("memoDetailsData", memoDetailsData)

        setCurrentSelectedMemo(memoDetailsData)
    }



    return (
        <div id={`memo-${memo.id}`} key={memo.id || memo.title} className="py-1" onClick={() => onMemoItemClick(memo.id)}>
            <button
                className="cursor-pointer block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left"
            >
                {memo.title}
            </button>
        </div >
    )
}