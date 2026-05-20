import { LanguageSpec, ThemeSpec } from './types';

export const LANGUAGES: LanguageSpec[] = [
  { value: 'auto', label: 'Auto Detect', ext: '' },
  { value: 'javascript', label: 'JavaScript', ext: 'js' },
  { value: 'typescript', label: 'TypeScript', ext: 'ts' },
  { value: 'python', label: 'Python', ext: 'py' },
  { value: 'java', label: 'Java', ext: 'java' },
  { value: 'cpp', label: 'C++', ext: 'cpp' },
  { value: 'c', label: 'C', ext: 'c' },
  { value: 'csharp', label: 'C#', ext: 'cs' },
  { value: 'go', label: 'Go', ext: 'go' },
  { value: 'rust', label: 'Rust', ext: 'rs' },
  { value: 'ruby', label: 'Ruby', ext: 'rb' },
  { value: 'php', label: 'PHP', ext: 'php' },
  { value: 'swift', label: 'Swift', ext: 'swift' },
  { value: 'kotlin', label: 'Kotlin', ext: 'kt' },
  { value: 'html', label: 'HTML', ext: 'html' },
  { value: 'css', label: 'CSS', ext: 'css' },
  { value: 'scss', label: 'SCSS', ext: 'scss' },
  { value: 'sql', label: 'SQL', ext: 'sql' },
  { value: 'bash', label: 'Bash / Shell', ext: 'sh' },
  { value: 'json', label: 'JSON', ext: 'json' },
  { value: 'yaml', label: 'YAML', ext: 'yml' },
  { value: 'xml', label: 'XML', ext: 'xml' },
  { value: 'markdown', label: 'Markdown', ext: 'md' },
  { value: 'r', label: 'R', ext: 'r' },
  { value: 'lua', label: 'Lua', ext: 'lua' },
  { value: 'dockerfile', label: 'Dockerfile', ext: 'docker' },
  { value: 'graphql', label: 'GraphQL', ext: 'gql' },
  { value: 'dart', label: 'Dart', ext: 'dart' }
];

export const THEMES: ThemeSpec[] = [
  // Dark Themes
  { value: 'atom-one-dark', label: 'Atom One Dark', isDark: true },
  { value: 'monokai', label: 'Monokai', isDark: true },
  { value: 'dracula', label: 'Dracula', isDark: true },
  { value: 'github-dark', label: 'GitHub Dark', isDark: true },
  { value: 'nord', label: 'Nord', isDark: true },
  { value: 'solarized-dark', label: 'Solarized Dark', isDark: true },
  { value: 'tokyo-night-dark', label: 'Tokyo Night', isDark: true },
  { value: 'a11y-dark', label: 'A11y Dark', isDark: true },
  { value: 'gruvbox-dark-hard', label: 'Gruvbox Dark', isDark: true },
  { value: 'night-owl', label: 'Night Owl', isDark: true },
  // Light Themes
  { value: 'github', label: 'GitHub Light', isDark: false },
  { value: 'vs', label: 'Visual Studio', isDark: false },
  { value: 'xcode', label: 'Xcode', isDark: false },
  { value: 'solarized-light', label: 'Solarized Light', isDark: false },
  { value: 'a11y-light', label: 'A11y Light', isDark: false },
  { value: 'gruvbox-light-hard', label: 'Gruvbox Light', isDark: false },
  // Special / Academic Print
  { value: 'latex', label: 'LaTeX listings (Classic)', isDark: false },
  { value: 'academic-pure', label: 'Academic Publication (B&W)', isDark: false },
  { value: 'modern-journal', label: 'Modern Journal (Cream)', isDark: false }
];

export interface BackgroundPreset {
  id: string;
  name: string;
  value: string;
  type: 'solid' | 'gradient';
  color1: string;
  color2: string;
  dir: string;
}

