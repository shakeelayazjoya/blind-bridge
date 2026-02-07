import React, { useEffect, useRef } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { X, RotateCcw, Accessibility } from 'lucide-react';
import { TextControls } from './TextControls';
import { ColorControls } from './ColorControls';
import { VisualControls } from './VisualControls';
import { VoiceReader } from './VoiceReader';
import { CognitiveControls } from './CognitiveControls';

export const AccessibilitySidebar: React.FC = () => {
  const a11y = useAccessibility();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus trap
  useEffect(() => {
    if (!a11y.sidebarOpen) return;
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        a11y.setSidebarOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !sidebarRef.current) return;

      const focusable = sidebarRef.current.querySelectorAll<HTMLElement>(
        'button, input, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [a11y.sidebarOpen, a11y]);

  if (!a11y.sidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[99990] animate-fade-in"
        onClick={() => a11y.setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        role="dialog"
        aria-modal="true"
        aria-label="Accessibility Settings"
        className="accessibility-sidebar fixed top-0 right-0 h-full w-full max-w-sm bg-card border-l border-border shadow-2xl z-[99991] animate-slide-in-right flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Accessibility size={22} className="text-primary" aria-hidden="true" />
            <h2 className="font-heading text-lg font-bold text-foreground">Accessibility</h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={a11y.resetAll}
              className="p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Reset all settings"
              title="Reset all settings"
            >
              <RotateCcw size={18} />
            </button>
            <button
              ref={closeRef}
              onClick={() => a11y.setSidebarOpen(false)}
              className="p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Close accessibility panel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div aria-live="polite" className="sr-only">
            Accessibility settings panel is open
          </div>
          <TextControls />
          <hr className="border-border" />
          <ColorControls />
          <hr className="border-border" />
          <VisualControls />
          <hr className="border-border" />
          <VoiceReader />
          <hr className="border-border" />
          <CognitiveControls />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs font-mono">Alt</kbd> + key for shortcuts.
            <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs font-mono ml-1">Alt+A</kbd> toggle panel.
            <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs font-mono ml-1">Alt+X</kbd> reset all.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with care for everyone ♿
          </p>
        </div>
      </aside>
    </>
  );
};
