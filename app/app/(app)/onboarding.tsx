import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import OnboardingForm from '~/components/onboarding';
import { useAuth } from '~/lib/hooks/use-auth';
import { TNoParams } from '~/lib/types/common';
import { user } from '~/lib/types/prisma';
import { fetchAPI } from '~/lib/utils/fetch-api';
import { getToken } from '~/lib/utils/token';

export default function Onboarding() {
  const { user } = useAuth();
  const router = useRouter();

  const onSubmit = useCallback(async (values: any) => {
    const token = await getToken();
    if (!user) return;

    const res = await fetchAPI<TNoParams, { id: string }, user>({
      url: '/user/:id',
      urlParams: { id: user.id },
      method: 'PATCH',
      body: { ...user, props: JSON.stringify(values) },
      token,
    });

    router.push('/(tabs)');
  }, [user]);

  return <OnboardingForm onSubmit={onSubmit} />;
}