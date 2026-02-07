import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface AccessibilityState {
  // Text
  fontSizeOffset: number;
  lineHeightIncrease: boolean;
  letterSpacingIncrease: boolean;
  dyslexiaFont: boolean;
  boldText: boolean;
  highlightHeadings: boolean;
  highlightLinks: boolean;
  // Color
  highContrast: boolean;
  darkMode: boolean;
  invertColors: boolean;
  grayscale: boolean;
  blueFilter: boolean;
  customBgColor: string;
  customTextColor: string;
  // Visual
  hideImages: boolean;
  zoomLevel: number;
  bigCursor: boolean;
  readingRuler: boolean;
  readingMask: boolean;
  // Cognitive
  reduceMotion: boolean;
  focusMode: boolean;
  // Sidebar
  sidebarOpen: boolean;
}

interface AccessibilityContextType extends AccessibilityState {
  set: <K extends keyof AccessibilityState>(key: K, value: AccessibilityState[K]) => void;
  toggle: (key: keyof AccessibilityState) => void;
  resetAll: () => void;
  setSidebarOpen: (open: boolean) => void;
}

const defaults: AccessibilityState = {
  fontSizeOffset: 0,
  lineHeightIncrease: false,
  letterSpacingIncrease: false,
  dyslexiaFont: false,
  boldText: false,
  highlightHeadings: false,
  highlightLinks: false,
  highContrast: false,
  darkMode: false,
  invertColors: false,
  grayscale: false,
  blueFilter: false,
  customBgColor: '',
  customTextColor: '',
  hideImages: false,
  zoomLevel: 100,
  bigCursor: false,
  readingRuler: false,
  readingMask: false,
  reduceMotion: false,
  focusMode: false,
  sidebarOpen: false,
};

const STORAGE_KEY = 'a11y-prefs';

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AccessibilityState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...defaults, ...JSON.parse(saved), sidebarOpen: false };
    } catch {}
    return defaults;
  });

  // Persist to localStorage
  useEffect(() => {
    const { sidebarOpen, ...rest } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  }, [state]);

  // Apply classes to <html>
  useEffect(() => {
    const html = document.documentElement;
    const cl = html.classList;

    // Dark mode
    state.darkMode ? cl.add('dark') : cl.remove('dark');
    
    // Toggle classes
    const toggleMap: Record<string, boolean> = {
      'a11y-high-contrast': state.highContrast,
      'a11y-invert': state.invertColors,
      'a11y-grayscale': state.grayscale,
      'a11y-blue-filter': state.blueFilter,
      'a11y-dyslexia-font': state.dyslexiaFont,
      'a11y-bold-text': state.boldText,
      'a11y-highlight-headings': state.highlightHeadings,
      'a11y-highlight-links': state.highlightLinks,
      'a11y-hide-images': state.hideImages,
      'a11y-big-cursor': state.bigCursor,
      'a11y-reduce-motion': state.reduceMotion,
      'a11y-focus-mode': state.focusMode,
    };

    Object.entries(toggleMap).forEach(([cls, active]) => {
      active ? cl.add(cls) : cl.remove(cls);
    });

    // Font size
    html.style.fontSize = `${16 + state.fontSizeOffset * 2}px`;

    // Line height
    html.style.lineHeight = state.lineHeightIncrease ? '2' : '';

    // Letter spacing
    html.style.letterSpacing = state.letterSpacingIncrease ? '0.1em' : '';

    // Zoom
    document.body.style.transform = state.zoomLevel !== 100 ? `scale(${state.zoomLevel / 100})` : '';
    document.body.style.transformOrigin = 'top left';
    document.body.style.width = state.zoomLevel !== 100 ? `${10000 / state.zoomLevel}%` : '';

    // Custom colors via CSS classes (not inline styles, for specificity)
    if (state.customBgColor) {
      html.style.setProperty('--custom-bg-color', state.customBgColor);
      cl.add('a11y-custom-bg-color');
    } else {
      cl.remove('a11y-custom-bg-color');
    }
    if (state.customTextColor) {
      html.style.setProperty('--custom-text-color', state.customTextColor);
      cl.add('a11y-custom-text-color');
    } else {
      cl.remove('a11y-custom-text-color');
    }
  }, [state]);

  const set = useCallback(<K extends keyof AccessibilityState>(key: K, value: AccessibilityState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggle = useCallback((key: keyof AccessibilityState) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const resetAll = useCallback(() => {
    setState({ ...defaults });
    const html = document.documentElement;
    html.classList.remove('a11y-custom-bg-color', 'a11y-custom-text-color');
    document.body.style.transform = '';
    document.body.style.width = '';
    html.style.fontSize = '';
    html.style.lineHeight = '';
    html.style.letterSpacing = '';
  }, []);

  const setSidebarOpen = useCallback((open: boolean) => {
    setState(prev => ({ ...prev, sidebarOpen: open }));
  }, []);

  return (
    <AccessibilityContext.Provider value={{ ...state, set, toggle, resetAll, setSidebarOpen }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
