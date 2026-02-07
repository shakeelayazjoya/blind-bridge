import React from 'react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { Volume2, Pause, Play, Square, Gauge } from 'lucide-react';
import { ControlButton } from './ControlButton';

export const VoiceReader: React.FC = () => {
  const tts = useTextToSpeech();

  return (
    <section aria-labelledby="voice-controls-heading" className="space-y-3">
      <h3 id="voice-controls-heading" className="font-heading text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
        <Volume2 size={16} aria-hidden="true" />
        Voice Reader
      </h3>
      <div className="grid grid-cols-3 gap-2">
        <ControlButton
          icon={<Volume2 size={18} />}
          label="Read Selected"
          onClick={tts.readSelected}
          active={tts.speaking}
          shortcut="Alt R"
        />
        <ControlButton
          icon={tts.paused ? <Play size={18} /> : <Pause size={18} />}
          label={tts.paused ? 'Resume' : 'Pause'}
          onClick={tts.paused ? tts.resume : tts.pause}
          disabled={!tts.speaking}
        />
        <ControlButton
          icon={<Square size={18} />}
          label="Stop"
          onClick={tts.stop}
          disabled={!tts.speaking}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground font-medium flex items-center gap-1">
          <Gauge size={12} aria-hidden="true" />
          Speed: {tts.rate.toFixed(1)}x
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={tts.rate}
          onChange={e => tts.setRate(parseFloat(e.target.value))}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          aria-label="Speech speed"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground font-medium">
          Pitch: {tts.pitch.toFixed(1)}
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={tts.pitch}
          onChange={e => tts.setPitch(parseFloat(e.target.value))}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          aria-label="Speech pitch"
        />
      </div>

      <p className="text-xs text-muted-foreground italic">
        Tip: Select text on the page, then press <kbd className="px-1 py-0.5 bg-secondary rounded text-xs font-mono">Alt+R</kbd> to read it aloud.
      </p>
    </section>
  );
};
