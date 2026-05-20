import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import InfoSection from './components/InfoSection';
import { BlogModal, AboutModal, ContactModal, SavedSnippetsModal, PrivacyPolicyModal, TermsOfServiceModal } from './components/Modals';
import { ExportSettings, SavedSnippet } from './types';
import { DEFAULT_SAMPLE_CODE } from './data';
import hljs from 'highlight.js';
import { AlertCircle, CheckCircle, ChevronRight } from 'lucide-react';

export default function App() {
  // ── CORE STATE: Export settings ──
  const [settings, setSettings] = useState<ExportSettings>({
    title: 'my-cool-snippet',
    code: DEFAULT_SAMPLE_CODE,
    lang: 'javascript',
    theme: 'latex',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    lineHeight: 1.65,
    letterSpacing: 0.02,
    padding: 24,
    cardWidth: 560,
    showLineNums: true,
    wordWrap: true,
    showLangBadge: true,
    bgType: 'solid',
    bgColor1: '#f8f9fc',
    bgColor2: '#f8f9fc',
    bgDir: '135deg',
    bgPreset: '#f8f9fc',
    shadowClass: 'soft',
    shadowValue: '0 4px 24px rgba(0, 0, 0, 0.25)',
    borderRadius: 12,
    hlLines: '',
  });

  // ── SESSIONS STATE: Local saved snippets ──
  const [savedSnippets, setSavedSnippets] = useState<SavedSnippet[]>([]);

  // ── UI STATE: Modal Open controls ──
  const [isSnippetsOpen, setIsSnippetsOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // ── RESPONSIVE STATE: Active mobile view tab ──
  const [activeMobileTab, setActiveMobileTab] = useState<'editor' | 'preview' | 'settings'>('editor');

  // ── APP SCHEMA THEME STATE (For editor dashboard aesthetics itself) ──
  const [appTheme, setAppTheme] = useState<'dark' | 'light'>('light');

  // ── TOAST MESSAGES STATE ──
  const [toast, setToast] = useState<{ message: string; isSuccess: boolean; show: boolean }>({
    message: '',
    isSuccess: true,
    show: false,
  });

  // Load saved snippets and default appTheme selection from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('codehilite_snippets');
    if (saved) {
      try {
        setSavedSnippets(JSON.parse(saved));
      } catch (_) {}
    }

    const savedAppTheme = localStorage.getItem('codehilite_theme') as 'dark' | 'light' | null;
    if (savedAppTheme) {
       setAppTheme(savedAppTheme);
       document.documentElement.setAttribute('data-theme', savedAppTheme);
    } else {
       document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  // Update root stylesheet links dynamically whenever settings.theme updates
  useEffect(() => {
    const linkId = 'hljs-theme';
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    const isPrintTheme = ['latex', 'academic-pure', 'modern-journal'].includes(settings.theme);
    if (!isPrintTheme) {
      link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${settings.theme}.min.css`;
    } else {
      link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css`;
    }
  }, [settings.theme]);

  const updateSettings = (newSettings: Partial<ExportSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const showToast = (message: string, isSuccess = true) => {
    setToast({ message, isSuccess, show: true });
    // Clear old timeouts
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2800);
    return () => clearTimeout(timer);
  };

  const handleToggleAppTheme = () => {
    const nextTheme = appTheme === 'dark' ? 'light' : 'dark';
    setAppTheme(nextTheme);
    localStorage.setItem('codehilite_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    showToast(`App shell theme switched to ${nextTheme}!`, true);
  };

  // ── SESSION ACTIONS: Save / Load / Delete snippet ──
  const handleSaveSnippet = () => {
    const newSnippet: SavedSnippet = {
      id: String(Date.now()),
      title: settings.title || 'untitled-snippet',
      code: settings.code,
      lang: settings.lang,
      createdAt: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      settings: { ...settings },
    };

    const updated = [newSnippet, ...savedSnippets];
    setSavedSnippets(updated);
    localStorage.setItem('codehilite_snippets', JSON.stringify(updated));
    showToast('Snippet saved to local session space!', true);
  };

  const handleLoadSnippet = (id: string) => {
    const matched = savedSnippets.find((s) => s.id === id);
    if (matched) {
      setSettings(matched.settings);
      setIsSnippetsOpen(false);
      showToast(`Loaded snippet setup: "${matched.title}"`, true);
    }
  };

  const handleDeleteSnippet = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid loading it upon click
    const filt = savedSnippets.filter((s) => s.id !== id);
    setSavedSnippets(filt);
    localStorage.setItem('codehilite_snippets', JSON.stringify(filt));
    showToast('Snippet formulation cleared.', true);
  };

  const handleDetectLanguage = () => {
    if (!settings.code) return;
    try {
      const result = hljs.highlightAuto(settings.code);
      if (result.language) {
        updateSettings({ lang: result.language });
        showToast(`Auto-detected language: ${result.language.toUpperCase()}`, true);
      } else {
        showToast('Language details ambiguous. Defaulting manually.', false);
      }
    } catch (_) {
      showToast('Detection error.', false);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const codeStr = e.target?.result as string;
      
      // Attempt to extract extension and match language
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

      const extMap: Record<string, string> = {
        js: 'javascript', ts: 'typescript', jsx: 'javascript', tsx: 'typescript',
        py: 'python', java: 'java', cpp: 'cpp', c: 'c', h: 'c', cs: 'csharp',
        go: 'go', rs: 'rust', rb: 'ruby', php: 'php', swift: 'swift',
        kt: 'kotlin', html: 'html', htm: 'html', css: 'css', scss: 'scss',
        sql: 'sql', sh: 'bash', bash: 'bash', json: 'json', yml: 'yaml',
        yaml: 'yaml', xml: 'xml', md: 'markdown', r: 'r', lua: 'lua', dart: 'dart'
      };

      const matchedLang = extMap[ext] || 'auto';

      setSettings((prev) => ({
        ...prev,
        code: codeStr,
        title: baseName.replace(/[^a-zA-Z0-9-_]/g, '-'),
        lang: matchedLang,
      }));

      showToast(`Loaded File: "${file.name}"`, true);
    };
    reader.readAsText(file);
  };

  const handleCopyRaw = async () => {
    await navigator.clipboard.writeText(settings.code);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[var(--theme-bg)] text-[var(--theme-text)] transition-colors duration-200">
      
      {/* HEADER ROW */}
      <Header
        settings={settings}
        updateSettings={updateSettings}
        savedSnippets={savedSnippets}
        onSaveSnippet={handleSaveSnippet}
        onOpenSnippets={() => setIsSnippetsOpen(true)}
        onOpenBlog={() => setIsBlogOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        appTheme={appTheme}
        toggleAppTheme={handleToggleAppTheme}
        onCopyRaw={handleCopyRaw}
      />

      {/* MOBILE SWITCHER TABS (Visible under lg) */}
      <div className="flex lg:hidden shrink-0 border-b border-[var(--theme-border)] bg-[var(--theme-panel)] h-11 select-none z-10 font-bold text-xs">
        <button
          onClick={() => setActiveMobileTab('editor')}
          className={`flex-1 flex items-center justify-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
            activeMobileTab === 'editor'
              ? 'border-[var(--theme-accent)] text-[var(--theme-text)] bg-[var(--theme-surface)]'
              : 'border-transparent text-[var(--theme-text-tint)] hover:text-[var(--theme-text)]'
          }`}
        >
          <span>Editor</span>
        </button>
        <button
          onClick={() => setActiveMobileTab('settings')}
          className={`flex-1 flex items-center justify-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
            activeMobileTab === 'settings'
              ? 'border-[var(--theme-accent)] text-[var(--theme-text)] bg-[var(--theme-surface)]'
              : 'border-transparent text-[var(--theme-text-tint)] hover:text-[var(--theme-text)]'
          }`}
        >
          <span>Settings</span>
        </button>
        <button
          onClick={() => setActiveMobileTab('preview')}
          className={`flex-1 flex items-center justify-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
            activeMobileTab === 'preview'
              ? 'border-[var(--theme-accent)] text-[var(--theme-text)] bg-[var(--theme-surface)]'
              : 'border-transparent text-[var(--theme-text-tint)] hover:text-[var(--theme-text)]'
          }`}
        >
          <span>Preview Canvas</span>
        </button>
      </div>

      {/* MAIN CONTAINER FRAME */}
      <main className="flex-1 flex overflow-hidden min-h-[440px] relative select-none">
        
        {/* SIDEBAR VIEW: Config panels */}
        <div className={`shrink-0 h-full ${activeMobileTab === 'settings' ? 'flex flex-1 w-full' : 'hidden lg:flex'}`}>
          <Sidebar
            settings={settings}
            updateSettings={updateSettings}
            savedSnippets={savedSnippets}
            onLoadSnippet={handleLoadSnippet}
          />
        </div>

        {/* WORKSPACE AREA: Editor in middle */}
        <div className={`flex flex-1 h-full min-w-0 ${activeMobileTab === 'editor' ? 'flex' : 'hidden lg:flex'}`}>
          <EditorPanel
            settings={settings}
            updateSettings={updateSettings}
            onDetectLanguage={handleDetectLanguage}
            onFileUpload={handleFileUpload}
            onPasteWordFormatted={() => {}}
          />
        </div>

        {/* RENDER CANVAS AREA: Code preview */}
        <div className={`flex flex-col h-full shrink-0 ${activeMobileTab === 'preview' ? 'flex flex-1 w-full' : 'hidden lg:flex'}`}>
          <PreviewPanel
            settings={settings}
            updateSettings={updateSettings}
            onShowToast={showToast}
          />
        </div>
      </main>

      {/* MORE DETAILS DECAL SCROLL LINK (Anchor helper) */}
      <div className="h-10 border-t border-[var(--theme-border)] bg-[var(--theme-panel)] flex items-center justify-center text-[10.5px] font-bold text-[var(--theme-text-tint)] shrink-0 z-25 select-none hover:text-[var(--theme-text)] transition-colors">
        <a href="#more-below" className="flex items-center gap-1.5 cursor-pointer select-none">
          <span>Read FAQ, guides, and comparison metrics below</span>
          <ChevronRight className="w-4.5 h-4.5 rotate-90 text-[var(--theme-accent)] animate-bounce" />
        </a>
      </div>

      {/* INFORMATIONAL ARTICLES ROW (Scroll section beneath SPA) */}
      <InfoSection />

      {/* FOOTER ROW */}
      <footer className="bg-[var(--theme-panel)] border-t border-[var(--theme-border)] py-6 text-center select-none z-10 shrink-0 text-xs text-[var(--theme-text-tint)] tracking-wide">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            CodeHilite is built by{' '}
            <strong className="text-[var(--theme-text)] hover:text-[var(--theme-accent)] cursor-pointer" onClick={() => setIsAboutOpen(true)}>Anmol Dubey</strong>. All rights reserved © {new Date().getFullYear()}.
          </span>
          
          <div className="flex items-center gap-4 text-[var(--theme-text-tint)] font-semibold flex-wrap justify-center">
            <button onClick={() => setIsBlogOpen(true)} className="hover:text-[var(--theme-accent)] cursor-pointer">Blog Posts</button>
            <span>·</span>
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-[var(--theme-accent)] cursor-pointer">About Dev</button>
            <span>·</span>
            <button onClick={() => setIsContactOpen(true)} className="hover:text-[var(--theme-accent)] cursor-pointer">Support Form</button>
            <span>·</span>
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-[var(--theme-accent)] cursor-pointer">Privacy Policy</button>
            <span>·</span>
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-[var(--theme-accent)] cursor-pointer">Terms of Service</button>
          </div>
        </div>
      </footer>

      {/* ── MODALS CONTAINER ── */}
      <BlogModal isOpen={isBlogOpen} onClose={() => setIsBlogOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsOfServiceModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      
      <SavedSnippetsModal
        isOpen={isSnippetsOpen}
        onClose={() => setIsSnippetsOpen(false)}
        snippets={savedSnippets}
        onLoadSnippet={handleLoadSnippet}
        onDeleteSnippet={handleDeleteSnippet}
      />

      {/* ── TOAST CONTAINER ── */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4.5 py-3 rounded-2xl bg-[var(--theme-panel)] border border-[var(--theme-border)] shadow-xl shadow-black/30 pointer-events-none select-none transition-all duration-300 transform ${
          toast.show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}
      >
        {toast.isSuccess ? (
          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
        ) : (
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
        )}
        <span className="text-xs font-semibold text-[var(--theme-text)]">{toast.message}</span>
      </div>

    </div>
  );
}
