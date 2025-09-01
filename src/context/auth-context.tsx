import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react';

const uuidv4Pattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  error: { isError: boolean; message: string };
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [error, setError] = useState<{ isError: boolean; message: string }>({
    isError: false,
    message: '',
  });

  useEffect(() => {
    // Simple login validation logic
    if (!accessToken || accessToken === '') {
      setError({ isError: false, message: '' });
    } else if (!uuidv4Pattern.test(accessToken)) {
      setError({ isError: true, message: 'Invalid access token' });
    } else {
      setError({ isError: false, message: '' });
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        accessToken,
        setAccessToken,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be inside a provider');
  return context;
};