export const BG_PRESETS: BackgroundPreset[] = [
  {
    id: 'deep-space',
    name: 'Deep Space',
    value: 'linear-gradient(135deg, #1e1e38 0%, #111126 50%, #070714 100%)',
    type: 'gradient',
    color1: '#1e1e38',
    color2: '#070714',
    dir: '135deg'
  },
  {
    id: 'sunset-neon',
    name: 'Sunset Glow',
    value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    type: 'gradient',
    color1: '#f093fb',
    color2: '#f5576c',
    dir: '135deg'
  },
  {
    id: 'aurora',
    name: 'Northern Aurora',
    value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    type: 'gradient',
    color1: '#43e97b',
    color2: '#38f9d7',
    dir: '135deg'
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Cyan',
    value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    type: 'gradient',
    color1: '#4facfe',
    color2: '#00f2fe',
    dir: '135deg'
  },
  {
    id: 'electric-violet',
    name: 'Neon Violet',
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    type: 'gradient',
    color1: '#667eea',
    color2: '#764ba2',
    dir: '135deg'
  },
  {
    id: 'golden-hour',
    name: 'Golden Amber',
    value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    type: 'gradient',
    color1: '#fa709a',
    color2: '#fee140',
    dir: '135deg'
  },
  {
    id: 'cyberpunk-neon',
    name: 'Synthwave Neon',
    value: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
    type: 'gradient',
    color1: '#2d1b69',
    color2: '#11998e',
    dir: '135deg'
  },
  {
    id: 'lavender-dream',
    name: 'Soft Lavender',
    value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    type: 'gradient',
    color1: '#a18cd1',
    color2: '#fbc2eb',
    dir: '135deg'
  },
  {
    id: 'pitch-black',
    name: 'Monochrome Dark',
    value: '#0d1117',
    type: 'solid',
    color1: '#0d1117',
    color2: '#0d1117',
    dir: '135deg'
  },
  {
    id: 'soft-ivory',
    name: 'Minimal Light',
    value: '#f8f9fc',
    type: 'solid',
    color1: '#f8f9fc',
    color2: '#f8f9fc',
    dir: '135deg'
  },
  {
    id: 'transparent-check',
    name: 'Transparent',
    value: 'transparent',
    type: 'solid',
    color1: '#ffffff',
    color2: '#ffffff',
    dir: '135deg'
  }
];

export const FONTS = [
  { value: "'JetBrains Mono', monospace", label: 'JetBrains Mono' },
  { value: "'Fira Code', monospace", label: 'Fira Code' },
  { value: "'Source Code Pro', monospace", label: 'Source Code Pro' },
  { value: "'Cascadia Code', monospace", label: 'Cascadia Code' },
  { value: "'Courier New', monospace", label: 'Courier New' },
  { value: 'Consolas, monospace', label: 'Consolas' },
  { value: 'Monaco, monospace', label: 'Monaco' },
  { value: "'IBM Plex Mono', monospace", label: 'IBM Plex Mono' }
];

export const HIGHLIGHT_SHADOWS = [
  { id: 'none', label: 'None', css: 'none' },
  { id: 'soft', label: 'Soft', css: '0 4px 24px rgba(0, 0, 0, 0.25)' },
  { id: 'mid', label: 'Medium', css: '0 12px 48px rgba(0, 0, 0, 0.45)' },
  { id: 'deep', label: 'Deep Gloss', css: '0 24px 80px rgba(0, 0, 0, 0.70)' }
];

export const DEFAULT_SAMPLE_CODE = `// CodeHilite — Beautiful Code Snippets ✦
function formatDuration(ms: number): string {
  const units = [
    { label: 'day',    ms: 86_400_000 },
    { label: 'hour',   ms:  3_600_000 },
    { label: 'minute', ms:     60_000 },
    { label: 'second', ms:      1_000 },
  ];

  return units
    .filter(({ ms: u }) => ms >= u)
    .map(({ label, ms: u }) => {
      const val = Math.floor(ms / u);
      ms %= u;
      return \`\${val} \${label}\${val !== 1 ? 's' : ''}\`;
    })
    .join(', ') || '0 seconds';
}

console.log(formatDuration(90_061_000));
// → "1 day, 1 hour, 1 minute, 1 second"`;

/**
 * Parses a highlight lines string representation (e.g., "1,3,5-8") into an array of line numbers.
 */
export function parseHlLines(str: string): number[] {
  if (!str) return [];
  const res: number[] = [];
  const segments = str.split(',');
  for (const seg of segments) {
    const trimmed = seg.trim();
    if (trimmed.includes('-')) {
      const [startStr, endStr] = trimmed.split('-');
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
          res.push(i);
        }
      }
    } else {
      const val = parseInt(trimmed, 10);
      if (!isNaN(val)) {
        res.push(val);
      }
    }
  }
  return res;
}
