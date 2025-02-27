// theme.js
import { css } from 'styled-components';

// 테일윈드 컬러 변수를 자바스크립트로 변환
export const colorFromHSL = (hslVar) => {
  return ({ theme }) => {
    const hslValue = getComputedStyle(document.documentElement)
      .getPropertyValue(hslVar.replace('var(', '').replace(')', ''))
      .trim();
    return `hsl(${hslValue})`;
  };
};

// 반응형 미디어 쿼리
export const media = {
  sm: (...args) => css`
    @media (min-width: 640px) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (min-width: 768px) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media (min-width: 1024px) {
      ${css(...args)}
    }
  `,
  xl: (...args) => css`
    @media (min-width: 1280px) {
      ${css(...args)}
    }
  `,
  '2xl': (...args) => css`
    @media (min-width: 1536px) {
      ${css(...args)}
    }
  `,
};

// 테마 객체
const theme = {
  colors: {
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    primary: 'hsl(var(--primary))',
    primaryForeground: 'hsl(var(--primary-foreground))',
    secondary: 'hsl(var(--secondary))',
    secondaryForeground: 'hsl(var(--secondary-foreground))',
    muted: 'hsl(var(--muted))',
    mutedForeground: 'hsl(var(--muted-foreground))',
    accent: 'hsl(var(--accent))',
    accentForeground: 'hsl(var(--accent-foreground))',
    destructive: 'hsl(var(--destructive))',
    destructiveForeground: 'hsl(var(--destructive-foreground))',
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
  },
  borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  media,
};

export default theme;