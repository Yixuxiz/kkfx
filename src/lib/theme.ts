export interface ThemeConfig {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  textSecondary: string;
  textMuted: string;
  borderColor: string;
}

export const themes: Record<string, ThemeConfig> = {
  light: {
    id: 'light',
    name: '日间模式',
    bgColor: '#FAFAF8',
    textColor: '#1A1A1A',
    textSecondary: '#666666',
    textMuted: '#999999',
    borderColor: '#EEEEEE',
  },
  dark: {
    id: 'dark',
    name: '护眼模式',
    bgColor: '#1A1A1A',
    textColor: '#FAFAF8',
    textSecondary: '#AAAAAA',
    textMuted: '#666666',
    borderColor: '#333333',
  },
};
