import React, { useRef, useState, useEffect } from 'react';
import hljs from 'highlight.js';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import { Image, FileCode, Check, Download, ZoomIn, Copy } from 'lucide-react';
import { ExportSettings } from '../types';
import { parseHlLines } from '../data';

interface PreviewPanelProps {
  settings: ExportSettings;
  updateSettings: (newSettings: Partial<ExportSettings>) => void;
  onShowToast: (msg: string, isSuccess?: boolean) => void;
}

export default function PreviewPanel({
  settings,
  updateSettings,
  onShowToast,
}: PreviewPanelProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(100);
  const [renderedHtml, setRenderedHtml] = useState('');
  const [detectedExt, setDetectedExt] = useState('js');
  const [exporting, setExporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Run highlight.js highlight on code changes
  useEffect(() => {
    if (!settings.code) {
      setRenderedHtml('');
      return;
    }

    let result;
    if (settings.lang === 'auto') {
      try {
        result = hljs.highlightAuto(settings.code);
      } catch (_) {
        result = { value: escapeHtml(settings.code), language: 'text' };
      }
    } else {
      try {
        result = hljs.highlight(settings.code, { language: settings.lang });
      } catch (_) {
        try {
          result = hljs.highlightAuto(settings.code);
        } catch (_) {
          result = { value: escapeHtml(settings.code), language: 'text' };
        }
      }
    }

    const matchedLang = result.language || 'text';
    setRenderedHtml(result.value);

    // Track extension
    const extMap: Record<string, string> = {
      javascript: 'js', typescript: 'ts', python: 'py', java: 'java', cpp: 'cpp',
      c: 'c', csharp: 'cs', go: 'go', rust: 'rs', ruby: 'rb', php: 'php', swift: 'swift',
      kotlin: 'kt', html: 'html', css: 'css', scss: 'scss', sql: 'sql', bash: 'sh',
      json: 'json', yaml: 'yml', xml: 'xml', markdown: 'md', r: 'r', lua: 'lua', dart: 'dart'
    };
    setDetectedExt(extMap[matchedLang] || matchedLang || 'txt');
  }, [settings.code, settings.lang]);

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Parsing line numbers and code highlights
  const lines = renderedHtml ? renderedHtml.split('\n') : [''];
  const highlightRanges = parseHlLines(settings.hlLines);

  // Print & Academic themes check
  const isPrintTheme = ['latex', 'academic-pure', 'modern-journal'].includes(settings.theme);

  const getThemeClass = () => {
    if (settings.theme === 'latex') return 'latex-theme';
    if (settings.theme === 'academic-pure') return 'academic-pure-theme';
    if (settings.theme === 'modern-journal') return 'modern-journal-theme';
    return '';
  };

  const getPaperBg = () => {
    if (settings.theme === 'modern-journal') return '#fdfaf4';
    if (isPrintTheme) return '#ffffff';
    return settings.bgPreset;
  };

  // Export as Image
  const handleExportImage = async (format: 'png' | 'jpeg') => {
    if (!cardRef.current) return;
    setExporting(true);
    onShowToast(`Rendering high-DPI ${format.toUpperCase()} screenshot...`, true);

    try {
      // Small pause to let thread breathe
      await new Promise((r) => setTimeout(r, 100));
      
      const config = {
        pixelRatio: 2.5,
        backgroundColor: undefined, // Let background bleed naturally
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          margin: '0px',
        }
      };

      let dataUrl = '';
      if (format === 'png') {
        dataUrl = await htmlToImage.toPng(cardRef.current, config);
      } else {
        dataUrl = await htmlToImage.toJpeg(cardRef.current, { ...config, quality: 0.95 });
      }

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${settings.title || 'snippet'}.${format}`;
      a.click();
      
      onShowToast(`Downloaded ${format.toUpperCase()} successfully!`, true);
    } catch (err: any) {
      console.error(err);
      onShowToast(`Export and capture failed: ${err.message || err}`, false);
    } finally {
      setExporting(false);
    }
  };

  // Export as Vector print PDF
  const handleExportPDF = async () => {
    if (!cardRef.current) return;
    setExporting(true);
    onShowToast('Synthesizing PDF document...', true);

    try {
      await new Promise((r) => setTimeout(r, 100));
      
      const width = cardRef.current.offsetWidth;
      const height = cardRef.current.offsetHeight;

      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        pixelRatio: 2.2,
        style: {
          transform: 'scale(1)',
          margin: '0px',
        }
      });

      const pdf = new jsPDF({
        orientation: width > height ? 'l' : 'p',
        unit: 'px',
        format: [width, height],
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
      pdf.save(`${settings.title || 'snippet'}.pdf`);
      onShowToast('Downloaded vector PDF successfully!', true);
    } catch (err: any) {
      console.error(err);
      onShowToast(`PDF assembly failed: ${err.message}`, false);
    } finally {
      setExporting(false);
    }
  };

  // Export standalone HTML
  const handleExportHTML = () => {
    try {
      const inlineStyle = ''; // Fallback, styles pulled over unpkg in output head
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${settings.title} | CodeHilite</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${isPrintTheme ? 'default' : settings.theme}.min.css">
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Outfit&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0; padding: 40px; display: flex; align-items: center; justify-content: center;
      background: ${isPrintTheme ? getPaperBg() : settings.bgPreset}; min-height: 100vh;
      font-family: 'Outfit', sans-serif;
    }
    .card {
      width: ${settings.cardWidth}px; border-radius: ${isPrintTheme ? '0px' : `${settings.borderRadius}px`};
      overflow: hidden; box-shadow: ${isPrintTheme ? 'none' : settings.shadowValue};
      background: ${isPrintTheme ? getPaperBg() : settings.bgPreset}; display: inline-block;
      border: ${settings.theme === 'latex' ? '1px solid #000' : settings.theme === 'academic-pure' ? '1.5px solid #111' : settings.theme === 'modern-journal' ? '1.5px solid #6b4d3a' : 'none'};
    }
    .body { display: flex; flex-direction: column; padding: ${settings.padding}px 0; }
    .line-row { display: flex; align-items: start; padding: 0 ${settings.padding}px; min-height: 1.5em; }
    .nums {
      width: 32px; text-align: right; padding-right: 16px; opacity: 0.35; user-select: none;
      font-family: ${settings.fontFamily}; font-size: ${settings.fontSize}px; line-height: ${settings.lineHeight};
      shrink-0: true;
    }
    .code-cell {
      flex: 1; font-family: ${settings.fontFamily}; font-size: ${settings.fontSize}px;
      line-height: ${settings.lineHeight}; letter-spacing: ${settings.letterSpacing}em;
      white-space: ${settings.wordWrap ? 'pre-wrap' : 'pre'};
      word-break: ${settings.wordWrap ? 'break-word' : 'normal'};
    }
    /* Simple themes inline mock for export preview */
    .latex-theme .hljs-keyword { color: #0000cc; font-weight: bold; }
    .latex-theme .hljs-comment { color: #7f7f7f; font-style: italic; }
    .latex-theme .hljs-string { color: #a62a2a; }
    .academic-pure-theme .hljs-keyword { color: #000; font-weight: bold; }
    .academic-pure-theme .hljs-comment { color: #666; font-style: italic; }
    .modern-journal-theme .hljs-keyword { color: #9c27b0; font-weight: bold; }
    .modern-journal-theme .hljs-comment { color: #795548; font-style: italic; }
    .modern-journal-theme .hljs-string { color: #2e7d32; }
  </style>
</head>
<body>
  <div class="card ${getThemeClass()}">
    <div class="body">
      ${lines.map((lineHtml, i) => {
        const lineNum = i + 1;
        const lineCell = settings.showLineNums ? `<div class="nums">${lineNum}</div>` : '';
        return `<div class="line-row">${lineCell}<div class="code-cell hljs">${lineHtml || '&#8203;'}</div></div>`;
      }).join('\n')}
    </div>
  </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${settings.title || 'snippet'}.html`;
      a.click();
      URL.revokeObjectURL(url);
      onShowToast('Standalone HTML snippet downloaded!', true);
    } catch (_) {
      onShowToast('Export to HTML failed', false);
    }
  };

  // Export raw txt code
  const handleExportTXT = () => {
    try {
      const blob = new Blob([settings.code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${settings.title || 'snippet'}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      onShowToast('Plain code file downloaded!', true);
    } catch (_) {
      onShowToast('Export to plain text failed', false);
    }
  };

  // Copy with rich HTML formatting to clipboard for clipboard-rich pastes (e.g., Word, Google Docs)
  // Utilizes a borderless, nested tabular structure which isolates line numbers so word wraps do not misalign 
  const handleCopyFormatted = async () => {
    try {
      const tableRows = lines.map((lineHtml, i) => {
        const lineNum = i + 1;
        const isHl = highlightRanges.includes(lineNum);
        const bgVal = isHl ? 'background-color:rgba(123,110,246,0.12);' : '';
        const rowStyle = bgVal ? `style="${bgVal}"` : '';
        
        const lineCell = settings.showLineNums 
          ? `<td style="vertical-align:top;text-align:right;padding-right:16px;user-select:none;color:#858585;font-size:${settings.fontSize}px;line-height:${settings.lineHeight};font-family:${settings.fontFamily};font-weight:normal;opacity:0.65;width:30px;min-width:24px;white-space:nowrap;border:none;">${lineNum}</td>`
          : '';
          
        const codeCell = `<td style="vertical-align:top;text-align:left;font-size:${settings.fontSize}px;line-height:${settings.lineHeight};letter-spacing:${settings.letterSpacing}em;font-family:${settings.fontFamily};white-space:${settings.wordWrap ? 'pre-wrap' : 'pre'};word-break:${settings.wordWrap ? 'break-word' : 'normal'};border:none;">${lineHtml || '&#8203;'}</td>`;
        
        return `<tr ${rowStyle}>${lineCell}${codeCell}</tr>`;
      }).join('');

      const richHtml = `<html><head><meta charset="UTF-8"></head><body><table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;font-family:${settings.fontFamily};border:none;">${tableRows}</table></body></html>`;

      const htmlBlob = new Blob([richHtml], { type: 'text/html' });
      const textBlob = new Blob([settings.code], { type: 'text/plain' });
      
      const item = new ClipboardItem({
        'text/html': htmlBlob,
        'text/plain': textBlob,
      });

      await navigator.clipboard.write([item]);
      setIsCopied(true);
      onShowToast('Rich HTML copied! Ready to paste beautifully into Word/Docs.', true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      // Fallback
      navigator.clipboard.writeText(settings.code);
      onShowToast('Copied raw code text as fallback.', true);
    }
  };

  return (
    <section className="preview-panel flex flex-col flex-1 lg:max-w-[500px] bg-[var(--theme-bg)] h-full overflow-hidden shrink-0 z-10 transition-colors">
      {/* Export Toolbar */}
      <div className="flex items-center h-12 border-b border-[var(--theme-border)] bg-[var(--theme-panel)] px-4 select-none shrink-0 overflow-x-auto no-scrollbar gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 mr-2 shrink-0">
          <Image className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[9.5px] font-mono uppercase tracking-widest text-indigo-400 font-bold">Studio Canvas</span>
        </div>

        {/* Zoom adjustment details */}
        <div className="flex items-center gap-1.5 shrink-0 ml-1">
          <ZoomIn className="w-3.5 h-3.5 text-[var(--theme-text-muted)]" />
          <input
            type="range"
            min="50"
            max="150"
            step="5"
            value={zoom}
            onChange={(e) => setZoom(parseInt(e.target.value, 10))}
            className="w-16 h-1 bg-[var(--theme-surface-hover)] rounded-lg appearance-none cursor-pointer accent-indigo-500"
            title="Adjust visual scale"
          />
          <span className="font-mono text-[9px] text-[var(--theme-text-tint)] min-w-[28px] tabular-nums">
            {zoom}%
          </span>
        </div>

        <div className="flex-1" />

        {/* Action button groupings */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleCopyFormatted}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-[11px] font-bold text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-hover)] hover:border-indigo-500/40 border border-[var(--theme-border)] cursor-pointer tracking-wide shadow-sm transition-all"
            title="Copy formatting to load easily inside word or docs pages"
          >
            {isCopied ? <Check className="w-3" /> : <Copy className="w-3 h-3 text-indigo-400" />}
            <span>{isCopied ? 'Formatted!' : 'Rich Copy'}</span>
          </button>

          <button
            onClick={() => handleExportImage('png')}
            disabled={exporting}
            className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer disabled:opacity-50 shadow-md shadow-indigo-600/15 active:scale-95 transition-all"
          >
            <Download className="w-3 h-3" />
            <span>PNG</span>
          </button>

          <div className="relative group shrink-0">
            <button className="flex items-center py-1.5 px-2.5 rounded-xl text-[11px] font-bold text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] bg-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-indigo-500/40 hover:bg-[var(--theme-surface-hover)] cursor-pointer text-center shadow-sm">
              •••
            </button>
            
            {/* Context Dropdown menu for additional formats */}
            <div className="absolute right-0 top-full mt-2 min-w-[130px] rounded-xl border border-[var(--theme-border)] bg-[var(--theme-panel)] p-1.5 shadow-xl shadow-black/30 pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 transition-all z-40">
              <button
                onClick={() => handleExportImage('jpeg')}
                className="w-full text-left rounded-lg px-2.5 py-2 text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-hover)] font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                JPEG compressed
              </button>
              <button
                onClick={handleExportPDF}
                className="w-full text-left rounded-lg px-2.5 py-2 text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-hover)] font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                PDF Vector Print
              </button>
              <button
                onClick={handleExportHTML}
                className="w-full text-left rounded-lg px-2.5 py-2 text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-hover)] font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                Web HTML block
              </button>
              <button
                onClick={handleExportTXT}
                className="w-full text-left rounded-lg px-2.5 py-2 text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-hover)] font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                Plain TXT file
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rendering Board Frame */}
      <div className="flex-1 overflow-auto flex items-start justify-center p-6 @container relative bg-grid-pattern transition-all justify-start sm:justify-center">
        <div className="max-w-full pb-10 flex items-start justify-center min-w-full sm:min-w-0">
          {/* Main Screenshot card */}
          <div
            ref={cardRef}
            id="code-card"
            className={`shadow-2xl select-text h-fit overflow-hidden self-start origin-top ${getThemeClass()}`}
            style={{
              width: `${settings.cardWidth}px`,
              borderRadius: isPrintTheme ? '0px' : `${settings.borderRadius}px`,
              boxShadow: isPrintTheme ? 'none' : settings.shadowValue,
              background: getPaperBg(),
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
            }}
          >
            {/* MAC DOTS TITLE BAR (Hidden if LaTeX mode) */}
            {!isPrintTheme && (
              <div className="card-titlebar flex items-center gap-2 px-4 py-3 border-b border-black/5 bg-black/[0.04] backdrop-blur-md select-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                
                {/* Filename & custom extension matching background details */}
                <span className="card-filename text-xs text-[var(--theme-text-muted)] ml-3 font-semibold font-sans tracking-wide truncate max-w-[150px]">
                  {settings.title ? `${settings.title}.${detectedExt}` : `snippet.${detectedExt}`}
                </span>

                {/* Optional language tag */}
                {settings.showLangBadge && (
                  <span className="card-lang-badge ml-auto text-[9px] uppercase font-bold tracking-widest font-mono text-[var(--theme-text-tint)] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                    {detectedExt}
                  </span>
                )}
              </div>
            )}

            {/* CARD MAIN WORKSPACE CONTAINER */}
            <div
              className={`card-body flex flex-col min-w-0 font-mono w-full`}
              style={{
                paddingTop: `${settings.padding}px`,
                paddingBottom: `${settings.padding}px`,
              }}
            >
              <pre className="m-0 overflow-visible select-text p-0 w-full animate-fade-in">
                <code
                  className="hljs select-text flex flex-col overflow-visible bg-transparent font-medium w-full"
                  style={{
                    fontFamily: settings.fontFamily,
                    fontSize: `${settings.fontSize}px`,
                    lineHeight: settings.lineHeight,
                    letterSpacing: `${settings.letterSpacing}em`,
                    whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre',
                    padding: 0,
                  }}
                >
                  {lines.map((lineHtml, i) => {
                    const lineNum = i + 1;
                    const isLineHl = highlightRanges.includes(lineNum);
                    return (
                      <div
                        key={i}
                        className={`flex items-start w-full select-text transition-colors ${
                          isLineHl ? 'code-line-hl' : 'hover:bg-white/[0.01]'
                        }`}
                        style={{
                          minHeight: '1.5em',
                          paddingLeft: isLineHl 
                            ? `${Math.max(0, settings.padding - 3)}px` 
                            : `${settings.padding}px`,
                          paddingRight: `${settings.padding}px`,
                        }}
                      >
                        {settings.showLineNums && (
                          <span
                            className="opacity-35 select-none font-medium text-right pr-4 shrink-0"
                            style={{
                              width: '32px',
                              fontFamily: settings.fontFamily,
                              fontSize: `${settings.fontSize}px`,
                              lineHeight: settings.lineHeight,
                            }}
                          >
                            {lineNum}
                          </span>
                        )}
                        <span
                          className="flex-1 select-text overflow-hidden"
                          style={{
                            fontFamily: settings.fontFamily,
                            fontSize: `${settings.fontSize}px`,
                            lineHeight: settings.lineHeight,
                            whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre',
                            wordBreak: settings.wordWrap ? 'break-word' : 'normal',
                          }}
                          dangerouslySetInnerHTML={{ __html: lineHtml || '&#8203;' }}
                        />
                      </div>
                    );
                  })}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
