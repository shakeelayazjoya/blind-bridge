import React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Accessibility } from 'lucide-react';

export const AccessibilityButton: React.FC = () => {
  const { setSidebarOpen, sidebarOpen } = useAccessibility();

  return (
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      aria-label="Open accessibility settings"
      aria-expanded={sidebarOpen}
      className="fixed bottom-6 right-6 z-[99989] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-ring focus:ring-offset-2 flex items-center justify-center group"
    >
      <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" aria-hidden="true" />
      <Accessibility size={26} className="relative z-10" aria-hidden="true" />
    </button>
  );
};
