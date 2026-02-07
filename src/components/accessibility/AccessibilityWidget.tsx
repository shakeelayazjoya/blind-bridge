import React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useReadingGuide } from '@/hooks/useReadingGuide';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { AccessibilityButton } from './AccessibilityButton';
import { AccessibilitySidebar } from './AccessibilitySidebar';

export const AccessibilityWidget: React.FC = () => {
  const { readingRuler, readingMask } = useAccessibility();

  useReadingGuide(readingRuler, 'ruler');
  useReadingGuide(readingMask, 'mask');
  useKeyboardShortcuts();

  return (
    <>
      <AccessibilityButton />
      <AccessibilitySidebar />
    </>
  );
};
