import '../global.css';

import { useFonts } from '@expo-google-fonts/dev';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import AuthLock from '~/components/auth/auth-lock';
import { UserProvider } from '~/lib/hooks/use-auth';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    // ClashGrotesk:
    //   'https://cdn.fontshare.com/wf/5TRO2J3HJNIQODLQ4CTSMGSLAWSE5YUY/GHXENXHZCDIOE5E73364PNNASRNO3JVW/GLZTRU2GIKPV5HYT3E6HDLWOXAWPNZDV.ttf',
    ClashGrotesk_200:
      'https://cdn.fontshare.com/wf/4LBWQBEAT7WMBLPYHDTSGFMVYM7YP52X/7KPUND2QF7YEOZXDNBOHQRJKQWHIG2TW/O7I6PUTWFICZ67CVKIGGMX2EF3RHEAKS.ttf',
    ClashGrotesk_300:
      'https://cdn.fontshare.com/wf/SINQ57HHHPFVR2H2M32ZNEFSVLE2LFD2/7IAKEQYNYVZZQGJW7R4Y7C5IZ7XHSFQO/DKSXVIDJANOLWNE4OACLWSGITSUTBGB3.ttf',
    ClashGrotesk_400:
      'https://cdn.fontshare.com/wf/O462VY6O6FTQCS72XVMTQHXAM4NN5CY3/TWF57ITZORMJ3MEWLQQIVO6BMXIB6FUR/MJQFMMOTEGNXDVM7HBBDTQHTVB2M7Y6G.ttf',
    ClashGrotesk_500:
      'https://cdn.fontshare.com/wf/2SAK53YLUN7RMYJU4MYLSBV6SSSJEJZB/RXS4DPGJRKOUFZMF5X5BVUGNNKJT65XZ/DJS4RYGIUYUXJQOHY5VCZPKSTXUSHTSP.ttf',
    ClashGrotesk_600:
      'https://cdn.fontshare.com/wf/MKEEQN57GWBZOSYWCRODNJOOZNPLMAKN/5SPTSZGHEACWWLF34DQ4WAA4OGU6PQIF/KN7DX4F6PXB74R6L2K2Y4NH3CB7FC53Q.ttf',
    ClashGrotesk_700:
      'https://cdn.fontshare.com/wf/P6VJ47S3OYMUC7HYSJLTK7PEIK5O2NPQ/TK62VLUWA76PMTK2XWBNDZB7QVXJGYE3/I5W5NEJGYVFUC5I4XOXVET63OE5PSVHJ.ttf',
  });

  useEffect(() => {
    setTimeout(() => {
      if (fontsLoaded) {
        // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
        SplashScreen.hideAsync();
      }
    }, 1000);
  }, [fontsLoaded]);

  return (
    fontsLoaded && (
      <View className="size-full">
        <UserProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
          <AuthLock />
        </UserProvider>
      </View>
    )
  );
}
