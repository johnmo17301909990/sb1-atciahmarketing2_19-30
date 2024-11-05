import React from 'react';
import { Transition as HeadlessTransition } from '@headlessui/react';

interface Props {
  show: boolean;
  children: React.ReactNode;
}

export function Transition({ show, children }: Props) {
  return (
    <HeadlessTransition
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </HeadlessTransition>
  );
}