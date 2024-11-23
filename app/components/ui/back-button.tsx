'use dom';
import '~/global.css';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

import { Button } from './button';

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} className={className}>
      <ArrowLeft />
      Back
    </Button>
  );
}
