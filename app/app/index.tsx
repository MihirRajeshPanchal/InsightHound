import { Redirect } from 'expo-router';
import { useAuth } from '~/lib/hooks/use-auth';

export default function Index() {
  // const { user } = useAuth();

  // if (!user) {
  //   return <Redirect href="/(auth)/sign-in" />;
  // }

  return <Redirect href="/(tabs)" />;
}