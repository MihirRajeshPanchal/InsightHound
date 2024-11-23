import { Stack, Link, useRouter } from 'expo-router';
import { useEffect } from 'react';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        <Link href={{ pathname: '/auth', params: { name: 'Dan' } }} asChild>
          <Button title="Auth" />
        </Link>
        <Link href={{ pathname: '/onboarding', params: { name: 'Dan' } }} asChild>
          <Button title="Show Details" />
        </Link>
      </Container>
    </>
  );
}
