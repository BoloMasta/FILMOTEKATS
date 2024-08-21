export type Breakpoints = {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  
  export const breakpoints: Breakpoints = {
    mobile: "(max-width: 767px)",
    tablet: "(min-width: 768px) and (max-width: 1279px)",
    desktop: "(min-width: 1280px)",
  };