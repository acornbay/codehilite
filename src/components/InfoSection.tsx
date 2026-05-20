import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, X, Shield, Lock, FileText, Code2, Users, FileUp, Sparkles, BookOpen } from 'lucide-react';

export default function InfoSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const steps = [
    {
      num: '01',
      icon: <Code2 className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Paste raw source code',
      desc: 'Insert or type your code, or drag and drop a source file directly. Syntax language is resolved automatically from code structure or file extensions.'
    },
    {
      num: '02',
      icon: <Sparkles className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Personalise settings',
      desc: 'Cycle through 16+ themes, adjust fonts, sliders for width, letter spacing, radius, padding, or set custom background solid/gradient configurations.'
    },
    {
      num: '03',
      icon: <BookOpen className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Highlight key ranges',
      desc: 'Highlight critical statements by listing ranges in the inputs. The canvas automatically adds a distinct focused backdrop to focus user attention.'
    },
    {
      num: '04',
      icon: <FileUp className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Export any output',
      desc: 'Download high-definition PNGs/JPEGs, PDF vector print documents, clean standalone HTML containing full inline assets, or copy styled rich text directly.'
    }
  ];

  const features = [
    {
      icon: <TerminalIcon />,
      title: '30+ Languages Supported',
      desc: 'Auto-detection handles Javascript, TypeScript, Python, Rust, Go, SQL, Bash, HTML/CSS, Dart, Swift, Kotlin, Docker, and standard markup languages.'
    },
    {
      icon: <PaletteIcon />,
      title: '16+ Visual Themes',
      desc: 'Cover modern dark patterns (Atom One Dark, Dracula, Night Owl, Tokyo Night) and pristine monochrome light setups (GitHub Light, Xcode, VS).'
    },
    {
      icon: <SettingsIcon />,
      title: 'Surgical Layout Control',
      desc: 'Tweak corner roundings, drop shadows, code inner padding, card frame sizes, custom fonts, letter spacing, line height, and line numbering.'
    },
    {
      icon: <HighlightIcon />,
      title: 'Focus Line Highlights',
      desc: 'Highlight target statements easily by writing range tags (e.g., 2, 4-7, 9) to overlay colored guidelines — ideal for reviews or presentations.'
    },
    {
      icon: <UploadIcon />,
      title: 'Drag and Drop File Uploads',
      desc: "Instantly parse any file dropped onto the editor. Sets title, detects language extension and formats spacing faster than manual copies."
    },
    {
      icon: <DatabaseIcon />,
      title: 'Persistent Session Library',
      desc: 'Save named snippet configurations directly inside local session storage to easily toggle, swap, and maintain card styles across series.'
    },
    {
      icon: <ClipboardIcon />,
      title: 'Rich Word/Doc Formatting',
      desc: 'Rich Text clipboard engine copies code snippets as fully styled HTML, maintaining mono fonts and syntax layouts when pasting into Google Docs or Word.'
    },
    {
      icon: <PrivacyIcon />,
      title: '100% Secure & Client-Side',
      desc: 'Operates entirely inside your browser sandbox. Code never reaches remote connections — guaranteeing privacy and compliance for protected code.'
    },
    {
      icon: <FreeIcon />,
      title: 'Completely Free, No Watermark',
      desc: 'All features, options, and rendering capacities are fully open. No subscriptions, limitations, advertisements, or logo watermarks.'
    }
  ];

  const faqs = [
    {
      q: 'Does CodeHilite send my protected or raw code to an external server?',
      a: 'Absolutely not. CodeHilite has no analytics or API backends tracking raw files. Compilation, syntax parsing via highlight.js, formatting, and image/vector creation are computed entirely in your browser. Rest assured, your file inputs never touch any external network.'
    },
    {
      q: 'Which format is recommended for general dev-auditing or social posts?',
      a: 'PNG is ideal for socials (Twitter/X, LinkedIn, blogs) because it preserves high-contrast details with transparency support. Choose vector PDF if you require standard print documents or Client Proposals, as it prints neatly without pixelation.'
    },
    {
      q: 'How does line highlighting function in compilation?',
      a: 'Under the Settings sidebar, type specific line ranges inside the "Highlight Lines" input. Double-check line references, then write comma-separated elements: for instance, "2, 4-6, 11" adds distinct backdrop overlays to line 2, lines 4 through 6, and line 11.'
    },
    {
      q: 'What is the utility of "Rich Copy / Copy Formatted"?',
      a: 'When pasting standard plain text into Google Docs or Microsoft Word, IDE colors and mono offsets are lost. Rich Copy registers a dynamic styled CSS/HTML bundle to your clipboard, letting document packages parse lines beautifully with all visual details.'
    },
    {
      q: 'Can CodeHilite operate in complete offline environments?',
      a: 'Yes! After loading CodeHilite the first time, your browser packs and caches scripts locally. This allows you to generate screenshots or copy formatting during long offline flights or remote commutes without active internet connections.'
    }
  ];

  return (
    <div className="content-section bg-[var(--theme-bg)] transition-colors select-none mt-1" id="more-below">
      
      {/* SECTION: How it works */}
      <section className="how-section py-16 sm:py-20 border-t border-[var(--theme-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[var(--theme-accent)] tracking-widest uppercase bg-[var(--theme-accent)]/10 px-2.5 py-1 rounded-full mb-3">
              <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
              <span>Step-by-Step Overview</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--theme-text)] mb-3">
              Code to graphics in seconds
            </h2>
            <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
              Simplify sharing programming ideas. Paste your source, adjust visually appealing backdrops, and export sharp developer designs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group p-5 rounded-2xl bg-[var(--theme-panel)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/40 transition-all duration-300 shadow hover:shadow-lg hover:shadow-[var(--theme-accent)]/[0.04]"
              >
                <div className="flex items-center justify-between font-mono mb-4 text-xs">
                  <span className="text-[var(--theme-text-tint)] font-bold">{step.num}</span>
                  <span className="p-2 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--theme-text)] mb-1.5">{step.title}</h3>
                <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Features */}
      <section className="features-section py-16 sm:py-20 bg-[var(--theme-panel)] border-t border-[var(--theme-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-[var(--theme-accent)] tracking-widest uppercase bg-[var(--theme-accent)]/10 px-2.5 py-1 rounded-full mb-3">
              <Users className="w-3 h-3 text-[var(--theme-accent)]" />
              <span>Full Toolkit capabilities</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--theme-text)] mb-3">
              Everything built for dev sharing
            </h2>
            <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
              Every utility, slider, and format option in CodeHilite exists to enhance screenshot sharpness and minimize repetitive setups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/30 transition-all duration-300 hover:shadow shadow-[var(--theme-accent)]/[0.02]"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/20 mb-3.5">
                  {feat.icon}
                </div>
                <h3 className="text-sm font-bold text-[var(--theme-text)] mb-1.5">{feat.title}</h3>
                <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Comparison Table */}
      <section className="compare-section py-16 sm:py-20 border-t border-[var(--theme-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-[var(--theme-accent)] tracking-widest uppercase bg-[var(--theme-accent)]/10 px-2.5 py-1 rounded-full mb-3">
              <Lock className="w-3 h-3 text-[var(--theme-accent)]" />
              <span>Unbiased Benchmarks</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--theme-text)] mb-3">
              How CodeHilite compares
            </h2>
            <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
              A comprehensive feature matrix testing capabilities against standard online screenshot apps.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--theme-border)] bg-[var(--theme-panel)] shadow-md">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[var(--theme-surface)] border-b border-[var(--theme-border)] text-[var(--theme-text-tint)] font-bold tracking-wider uppercase text-[10px] select-none">
                  <th className="p-4">Key Specification</th>
                  <th className="p-4 text-[var(--theme-accent)] bg-[var(--theme-accent)]/5">CodeHilite</th>
                  <th className="p-4">Carbon</th>
                  <th className="p-4">Ray.so</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--theme-border)] font-medium text-[var(--theme-text-muted)]">
                <tr className="hover:bg-[var(--theme-surface)]/50 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-[var(--theme-text)]">High-DPI PNG Output</td>
                  <td className="p-3.5 bg-[var(--theme-accent)]/5 text-emerald-500 font-bold">✓ (Sharp scaling)</td>
                  <td className="p-3.5 text-emerald-500">✓</td>
                  <td className="p-3.5 text-emerald-500">✓</td>
                </tr>
                <tr className="hover:bg-[var(--theme-surface)]/50 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-[var(--theme-text)]">Vector PDF Printing</td>
                  <td className="p-3.5 bg-[var(--theme-accent)]/5 text-emerald-500 font-bold">✓ (Included)</td>
                  <td className="p-3.5 text-red-400">✗</td>
                  <td className="p-3.5 text-red-400">✗</td>
                </tr>
                <tr className="hover:bg-[var(--theme-surface)]/50 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-[var(--theme-text)]">Standalone HTML Exporter</td>
                  <td className="p-3.5 bg-[var(--theme-accent)]/5 text-emerald-500 font-bold">✓ (Copy/Select)</td>
                  <td className="p-3.5 text-red-400">✗</td>
                  <td className="p-3.5 text-red-400">✗</td>
                </tr>
                <tr className="hover:bg-[var(--theme-surface)]/50 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-[var(--theme-text)]">Live Line Focusing</td>
                  <td className="p-3.5 bg-[var(--theme-accent)]/5 text-emerald-500 font-bold">✓ (Highlight ranges)</td>
                  <td className="p-3.5 text-red-400">✗</td>
                  <td className="p-3.5 text-red-400">✗</td>
                </tr>
                <tr className="hover:bg-[var(--theme-surface)]/50 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-[var(--theme-text)]">Rich Copy for Word/Docs</td>
                  <td className="p-3.5 bg-[var(--theme-accent)]/5 text-emerald-500 font-bold">✓ (Styles preserved)</td>
                  <td className="p-3.5 text-red-400">✗</td>
                  <td className="p-3.5 text-red-400">✗</td>
                </tr>
                <tr className="hover:bg-[var(--theme-surface)]/50 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-[var(--theme-text)]">Persistent Library memory</td>
                  <td className="p-3.5 bg-[var(--theme-accent)]/5 text-emerald-500 font-bold">✓ (Saved Snippets)</td>
                  <td className="p-3.5 text-red-400">✗</td>
                  <td className="p-3.5 text-red-400">✗</td>
                </tr>
                <tr className="hover:bg-[var(--theme-surface)]/50 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-[var(--theme-text)]">Guaranteed Data Privacy</td>
                  <td className="p-3.5 bg-[var(--theme-accent)]/5 text-emerald-500 font-bold">✓ (100% Client-side)</td>
                  <td className="p-3.5 text-[var(--theme-text-muted)]">Unresolved</td>
                  <td className="p-3.5 text-[var(--theme-text-muted)]">Unresolved</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION: FAQ ACCORDIONS */}
      <section className="faq-section py-16 sm:py-20 bg-[var(--theme-panel)] border-t border-[var(--theme-border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[var(--theme-accent)] tracking-widest uppercase bg-[var(--theme-accent)]/10 px-2.5 py-1 rounded-full mb-3">
              <Shield className="w-3 h-3 text-[var(--theme-accent)]" />
              <span>Support &amp; Context</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--theme-text)] mb-3">
              Frequently asked questions
            </h2>
            <p className="text-sm text-[var(--theme-text-muted)]">
              Quick answers explaining rendering layouts, performance, and confidentiality keys.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 font-bold text-left text-xs sm:text-sm text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors cursor-pointer select-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--theme-text-tint)] shrink-0 transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="px-4 pb-4 text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed border-t border-[var(--theme-border)]/50 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: CTA */}
      <section className="cta-section py-20 px-4 text-center border-t border-[var(--theme-border)] relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--theme-accent)]/[0.04] to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--theme-text)] mb-3">
            Present your code with pride
          </h2>
          <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed mb-6">
            Pristine, instant, completely client-side. Give your tutorials, slides, portfolios, and repositories the presentation they deserve.
          </p>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[var(--theme-accent)] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-[var(--theme-accent)]/15 transition-all cursor-pointer select-none"
          >
            <span>↑ Create Snippet now</span>
          </button>
        </div>
      </section>
    </div>
  );
}

// ── CUSTOM VECTOR ICONS (Simple, inline to bypass heavy standard dependency imports) ──
function TerminalIcon() {
  return (
    <svg className="w-4 h-3.5 text-[var(--theme-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--theme-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19H12V22Z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--theme-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function HighlightIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--theme-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5 z" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--theme-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--theme-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--theme-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function PrivacyIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--theme-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function FreeIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--theme-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
