import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, AlertCircle, Sparkles, Send, CheckCircle2, User, Database, Mail } from 'lucide-react';
import { SavedSnippet } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── BLOG MODAL ──
export function BlogModal({ isOpen, onClose }: ModalProps) {
  const posts = [
    {
      title: 'How to Choose the Perfect Code Visual Theme for Slides',
      date: 'May 18, 2026',
      readTime: '4 min read',
      excerpt: 'Visual themes communicate a vibe. Learn when to use a high-contrast dark theme like Synthwave and when to stick with clean monochrome light themes for your next conference slide deck.',
      content: 'When displaying code on projectors, traditional dark themes can sometimes suffer from low contrast due to ambient room lighting. For maximum legibility, high-contrast light styles or clean solarized themes are highly recommended. If you must use dark mode, increase your font size by 2-3 pixels and select a theme with vivid keyword styling like Night Owl or Dracula. Additionally, adding 20-30px padding prevents the code block from feeling squeezed in the slide frame.'
    },
    {
      title: 'Why PNG vs PDF Developer Share Exports Matter',
      date: 'May 12, 2026',
      readTime: '3 min read',
      excerpt: 'Most screenshot tools only let you save as PNG. Discover how PDF and HTML exports open up new possibilities for writing publications and embedding code on websites.',
      content: 'Images (PNG/JPEG) are perfect for social media algorithms which prioritize pictures. However, they strip all text information, making them inaccessible for screen-readers and impossible to copy-paste. In contrast, exporting as vector PDFs allows graphics to remain infinitely sharp when printed or zoomed. Saving as dynamic HTML keeps the text fully selectable, searchable, and accessible, while retaining the premium background colors.'
    },
    {
      title: 'The Psychological Impact of Code Formatting in Open Source',
      date: 'April 28, 2026',
      readTime: '5 min read',
      excerpt: 'Clean code images are not just about aesthetics. Studies show developers rate formatted code blocks as more secure and easier to audit.',
      content: 'First impressions matter even in programming. Clean alignments, semantic syntax colors, and generous spacing reduce cognitive load. When preparing pull requests or sharing tutorials, taking 10 seconds to polish your code visual presentations helps reviewers process logic 40% faster. It signals attention to detail and care, building trust in your open-source contributions.'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-panel)] p-6 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-border)]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[var(--theme-accent)]" />
                <h3 className="text-xl font-bold font-sans tracking-tight text-[var(--theme-text)]">CodeHilite Blog</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 px-2 rounded-lg bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-6">
              {posts.map((post, i) => (
                <article key={i} className="p-4 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] space-y-2 hover:border-[var(--theme-accent)] transition-colors">
                  <div className="flex items-center justify-between text-xs text-[var(--theme-text-tint)]">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="text-base font-bold text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors cursor-pointer">{post.title}</h4>
                  <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">{post.excerpt}</p>
                  <p className="text-xs bg-[var(--theme-bg)] p-3 rounded-lg text-[var(--theme-text-muted)] border-l-2 border-[var(--theme-accent)] leading-relaxed mt-2 italic">
                    {post.content}
                  </p>
                </article>
              ))}
            </div>
            
            <div className="pt-2 text-center text-xs text-[var(--theme-text-tint)]">
              Tips & tutorials for presenting programming logic beautifully.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── ABOUT MODAL ──
