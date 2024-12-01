import { usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { getToken, removeToken, setToken } from '~/lib/utils/token';

export default function AuthLock() {
  const path = usePathname();
  const publicPaths = ['/oauth', '/sign-in'];
  const router = useRouter();
  useEffect(() => {
    async function testAuth() {
      // setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDBkZjk1MzBjZjZkODIxNWU5ZDVlZiIsImVtYWlsIjoibWloaXJwYW5jaGFsNTQwMEBnbWFpbC5jb20iLCJpYXQiOjE3MzI0NDQ3MzAsImV4cCI6MTczMjUzMTEzMH0.fgkI4qnrP1DRd4gbJnMPPsz2eIXvzrHu7kNgQK05up0")
      const token = await getToken();
      console.log(token);
      if (!token && !publicPaths.includes(path)) {
        router.push('/sign-in');
      }
    }
    void testAuth();
  }, [path]);

  return <View />;
}
