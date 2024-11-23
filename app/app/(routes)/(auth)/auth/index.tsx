import { useRouter } from 'expo-router';
import Auth from '~/components/auth';
import { setToken } from '~/lib/utils/token';

export default function AuthComponent() {
  const router = useRouter();
  const afterAuth = async (str: string) => {
    await setToken(str);
    router.push('/onboarding');
  };
  return <Auth afterAuth={afterAuth} />;
}
