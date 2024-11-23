import { usePathname } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';

import { user } from '~/lib/types/prisma';
import { fetchAPI } from '~/lib/utils/fetch-api';
import { getToken } from '~/lib/utils/token';

const UserContext = createContext<{
  user: user | null;
  setUser: (user: user | null) => void;
}>({ user: null, setUser: () => {} });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<user | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  const path = usePathname();
  const { user, setUser } = useContext(UserContext);
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    async function fetchUser() {
      const token = await getToken();
      console.log({ token });
      if (!token) {
        console.log('TOKEN NOT FOUND!');
        return;
      }
      setToken(token);
      const res = await fetchAPI<{ user: user }>({
        url: '/user/getMe',
        method: 'GET',
        token,
      });
      console.log({ res });
      if (res.data) {
        setUser(res.data.user);
      }
    }
    fetchUser();
  }, [path, setUser]);

  return { user, setUser, token };
};
