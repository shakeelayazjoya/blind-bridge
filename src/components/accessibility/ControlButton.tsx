import React from 'react';

interface ControlButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  shortcut?: string;
}

export const ControlButton: React.FC<ControlButtonProps> = ({ icon, label, onClick, active, disabled, shortcut }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-pressed={active}
    className={`
      flex flex-col items-center justify-center gap-1 p-3 rounded-lg text-xs font-medium
      transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
      ${active
        ? 'bg-primary text-primary-foreground shadow-md'
        : 'bg-secondary text-secondary-foreground hover:bg-sidebar-hover'
      }
      ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    <span aria-hidden="true">{icon}</span>
    <span>{label}</span>
    {shortcut && (
      <kbd className={`text-[10px] font-mono px-1 py-0.5 rounded ${active ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
        {shortcut}
      </kbd>
    )}
  </button>
);
