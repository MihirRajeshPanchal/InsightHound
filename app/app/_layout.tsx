import '../global.css';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dev';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import AuthLock from '~/components/auth/auth-lock';
import { UserProvider } from '~/lib/hooks/use-auth';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ DMSans_400Regular, DMSans_500Medium, DMSans_700Bold });

  useEffect(() => {
    setTimeout(() => {
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    }, 1000);

  }, [fontsLoaded]);

  return fontsLoaded && (
    <View className="flex-1">
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <AuthLock />
      </UserProvider>
    </View>
  );
}