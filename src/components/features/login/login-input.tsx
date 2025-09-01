import { ChangeEvent } from 'react';
import { useAuthContext } from '../../../context/auth-context';

interface Props {
  labelText: string;
  id: string;
}

export default function LoginInput({ labelText, id }: Props) {
  const { accessToken, setAccessToken, error, isAuthenticated } =
    useAuthContext();

  const onChangeAccessToken = (e: ChangeEvent<HTMLInputElement>) => {
    setAccessToken(e.currentTarget.value);
  };

  return (
    <>
      <label className="form-control w-full md:w-[400px]">
        <div className="label">
          <span className="label-text"> {labelText}</span>
          {error.isError && (
            <p className="text-red-200 text-sm">{error.message}</p>
          )}
        </div>
        <input
          id={id}
          type="text"
          value={accessToken || ''}
          name={id}
          disabled={isAuthenticated}
          placeholder="Type here"
          className="input input-bordered w-full"
          onChange={onChangeAccessToken}
        />
      </label>
    </>
  );
}
