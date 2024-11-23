import { usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { getToken } from '~/lib/utils/token';

export default function AuthLock() {
  const path = usePathname();
  const publicPaths = ['/oauth', '/auth'];
  const router = useRouter();
  useEffect(() => {
    async function testAuth() {
      const token = await getToken();
      console.log(token);
      if (!token && !publicPaths.includes(path)) {
        router.push('/auth');
      }
    }
    void testAuth();
  }, [path]);

  return <View />;
}
