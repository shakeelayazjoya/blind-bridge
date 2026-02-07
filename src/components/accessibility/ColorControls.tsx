import React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Contrast, Moon, Sun, FlipVertical, CircleDot, Glasses, Palette } from 'lucide-react';
import { ControlButton } from './ControlButton';

export const ColorControls: React.FC = () => {
  const a11y = useAccessibility();

  const bgColors = ['#ffffff', '#f5f5dc', '#fdf6e3', '#1e1e1e', '#2d2b55'];
  const textColors = ['#000000', '#333333', '#f8f8f2', '#00ff00', '#ffff00'];

  return (
    <section aria-labelledby="color-controls-heading" className="space-y-3">
      <h3 id="color-controls-heading" className="font-heading text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
        <Palette size={16} aria-hidden="true" />
        Color & Contrast
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <ControlButton
          icon={<Contrast size={18} />}
          label="High Contrast"
          onClick={() => a11y.toggle('highContrast')}
          active={a11y.highContrast}
          shortcut="Alt C"
        />
        <ControlButton
          icon={<Moon size={18} />}
          label="Dark Mode"
          onClick={() => a11y.toggle('darkMode')}
          active={a11y.darkMode}
          shortcut="Alt N"
        />
        <ControlButton
          icon={<FlipVertical size={18} />}
          label="Invert Colors"
          onClick={() => a11y.toggle('invertColors')}
          active={a11y.invertColors}
          shortcut="Alt I"
        />
        <ControlButton
          icon={<CircleDot size={18} />}
          label="Grayscale"
          onClick={() => a11y.toggle('grayscale')}
          active={a11y.grayscale}
          shortcut="Alt G"
        />
        <ControlButton
          icon={<Glasses size={18} />}
          label="Blue Filter"
          onClick={() => a11y.toggle('blueFilter')}
          active={a11y.blueFilter}
          shortcut="Alt F"
        />
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium">Background Color</p>
        <div className="flex gap-2" role="radiogroup" aria-label="Background color">
          {bgColors.map(c => (
            <button
              key={c}
              onClick={() => a11y.set('customBgColor', a11y.customBgColor === c ? '' : c)}
              className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                a11y.customBgColor === c ? 'border-primary scale-110' : 'border-border'
              }`}
              style={{ backgroundColor: c }}
              aria-label={`Background ${c}`}
              aria-pressed={a11y.customBgColor === c}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium">Text Color</p>
        <div className="flex gap-2" role="radiogroup" aria-label="Text color">
          {textColors.map(c => (
            <button
              key={c}
              onClick={() => a11y.set('customTextColor', a11y.customTextColor === c ? '' : c)}
              className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                a11y.customTextColor === c ? 'border-primary scale-110' : 'border-border'
              }`}
              style={{ backgroundColor: c }}
              aria-label={`Text color ${c}`}
              aria-pressed={a11y.customTextColor === c}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
