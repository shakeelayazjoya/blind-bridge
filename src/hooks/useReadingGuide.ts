import { useEffect, useRef, useState } from 'react';

export const useReadingGuide = (enabled: boolean, mode: 'ruler' | 'mask') => {
  const [mouseY, setMouseY] = useState(0);
  const rulerRef = useRef<HTMLDivElement | null>(null);
  const maskTopRef = useRef<HTMLDivElement | null>(null);
  const maskBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) {
      // Clean up
      rulerRef.current?.remove();
      maskTopRef.current?.remove();
      maskBottomRef.current?.remove();
      rulerRef.current = null;
      maskTopRef.current = null;
      maskBottomRef.current = null;
      return;
    }

    const handleMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);

    if (mode === 'ruler') {
      if (!rulerRef.current) {
        const el = document.createElement('div');
        el.className = 'a11y-reading-ruler';
        document.body.appendChild(el);
        rulerRef.current = el;
      }
    } else {
      if (!maskTopRef.current) {
        const top = document.createElement('div');
        top.className = 'a11y-reading-mask-top';
        const bottom = document.createElement('div');
        bottom.className = 'a11y-reading-mask-bottom';
        document.body.appendChild(top);
        document.body.appendChild(bottom);
        maskTopRef.current = top;
        maskBottomRef.current = bottom;
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, [enabled, mode]);

  useEffect(() => {
    if (mode === 'ruler' && rulerRef.current) {
      rulerRef.current.style.top = `${mouseY - 20}px`;
    }
    if (mode === 'mask') {
      if (maskTopRef.current) {
        maskTopRef.current.style.top = '0';
        maskTopRef.current.style.height = `${Math.max(0, mouseY - 30)}px`;
      }
      if (maskBottomRef.current) {
        maskBottomRef.current.style.top = `${mouseY + 30}px`;
        maskBottomRef.current.style.bottom = '0';
        maskBottomRef.current.style.height = `${Math.max(0, window.innerHeight - mouseY - 30)}px`;
      }
    }
  }, [mouseY, mode]);
};
