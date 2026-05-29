import React from 'react';
import { Settings, Type, Layout, Palette, Shield, Layers, HelpCircle, Code } from 'lucide-react';
import { BG_PRESETS, FONTS, THEMES, HIGHLIGHT_SHADOWS } from '../data';
import { ExportSettings, SavedSnippet } from '../types';

interface SidebarProps {
  settings: ExportSettings;
  updateSettings: (newSettings: Partial<ExportSettings>) => void;
  savedSnippets: SavedSnippet[];
  onLoadSnippet: (id: string) => void;
}

export default function Sidebar({
  settings,
  updateSettings,
  savedSnippets,
  onLoadSnippet,
}: SidebarProps) {
  const handlePresetSelect = (preset: typeof BG_PRESETS[0]) => {
    updateSettings({
      bgType: preset.type,
      bgColor1: preset.color1,
      bgColor2: preset.color2,
      bgDir: preset.dir,
      bgPreset: preset.value,
    });
  };

  const handleCustomBgChange = (field: 'bgColor1' | 'bgColor2' | 'bgType' | 'bgDir', value: string) => {
    const updated = { [field]: value };
    
    // Compute compiled preview background
    const bgType = field === 'bgType' ? value : settings.bgType;
    const bgColor1 = field === 'bgColor1' ? value : settings.bgColor1;
    const bgColor2 = field === 'bgColor2' ? value : settings.bgColor2;
    const bgDir = field === 'bgDir' ? value : settings.bgDir;

    const compiledBg = bgType === 'gradient'
      ? `linear-gradient(${bgDir}, ${bgColor1} 0%, ${bgColor2} 100%)`
      : bgColor1;

    updateSettings({
      ...updated,
      bgPreset: compiledBg,
    });
  };

  const handleShadowSelect = (shadowVal: string) => {
    const matched = HIGHLIGHT_SHADOWS.find((s) => s.css === shadowVal) || HIGHLIGHT_SHADOWS[0];
    updateSettings({
      shadowClass: matched.id,
      shadowValue: matched.css,
    });
  };

  return (
    <aside className="sidebar flex flex-col w-[300px] bg-[var(--theme-panel)] border-r border-[var(--theme-border)] h-full select-none shrink-0 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-6 p-6">
        {/* SECTION: Code Theme */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-widest text-[var(--theme-text-muted)] uppercase">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Appearance</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[var(--theme-text-muted)] block mb-1.5">Code Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => updateSettings({ theme: e.target.value })}
                className="w-full bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[var(--theme-text)] rounded-xl px-3 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer transition-all"
              >
                <optgroup label="── Modern Dark ──">
                  {THEMES.filter((t) => t.isDark).map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="── Crisp Light ──">
                  {THEMES.filter((t) => !t.isDark && t.value !== 'latex').map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="── Special Print ──">
                  <option value="latex">LaTeX Print style (B&amp;W)</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        <div className="h-px bg-[var(--theme-border)]" />

        {/* SECTION: Typography */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-widest text-[var(--theme-text-muted)] uppercase">
            <Type className="w-3.5 h-3.5 text-indigo-500" />
            <span>Typography</span>
          </div>

          <div className="space-y-3">
            {/* Font Family */}
            <div>
              <label className="text-xs font-semibold text-[var(--theme-text-muted)] block mb-1.5">Font Family</label>
              <select
                value={settings.fontFamily}
                onChange={(e) => updateSettings({ fontFamily: e.target.value })}
                className="w-full bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[var(--theme-text)] rounded-xl px-3 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer transition-all"
              >
                {FONTS.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--theme-text-muted)] mb-1">
                <span>Font Size</span>
                <span className="font-mono text-[10px] bg-[var(--theme-surface)] px-1.5 py-0.5 rounded border border-[var(--theme-border)] text-[var(--theme-text)]">
                  {settings.fontSize}px
                </span>
              </div>
              <input
                type="range"
                min="11"
                max="22"
                step="1"
                value={settings.fontSize}
                onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value, 10) })}
                className="w-full h-1 bg-[var(--theme-surface-hover)] rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Line Height */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--theme-text-muted)] mb-1">
                <span>Line Height</span>
                <span className="font-mono text-[10px] bg-[var(--theme-surface)] px-1.5 py-0.5 rounded border border-[var(--theme-border)] text-[var(--theme-text)]">
                  {settings.lineHeight.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="1.2"
                max="2.3"
                step="0.05"
                value={settings.lineHeight}
                onChange={(e) => updateSettings({ lineHeight: parseFloat(e.target.value) })}
                className="w-full h-1 bg-[var(--theme-surface-hover)] rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Letter Spacing */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--theme-text-muted)] mb-1">
                <span>Letter Spacing</span>
                <span className="font-mono text-[10px] bg-[var(--theme-surface)] px-1.5 py-0.5 rounded border border-[var(--theme-border)] text-[var(--theme-text)]">
                  {settings.letterSpacing.toFixed(2)}em
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.10"
                step="0.01"
                value={settings.letterSpacing}
                onChange={(e) => updateSettings({ letterSpacing: parseFloat(e.target.value) })}
                className="w-full h-1 bg-[var(--theme-surface-hover)] rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="h-px bg-[var(--theme-border)]" />

        {/* SECTION: Layout */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-widest text-[var(--theme-text-muted)] uppercase">
            <Layout className="w-3.5 h-3.5 text-indigo-500" />
            <span>Layout Controls</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Inner Padding */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--theme-text-muted)] mb-1">
                <span>Workspace Padding</span>
                <span className="font-mono text-[10px] bg-[var(--theme-surface)] px-1.5 py-0.5 rounded border border-[var(--theme-border)] text-[var(--theme-text)]">
                  {settings.padding}px
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="56"
                step="2"
                value={settings.padding}
                onChange={(e) => updateSettings({ padding: parseInt(e.target.value, 10) })}
                className="w-full h-1 bg-[var(--theme-surface-hover)] rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Card width */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--theme-text-muted)] mb-1">
                <span>Card Width</span>
                <span className="font-mono text-[10px] bg-[var(--theme-surface)] px-1.5 py-0.5 rounded border border-[var(--theme-border)] text-[var(--theme-text)]">
                  {settings.cardWidth}px
                </span>
              </div>
              <input
                type="range"
                min="320"
                max="1400"
                step="10"
                value={settings.cardWidth}
                onChange={(e) => updateSettings({ cardWidth: parseInt(e.target.value, 10) })}
                className="w-full h-1 bg-[var(--theme-surface-hover)] rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Toggle Rows */}
            <div className="space-y-2 mt-1 select-none">
              {/* Show line numbers */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="font-semibold text-[var(--theme-text-muted)] group-hover:text-[var(--theme-text)] transition-colors">Show line numbers</span>
                <input
                  type="checkbox"
                  checked={settings.showLineNums}
                  onChange={(e) => updateSettings({ showLineNums: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-500 border-[var(--theme-border)] focus:ring-indigo-500/50"
                />
              </label>

              {/* Word wrap */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="font-semibold text-[var(--theme-text-muted)] group-hover:text-[var(--theme-text)] transition-colors">Word Wrap</span>
                <input
                  type="checkbox"
                  checked={settings.wordWrap}
                  onChange={(e) => updateSettings({ wordWrap: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-500 border-[var(--theme-border)] focus:ring-indigo-500/50"
                />
              </label>

              {/* Show lang badge */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="font-semibold text-[var(--theme-text-muted)] group-hover:text-[var(--theme-text)] transition-colors">Display language badge</span>
                <input
                  type="checkbox"
                  checked={settings.showLangBadge}
                  onChange={(e) => updateSettings({ showLangBadge: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-500 border-[var(--theme-border)] focus:ring-indigo-500/50"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="h-px bg-[var(--theme-border)]" />

        {/* SECTION: Canvas Background */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-widest text-[var(--theme-text-muted)] uppercase">
            <Palette className="w-3.5 h-3.5 text-indigo-500" />
            <span>Companion Canvas</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Grid Presets */}
            <div>
              <span className="text-xs font-semibold text-[var(--theme-text-muted)] block mb-1.5">Preset Backdrops</span>
              <div className="grid grid-cols-5 gap-1.5">
                {BG_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset)}
                    className={`aspect-square rounded-lg cursor-pointer border-2 transition-transform hover:scale-105 ${
                      settings.bgPreset === preset.value
                        ? 'border-indigo-500 shadow-md shadow-indigo-500/10'
                        : 'border-transparent'
                    }`}
                    style={{
                      background: preset.id === 'transparent-check'
                        ? 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0/10px 10px'
                        : preset.value,
                    }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>

            {/* Custom Background Mixer */}
            <div className="space-y-2 p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)]">
              <span className="font-bold text-[10px] text-[var(--theme-text-tint)] block uppercase tracking-wider">Custom Backdrop Mixer</span>
              <div className="flex items-center gap-2">
                <select
                  value={settings.bgType}
                  onChange={(e) => handleCustomBgChange('bgType', e.target.value)}
                  className="flex-1 bg-[var(--theme-panel)] border border-[var(--theme-border)] text-[var(--theme-text)] rounded-xl px-2.5 py-1.5 outline-none text-xs font-semibold focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="solid">Solid Tone</option>
                  <option value="gradient">Gradient Flow</option>
                </select>

                <input
                  type="color"
                  value={settings.bgColor1}
                  onChange={(e) => handleCustomBgChange('bgColor1', e.target.value)}
                  className="w-7 h-7 shrink-0 rounded-lg cursor-pointer border border-[var(--theme-border)]"
                />

                {settings.bgType === 'gradient' && (
                  <input
                    type="color"
                    value={settings.bgColor2}
                    onChange={(e) => handleCustomBgChange('bgColor2', e.target.value)}
                    className="w-7 h-7 shrink-0 rounded-lg cursor-pointer border border-[var(--theme-border)] animate-fade-in"
                  />
                )}
              </div>

              {settings.bgType === 'gradient' && (
                <div className="flex items-center justify-between text-xs font-medium text-[var(--theme-text-muted)] transition-all">
                  <span>Gradient Direction</span>
                  <select
                    value={settings.bgDir}
                    onChange={(e) => handleCustomBgChange('bgDir', e.target.value)}
                    className="bg-[var(--theme-panel)] border border-[var(--theme-border)] text-[var(--theme-text)] rounded-md px-1.5 py-0.5 outline-none font-mono text-[10px]"
                  >
                    <option value="135deg">Diagonal ↘</option>
                    <option value="45deg">Diagonal ↗</option>
                    <option value="0deg">Horizontal →</option>
                    <option value="90deg">Vertical ↓</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-px bg-[var(--theme-border)]" />

        {/* SECTION: Shadows & Borders */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-widest text-[var(--theme-text-muted)] uppercase">
            <Shield className="w-3.5 h-3.5 text-indigo-500" />
            <span>Borders &amp; Shadows</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Corner Radius */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--theme-text-muted)] mb-1">
                <span>Corner Rounding</span>
                <span className="font-mono text-[10px] bg-[var(--theme-surface)] px-1.5 py-0.5 rounded border border-[var(--theme-border)] text-[var(--theme-text)]">
                  {settings.borderRadius}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="28"
                step="2"
                value={settings.borderRadius}
                onChange={(e) => updateSettings({ borderRadius: parseInt(e.target.value, 10) })}
                className="w-full h-1 bg-[var(--theme-surface-hover)] rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* CodeCard Shadows */}
            <div>
              <span className="text-xs font-semibold text-[var(--theme-text-muted)] block mb-1.5">Drop Shadow weight</span>
              <div className="flex gap-1.5">
                {HIGHLIGHT_SHADOWS.map((sh) => (
                  <button
                    key={sh.id}
                    onClick={() => handleShadowSelect(sh.css)}
                    className={`flex-1 text-[10px] font-bold py-2 rounded-xl border transition-all cursor-pointer ${
                      settings.shadowClass === sh.id
                        ? 'bg-indigo-600 text-white border-transparent shadow shadow-indigo-500/20'
                        : 'bg-[var(--theme-surface)] border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:bg-[var(--theme-surface-hover)] hover:border-indigo-500/30'
                    }`}
                  >
                    {sh.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-[var(--theme-border)]" />

        {/* SECTION: Highlight Lines */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-widest text-[var(--theme-text-muted)] uppercase">
            <Settings className="w-3.5 h-3.5 text-indigo-500" />
            <span>Highlight Lines</span>
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="e.g. 1, 3, 5-8"
              value={settings.hlLines}
              onChange={(e) => updateSettings({ hlLines: e.target.value })}
              className="w-full bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[var(--theme-text)] rounded-xl px-3.5 py-2.5 text-xs font-mono font-medium outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-[var(--theme-text-tint)]"
            />
            <p className="text-[10px] text-[var(--theme-text-tint)] leading-relaxed">
              Accepts comma-separated ranges of lines to focus attention.
            </p>
          </div>
        </div>

        {/* SECTION: Session Quick Access */}
        {savedSnippets.length > 0 && (
          <>
            <div className="h-px bg-[var(--theme-border)]" />
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-widest text-[var(--theme-text-muted)] uppercase">
                <Code className="w-3.5 h-3.5 text-indigo-500" />
                <span>Quick Access</span>
              </div>
              <div className="space-y-2">
                {savedSnippets.slice(0, 4).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onLoadSnippet(s.id)}
                    className="w-full text-left p-3 bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] rounded-xl truncate text-xs font-semibold text-[var(--theme-text)] block hover:border-indigo-500/40 transition-all cursor-pointer hover:shadow-sm"
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
