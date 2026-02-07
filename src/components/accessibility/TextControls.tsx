import React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Plus, Minus, RotateCcw, MoveVertical, Space, Type, Bold, Heading, Link, Focus } from 'lucide-react';
import { ControlButton } from './ControlButton';

export const TextControls: React.FC = () => {
  const a11y = useAccessibility();

  return (
    <section aria-labelledby="text-controls-heading" className="space-y-3">
      <h3 id="text-controls-heading" className="font-heading text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
        <Type size={16} aria-hidden="true" />
        Text & Reading
      </h3>
      <div className="grid grid-cols-3 gap-2">
        <ControlButton
          icon={<Plus size={18} />}
          label="Bigger Text"
          onClick={() => a11y.set('fontSizeOffset', Math.min(a11y.fontSizeOffset + 1, 5))}
          active={a11y.fontSizeOffset > 0}
          shortcut="Alt +="
        />
        <ControlButton
          icon={<Minus size={18} />}
          label="Smaller Text"
          onClick={() => a11y.set('fontSizeOffset', Math.max(a11y.fontSizeOffset - 1, -3))}
          active={a11y.fontSizeOffset < 0}
          shortcut="Alt -"
        />
        <ControlButton
          icon={<RotateCcw size={18} />}
          label="Reset Size"
          onClick={() => a11y.set('fontSizeOffset', 0)}
          shortcut="Alt 0"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <ControlButton
          icon={<MoveVertical size={18} />}
          label="Line Height"
          onClick={() => a11y.toggle('lineHeightIncrease')}
          active={a11y.lineHeightIncrease}
          shortcut="Alt L"
        />
        <ControlButton
          icon={<Space size={18} />}
          label="Letter Spacing"
          onClick={() => a11y.toggle('letterSpacingIncrease')}
          active={a11y.letterSpacingIncrease}
          shortcut="Alt K"
        />
        <ControlButton
          icon={<Type size={18} />}
          label="Dyslexia Font"
          onClick={() => a11y.toggle('dyslexiaFont')}
          active={a11y.dyslexiaFont}
          shortcut="Alt D"
        />
        <ControlButton
          icon={<Bold size={18} />}
          label="Bold Text"
          onClick={() => a11y.toggle('boldText')}
          active={a11y.boldText}
          shortcut="Alt B"
        />
        <ControlButton
          icon={<Heading size={18} />}
          label="Headings"
          onClick={() => a11y.toggle('highlightHeadings')}
          active={a11y.highlightHeadings}
          shortcut="Alt J"
        />
        <ControlButton
          icon={<Link size={18} />}
          label="Links"
          onClick={() => a11y.toggle('highlightLinks')}
          active={a11y.highlightLinks}
          shortcut="Alt P"
        />
      </div>
    </section>
  );
};
