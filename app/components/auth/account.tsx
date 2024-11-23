'use client';

import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

export const Account: React.FC<{
  currentTab?: 0 | 1;
  firstTab: React.ReactNode;
  secondTab: React.ReactNode;
  setCurrentTab: Dispatch<SetStateAction<0 | 1>>;
}> = ({ currentTab = 0, firstTab, secondTab, setCurrentTab }) => {
  return (
    <div className="flex w-full max-w-[430px] flex-col gap-2">
      <Switch currentTab={currentTab} setTab={setCurrentTab} />
      <div className="overflow-hidden rounded-xl border border-neutral-200 p-2 shadow-sm dark:border-neutral-900">
        {currentTab === 0 && firstTab}
        {currentTab === 1 && secondTab}
      </div>
    </div>
  );
};

const Switch: React.FC<{
  setTab: Dispatch<SetStateAction<0 | 1>>;
  currentTab: number;
}> = ({ setTab, currentTab }) => (
  <div
    className={`relative flex w-full items-center rounded-lg bg-neutral-100 py-1 text-neutral-900 dark:bg-neutral-800 dark:text-white`}>
    <motion.div
      transition={{
        type: 'keyframes',
        duration: 0.15,
        ease: 'easeInOut',
      }}
      animate={currentTab === 0 ? { x: 4 } : { x: '98%' }}
      initial={currentTab === 0 ? { x: 4 } : { x: '98%' }}
      className={`absolute h-5/6 w-1/2 rounded-md bg-white shadow-sm dark:bg-neutral-950`}
    />
    <button
      onClick={() => {
        setTab(0);
      }}
      className="z-10 h-9 w-full rounded-md text-center">
      Sign in
    </button>
    <button
      onClick={() => {
        setTab(1);
      }}
      className="z-10 h-9 w-full rounded-md text-center">
      Sign up
    </button>
  </div>
);
