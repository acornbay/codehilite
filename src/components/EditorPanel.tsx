import React, { useRef, useState } from 'react';
import { Sparkles, FileUp, Terminal, Code2 } from 'lucide-react';
import { LANGUAGES } from '../data';
import { ExportSettings } from '../types';

interface EditorPanelProps {
  settings: ExportSettings;
  updateSettings: (newSettings: Partial<ExportSettings>) => void;
  onDetectLanguage: () => void;
  onFileUpload: (file: File) => void;
  onPasteWordFormatted: () => void;
}

export default function EditorPanel({
  settings,
  updateSettings,
  onDetectLanguage,
  onFileUpload,
}: EditorPanelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  const handleTabPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const code = settings.code;

      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      updateSettings({ code: newCode });

      // Put caret position back
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lineCount = settings.code ? settings.code.split('\n').length : 0;
  const charCount = settings.code ? settings.code.length : 0;

  return (
    <section className="editor-panel flex flex-col flex-1 min-w-0 bg-[var(--theme-surface)] h-full transition-colors duration-200">
      {/* Editor Control Ticker */}
      <div className="flex items-center h-12 border-b border-[var(--theme-border)] bg-[var(--theme-panel)]/40 px-4 shrink-0 overflow-x-auto select-none no-scrollbar gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mr-2 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-[9.5px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Live Editor</span>
        </div>

        {/* Language selector */}
        <select
          value={settings.lang}
          onChange={(e) => updateSettings({ lang: e.target.value })}
          className="bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[var(--theme-text)] text-xs font-semibold rounded-xl px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 cursor-pointer transition-all shrink-0 max-w-[120px] sm:max-w-[150px]"
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>

        {/* Detect button */}
        <button
          onClick={onDetectLanguage}
          className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl text-[11px] font-bold text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-hover)] border border-transparent hover:border-[var(--theme-border)] cursor-pointer select-none shrink-0 transition-all"
          title="Detect language from analysis"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Auto Detect</span>
        </button>

        <div className="flex-1" />

        {/* Upload File button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl text-[11px] font-bold text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-hover)] border border-transparent hover:border-[var(--theme-border)] cursor-pointer select-none shrink-0 transition-all"
        >
          <FileUp className="w-3.5 h-3.5 text-indigo-400" />
          <span>Upload file</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          id="file-input-id"
          className="hidden"
          accept=".txt,.js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.go,.rs,.rb,.php,.swift,.kt,.html,.css,.scss,.sql,.sh,.bash,.json,.yaml,.yml,.xml,.md,.r,.lua,.dart"
          onChange={handleFileChange}
        />
      </div>

      {/* Editor Frame */}
      <div 
        className="flex-1 relative overflow-auto"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Editor Drop Overlay */}
        {isDragging && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--theme-accent)]/10 backdrop-blur-sm border-2 border-dashed border-[var(--theme-accent)] m-4 rounded-xl transition-all">
            <span className="text-3xl font-extrabold mb-2 text-[var(--theme-accent)] animation-bounce">+</span>
            <span className="text-sm font-bold text-[var(--theme-text)]">Drop files to load code</span>
            <span className="text-xs text-[var(--theme-text-tint)] mt-1">Accepts source-code files, yaml, json, lists</span>
          </div>
        )}

        <textarea
          value={settings.code}
          onChange={(e) => updateSettings({ code: e.target.value })}
          onKeyDown={handleTabPress}
          style={{ width: '365px', height: '1000px' }}
          className="p-4 resize-none outline-none font-mono text-[13px] leading-relaxed tracking-wide bg-transparent text-[var(--theme-text)] selection:bg-[var(--theme-accent)]/20"
          placeholder="Paste or type your code snippet here..."
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>

      {/* Footer Status Bar */}
      <div className="flex items-center h-8 bg-[var(--theme-panel)] px-4 border-t border-[var(--theme-border)] text-[10.5px] font-medium text-[var(--theme-text-tint)] shrink-0 select-none">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 shrink-0 animate-pulse" />
        <span className="font-mono">{lineCount} {lineCount === 1 ? 'line' : 'lines'}</span>
        <span className="mx-2 opacity-35">·</span>
        <span className="font-mono">{charCount} chars</span>
        <span className="mx-2 opacity-35">·</span>
        <span className="capitalize font-semibold text-[var(--theme-text-muted)]">Mode: {settings.lang}</span>
      </div>
    </section>
  );
}
