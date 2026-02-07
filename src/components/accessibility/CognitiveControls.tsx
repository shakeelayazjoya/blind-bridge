import React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Sparkles, Zap, Focus } from 'lucide-react';
import { ControlButton } from './ControlButton';

export const CognitiveControls: React.FC = () => {
  const a11y = useAccessibility();

  return (
    <section aria-labelledby="cognitive-controls-heading" className="space-y-3">
      <h3 id="cognitive-controls-heading" className="font-heading text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
        <Sparkles size={16} aria-hidden="true" />
        Cognitive Support
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <ControlButton
          icon={<Zap size={18} />}
          label="Reduce Motion"
          onClick={() => a11y.toggle('reduceMotion')}
          active={a11y.reduceMotion}
          shortcut="Alt Q"
        />
        <ControlButton
          icon={<Focus size={18} />}
          label="Focus Mode"
          onClick={() => a11y.toggle('focusMode')}
          active={a11y.focusMode}
          shortcut="Alt O"
        />
      </div>
    </section>
  );
};
