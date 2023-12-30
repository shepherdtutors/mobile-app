export * from './actions';
import React, {createContext, ReactNode, useMemo, useContext} from 'react';

export function useProviderUser() {
  return useMemo(
    () => ({}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}

type ContextType = ReturnType<typeof useProviderUser>;

const UserContext = createContext({} as ContextType);

export function UserProvider({children}: {children: ReactNode}) {
  const user = useProviderUser();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default function useAuth() {
  return useContext(UserContext);
}