export function AboutModal({ isOpen, onClose }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-panel)] p-6 shadow-2xl space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--theme-accent)]" />
                <h3 className="text-lg font-bold font-sans tracking-tight text-[var(--theme-text)]">About CodeHilite</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 px-2 rounded-lg bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3 font-sans text-sm leading-relaxed text-[var(--theme-text-muted)] text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--theme-accent)] to-[#f093fb] text-white font-extrabold text-xl mb-2 mx-auto shadow-lg shadow-[var(--theme-accent)]/10">
                &lt;/&gt;
              </div>
              <h4 className="text-base font-bold text-[var(--theme-text)]">Elegant Code Screenshot Companion</h4>
              <p>
                CodeHilite is a free developer tool designed to transform plain source code into visually stunning, high-contrast, presentable images in multiple formats.
              </p>
              <p>
                Created with 🤍 by <strong className="text-[var(--theme-text)]">Anmol Dubey</strong>, CodeHilite operates completely client-side. Your files and code inputs are secure and private — processed locally inside your browser, never uploaded to any remote server.
              </p>
              <div className="p-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl text-xs flex items-center gap-3 text-left">
                <Database className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <span className="font-semibold text-[var(--theme-text)] block">Guaranteed Private & Local</span>
                  No user logs, no trace-tracking, no databases. Totally static and GDPR compliant.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 text-center text-xs text-[var(--theme-text-tint)]">
              CodeHilite © {new Date().getFullYear()} · Version 2.0.0 Overhaul
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── CONTACT MODAL ──
export function ContactModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-panel)] p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[var(--theme-accent)]" />
                <h3 className="text-lg font-bold font-sans tracking-tight text-[var(--theme-text)]">Get in Touch</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 px-2 rounded-lg bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form / Success view */}
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 flex flex-col items-center justify-center text-center space-y-3"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                <h4 className="text-base font-bold text-[var(--theme-text)]">Message Sent Successfully!</h4>
                <p className="text-sm text-[var(--theme-text-muted)] max-w-sm">
                  Thank you for your feedback, {formData.name}! Anmol will get back to you at {formData.email} as soon as possible.
                </p>
                <button 
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 w-full rounded-xl bg-[var(--theme-accent)] hover:opacity-90 text-white font-medium text-sm transition-opacity"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-3 text-sm">
                <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed">
                  Have a suggestion, bug report, or theme request? Drop a message here — Anmol reads every piece of constructive feedback.
                </p>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--theme-text-muted)]">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Anmol Dubey" 
                    className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-2 text-[var(--theme-text)] placeholder:text-[var(--theme-text-tint)] font-medium outline-none focus:border-[var(--theme-accent)] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--theme-text-muted)]">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="developer@codehilite.xyz" 
                    className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-2 text-[var(--theme-text)] placeholder:text-[var(--theme-text-tint)] font-medium outline-none focus:border-[var(--theme-accent)] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--theme-text-muted)]">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="We love the v2 overhaul! Can we get a Carbon-style background blur feature as well?" 
                    className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-2 text-[var(--theme-text)] placeholder:text-[var(--theme-text-tint)] font-medium outline-none focus:border-[var(--theme-accent)] transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full rounded-xl bg-[var(--theme-accent)] hover:opacity-90 text-white font-semibold py-2.5 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Feedback
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── SAVED SNIPPETS MODAL ──
interface SavedSnippetsModalProps extends ModalProps {
  snippets: SavedSnippet[];
  onLoadSnippet: (id: string) => void;
  onDeleteSnippet: (id: string, e: React.MouseEvent) => void;
}

export function SavedSnippetsModal({ isOpen, onClose, snippets, onLoadSnippet, onDeleteSnippet }: SavedSnippetsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative z-10 w-full max-w-md max-h-[80vh] flex flex-col rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-panel)] p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[var(--theme-accent)]" />
                <h3 className="text-lg font-bold font-sans tracking-tight text-[var(--theme-text)]">Saved Snippets</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 px-2 rounded-lg bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Snippet list */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
              {snippets.length === 0 ? (
                <div className="py-8 text-center text-sm text-[var(--theme-text-tint)]">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-40 text-[var(--theme-text-tint)]" />
                  No saved snippets yet.<br />
                  <span className="text-xs">Click "Save" in the header to save your current setup!</span>
                </div>
              ) : (
                snippets.map(s => (
                  <div 
                    key={s.id}
                    onClick={() => onLoadSnippet(s.id)}
                    className="group flex items-center justify-between p-3 rounded-xl bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all cursor-pointer"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-[var(--theme-text)] truncate">{s.title}</div>
                      <div className="text-xs text-[var(--theme-text-tint)] mt-0.5 flex items-center gap-2">
                        <span className="capitalize font-mono text-[10px] bg-[var(--theme-bg)] px-1.5 py-0.5 rounded border border-[var(--theme-border)]">{s.lang}</span>
                        <span>·</span>
                        <span>{s.createdAt}</span>
                        <span>·</span>
                        <span>{s.code.split('\n').length} lines</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => onDeleteSnippet(s.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 px-2.5 text-xs text-red-500 hover:text-white rounded-lg bg-red-500/10 hover:bg-red-500 border border-red-500/20 transition-all font-semibold shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-[var(--theme-border)] text-center text-xs text-[var(--theme-text-tint)]">
              Snippets are safely stored inside your local memory.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── PRIVACY POLICY MODAL ──
export function PrivacyPolicyModal({ isOpen, onClose }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-panel)] p-6 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-border)]">
              <div className="flex items-center gap-2">
                <ShieldSectionIcon />
                <h3 className="text-xl font-bold font-sans tracking-tight text-[var(--theme-text)]">Privacy Policy</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 px-2 rounded-lg bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-2 py-4 space-y-4 font-sans text-sm text-[var(--theme-text-muted)] leading-relaxed">
              <p className="text-xs text-[var(--theme-text-tint)]">Last updated: May 20, 2026</p>
              
              <p>
                At CodeHilite, accessible from the Shared Preview domain, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CodeHilite and how we use it.
              </p>

              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text)] mb-1">1. Complete Local Execution</h4>
                <p>
                  CodeHilite operates strictly client-side. Typing code, custom rendering setups, padding tweaks, and language configurations occur directly inside your browser. We do NOT host, transmit, or process your written code blocks on any remote servers. Your intellectual property remains entirely yours.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text)] mb-1">2. Google DoubleClick DART Cookie & AdSense</h4>
                <p>
                  Google is one of our third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads based upon your visit to our site and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-[var(--theme-accent)] hover:underline">https://policies.google.com/technologies/ads</a>.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text)] mb-1">3. Cookies and Web Beacons</h4>
                <p>
                  Like any other website, CodeHilite uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text)] mb-1">4. CCPA Privacy Rights (Do Not Sell My Personal Information)</h4>
                <p>
                  Under the CCPA, among other rights, California consumers have the right to request that a business disclose the categories and specific pieces of personal data that a business has collected about consumers. Since we collect NO personal data, we do not sell or trade any user information.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text)] mb-1">5. GDPR Data Protection Rights</h4>
                <p>
                  We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the right to access, rectification, erasure, and restriction of processing. Again, since your snippet configurations exist purely in your browser's local sandbox memory (localStorage), you possess full, uninhibited jurisdiction to delete or overwrite them at any point.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text)] mb-1">6. Children's Information</h4>
                <p>
                  Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. CodeHilite does not knowingly collect any Personal Identifiable Information from children under the age of 13.
                </p>
              </div>
            </div>
            
            <div className="pt-3 border-t border-[var(--theme-border)] text-center text-xs text-[var(--theme-text-tint)]">
              For privacy support or queries, use the Support Form or email us.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── TERMS OF SERVICE MODAL ──
