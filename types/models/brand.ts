// Brand and theme related types

export interface BrandColors {
  primary: string;
  dark: string;
  light: string;
}

export interface Brand {
  colors: BrandColors;
  name?: string;
  logo?: string;
  favicon?: string;
}

export interface Theme {
  colors: BrandColors;
  fontFamily?: string;
  borderRadius?: string;
  spacing?: Record<string, string>;
  breakpoints?: Record<string, string>;
}
