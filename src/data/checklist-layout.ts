export type ScatterPosition = {
  x: number;
  y: number;
  size: "sm" | "md" | "lg" | "xl";
  rotate?: number;
};

/** Organic scatter positions for 12-item checklist (percent of container) */
export const planningScatter: ScatterPosition[] = [
  { x: 4, y: 6, size: "xl", rotate: -4 },
  { x: 38, y: 2, size: "md", rotate: 2 },
  { x: 68, y: 10, size: "lg", rotate: -2 },
  { x: 18, y: 28, size: "md", rotate: 3 },
  { x: 52, y: 24, size: "xl", rotate: -3 },
  { x: 82, y: 30, size: "sm", rotate: 5 },
  { x: 6, y: 52, size: "lg", rotate: -2 },
  { x: 34, y: 48, size: "sm", rotate: 4 },
  { x: 58, y: 56, size: "md", rotate: -5 },
  { x: 78, y: 50, size: "xl", rotate: 2 },
  { x: 22, y: 76, size: "md", rotate: -3 },
  { x: 48, y: 78, size: "lg", rotate: 1 },
];

export const spontaneousScatter: ScatterPosition[] = [
  { x: 8, y: 8, size: "lg", rotate: -3 },
  { x: 42, y: 4, size: "md", rotate: 4 },
  { x: 72, y: 14, size: "xl", rotate: -2 },
  { x: 20, y: 32, size: "sm", rotate: 2 },
  { x: 55, y: 28, size: "lg", rotate: -4 },
  { x: 84, y: 36, size: "md", rotate: 3 },
];

export const sizeClasses: Record<ScatterPosition["size"], string> = {
  sm: "text-[3.5rem] sm:text-[4.5rem]",
  md: "text-[4.5rem] sm:text-[6rem]",
  lg: "text-[5.5rem] sm:text-[7.5rem]",
  xl: "text-[6.5rem] sm:text-[9rem]",
};