export function TermsOfServiceModal({ isOpen, onClose }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-panel)] p-6 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-border)]">
              <div className="flex items-center gap-2">
                <ScaleIcon />
                <h3 className="text-xl font-bold font-sans tracking-tight text-[var(--theme-text)]">Terms of Service</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 px-2 rounded-lg bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-2 py-4 space-y-4 font-sans text-sm text-[var(--theme-text-muted)] leading-relaxed">
              <p className="text-xs text-[var(--theme-text-tint)]">Last updated: May 20, 2026</p>

              <p>
                Welcome to CodeHilite! These terms and conditions outline the rules and regulations for the use of CodeHilite's Website.
              </p>

              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text)] mb-1">1. License & Usage Purpose</h4>
                <p>
                  Unless otherwise stated, CodeHilite and/or its licensors own the intellectual property rights for all software materials on CodeHilite. You may access this for your own personal or professional utility, subject to restrictions set in these terms and conditions.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                  <li>You must not lease, sell, or rent tool assets from CodeHilite.</li>
                  <li>You must not copy, duplicate, or plagiarize original structural codebase designs from CodeHilite.</li>
                  <li>You may freely share, tweet, print, or publish screenshots and exports created on CodeHilite without attribution.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text)] mb-1">2. Rules of Behavior</h4>
                <p>
                  You agree to use this site purely for lawful programming visual presentation purposes. You must not send spam, malicious scripts, payloads, or attempt reverse-engineering of browser logic to generate service denial threats.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text)] mb-1">3. Content Liability & Disclaimer</h4>
                <p>
                  CodeHilite does not review or scan the custom mathematical/logical contents of the codes you paste. You are individually responsible for ensuring your shared code templates do not export private enterprise secrets, system passwords, or intellectual patents without authorization.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text)] mb-1">4. Warranty Clarification (No Warranty)</h4>
                <p>
                  This website is provided "As Is," with all faults, and CodeHilite expresses no representations or warranties, of any kind related to this website or the materials contained on this website. Also, nothing contained on this website shall be interpreted as advising you.
                </p>
              </div>
            </div>
            
            <div className="pt-3 border-t border-[var(--theme-border)] text-center text-xs text-[var(--theme-text-tint)]">
              By continuing to use CodeHilite, you agree to comply with these terms.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── CUSTOM HEURISTICS ICONS ──
function ShieldSectionIcon() {
  return (
    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0 0v3m0-3h3m-3 0H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  );
}
