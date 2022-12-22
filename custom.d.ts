/// <reference types="next" />
/// <reference types="next/types/global" />

// additional things that one used to put here before Next.js v11
declare module '*.svg' {
  const content: string;
  export default content;
}
