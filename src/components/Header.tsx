import React, { useState } from 'react';
import { Sun, Moon, Copy, Save, Database, BookOpen, Sparkles, Mail, Check, Code2 } from 'lucide-react';
import { ExportSettings, SavedSnippet } from '../types';

interface HeaderProps {
  settings: ExportSettings;
  updateSettings: (newSettings: Partial<ExportSettings>) => void;
  savedSnippets: SavedSnippet[];
  onSaveSnippet: () => void;
  onOpenSnippets: () => void;
  onOpenBlog: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  appTheme: 'dark' | 'light';
  toggleAppTheme: () => void;
  onCopyRaw: () => Promise<void>;
}

export default function Header({
  settings,
  updateSettings,
  savedSnippets,
  onSaveSnippet,
  onOpenSnippets,
  onOpenBlog,
  onOpenAbout,
  onOpenContact,
  appTheme,
  toggleAppTheme,
  onCopyRaw,
}: HeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await onCopyRaw();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  return (
    <header className="header flex items-center h-16 border-b border-[var(--theme-border)] bg-[var(--theme-panel)]/50 backdrop-blur-md px-6 sm:px-8 shrink-0 transition-colors duration-200 select-none z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer mr-6 sm:mr-8 shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-all hover:scale-105">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-[var(--theme-text)]">
          CODE<span className="text-indigo-500 font-extrabold">HILITE</span>
        </span>
      </div>

      {/* Pages links */}
      <nav className="hidden lg:flex items-center gap-1.5 shrink-0 bg-[var(--theme-surface)]/40 border border-[var(--theme-border)] p-1 rounded-xl">
        <button
          onClick={onOpenBlog}
          className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-semibold text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-hover)] transition-all cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>Blog</span>
        </button>
        <button
          onClick={onOpenAbout}
          className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-semibold text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-hover)] transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>About</span>
        </button>
        <button
          onClick={onOpenContact}
          className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-semibold text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-hover)] transition-all cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5 text-indigo-400" />
          <span>Contact</span>
        </button>
      </nav>

      <div className="hidden lg:block w-[1px] h-6 bg-[var(--theme-border)] mx-5 shrink-0" />

      {/* Snippet Title Frame */}
      <div className="flex items-center gap-2 max-w-[12rem] sm:max-w-xs md:max-w-md">
        <span className="text-xs text-[var(--theme-text-tint)] font-semibold font-mono hidden sm:inline">title:</span>
        <input
          type="text"
          value={settings.title}
          onChange={(e) => updateSettings({ title: e.target.value })}
          placeholder="my-cool-snippet"
          className="w-full bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] rounded-xl px-3.5 py-1.5 text-xs font-mono font-semibold text-[var(--theme-text)] outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-150"
          spellCheck={false}
        />
      </div>

      <div className="ml-auto flex items-center gap-2 shrink-0">
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold border cursor-pointer select-none transition-all duration-120 ${
            copied
              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
              : 'bg-[var(--theme-surface)] border-[var(--theme-border)] hover:bg-[var(--theme-surface-hover)] hover:border-indigo-500/40 text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] shadow-sm'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>

        {/* Save button */}
        <button
          onClick={onSaveSnippet}
          className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold bg-[var(--theme-surface)] border border-[var(--theme-border)] hover:bg-[var(--theme-surface-hover)] hover:border-indigo-500/40 text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] cursor-pointer select-none transition-all duration-120 shadow-sm"
          title="Save snippet setup locally"
        >
          <Save className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Save</span>
        </button>

        {/* Saved Snippets list toggle */}
        <button
          onClick={onOpenSnippets}
          className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-transparent transition-all cursor-pointer shadow-md shadow-indigo-600/10 active:scale-95"
        >
          <Database className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Snippets</span>
          <span className="inline-flex items-center justify-center bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 h-4 text-center leading-none">
            {savedSnippets.length}
          </span>
        </button>

        <div className="w-[1px] h-6 bg-[var(--theme-border)] shrink-0 mx-1.5" />

        {/* Theme toggle */}
        <button
          onClick={toggleAppTheme}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] hover:bg-[var(--theme-surface-hover)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-all cursor-pointer shrink-0 shadow-sm"
          title="Toggle app editor light/dark theme"
        >
          {appTheme === 'dark' ? <Sun className="w-4 h-4 text-indigo-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
        </button>
      </div>
    </header>
  );
}
