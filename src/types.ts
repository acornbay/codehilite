/**
 * CodeHilite Shared Types
 */

export interface ExportSettings {
  title: string;
  code: string;
  lang: string;
  theme: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  padding: number;
  cardWidth: number;
  showLineNums: boolean;
  wordWrap: boolean;
  showLangBadge: boolean;
  bgType: 'solid' | 'gradient';
  bgColor1: string;
  bgColor2: string;
  bgDir: string;
  bgPreset: string; // Background css or color
  shadowClass: string; // shadow-none, shadow-md, etc.
  shadowValue: string; // CSS shadow value
  borderRadius: number;
  hlLines: string; // string representing user input e.g. "1,3,5-8"
}

export interface SavedSnippet {
  id: string;
  title: string;
  code: string;
  lang: string;
  createdAt: string;
  settings: ExportSettings;
}

export interface LanguageSpec {
  value: string;
  label: string;
  ext: string;
}

export interface ThemeSpec {
  value: string;
  label: string;
  isDark: boolean;
}
