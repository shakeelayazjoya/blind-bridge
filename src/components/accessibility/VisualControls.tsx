import React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { ImageOff, ZoomIn, ZoomOut, MousePointer, Ruler, ScanLine } from 'lucide-react';
import { ControlButton } from './ControlButton';

export const VisualControls: React.FC = () => {
  const a11y = useAccessibility();

  return (
    <section aria-labelledby="visual-controls-heading" className="space-y-3">
      <h3 id="visual-controls-heading" className="font-heading text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
        <ScanLine size={16} aria-hidden="true" />
        Visual Assistance
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <ControlButton
          icon={<ImageOff size={18} />}
          label="Hide Images"
          onClick={() => a11y.toggle('hideImages')}
          active={a11y.hideImages}
          shortcut="Alt H"
        />
        <ControlButton
          icon={<MousePointer size={18} />}
          label="Big Cursor"
          onClick={() => a11y.toggle('bigCursor')}
          active={a11y.bigCursor}
          shortcut="Alt M"
        />
        <ControlButton
          icon={<Ruler size={18} />}
          label="Reading Ruler"
          onClick={() => a11y.toggle('readingRuler')}
          active={a11y.readingRuler}
          shortcut="Alt U"
        />
        <ControlButton
          icon={<ScanLine size={18} />}
          label="Reading Mask"
          onClick={() => a11y.toggle('readingMask')}
          active={a11y.readingMask}
          shortcut="Alt E"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <ControlButton
          icon={<ZoomIn size={18} />}
          label="Zoom In"
          onClick={() => a11y.set('zoomLevel', Math.min(a11y.zoomLevel + 10, 200))}
          active={a11y.zoomLevel > 100}
        />
        <ControlButton
          icon={<ZoomOut size={18} />}
          label="Zoom Out"
          onClick={() => a11y.set('zoomLevel', Math.max(a11y.zoomLevel - 10, 50))}
          active={a11y.zoomLevel < 100}
        />
      </div>
      {a11y.zoomLevel !== 100 && (
        <p className="text-xs text-muted-foreground text-center" aria-live="polite">
          Zoom: {a11y.zoomLevel}%
        </p>
      )}
    </section>
  );
};
