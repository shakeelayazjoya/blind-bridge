import { useEffect } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';

/**
 * Keyboard shortcuts for accessibility features.
 * All shortcuts use Alt + key combination.
 */
export const useKeyboardShortcuts = () => {
  const a11y = useAccessibility();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.altKey) return;

      // Don't trigger when typing in inputs
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      let handled = true;

      switch (e.key.toLowerCase()) {
        // Sidebar
        case 'a': a11y.setSidebarOpen(!a11y.sidebarOpen); break;

        // Text controls
        case '=': // Alt + = (plus)
        case '+':
          a11y.set('fontSizeOffset', Math.min(a11y.fontSizeOffset + 1, 5)); break;
        case '-':
          a11y.set('fontSizeOffset', Math.max(a11y.fontSizeOffset - 1, -3)); break;
        case '0':
          a11y.set('fontSizeOffset', 0); break;
        case 'l':
          a11y.toggle('lineHeightIncrease'); break;
        case 'k':
          a11y.toggle('letterSpacingIncrease'); break;
        case 'd':
          a11y.toggle('dyslexiaFont'); break;
        case 'b':
          a11y.toggle('boldText'); break;

        // Color controls
        case 'c':
          a11y.toggle('highContrast'); break;
        case 'n':
          a11y.toggle('darkMode'); break;
        case 'i':
          a11y.toggle('invertColors'); break;
        case 'g':
          a11y.toggle('grayscale'); break;
        case 'f':
          a11y.toggle('blueFilter'); break;

        // Visual controls
        case 'h':
          a11y.toggle('hideImages'); break;
        case 'm':
          a11y.toggle('bigCursor'); break;
        case 'u':
          a11y.toggle('readingRuler'); break;
        case 'e':
          a11y.toggle('readingMask'); break;

        // Cognitive
        case 'q':
          a11y.toggle('reduceMotion'); break;
        case 'o':
          a11y.toggle('focusMode'); break;

        // Highlight
        case 'j':
          a11y.toggle('highlightHeadings'); break;
        case 'p':
          a11y.toggle('highlightLinks'); break;

        // Reset
        case 'x':
          a11y.resetAll(); break;

        // Alt+R is already handled by useTextToSpeech
        default:
          handled = false;
      }

      if (handled) e.preventDefault();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [a11y]);
};
