export {};

declare global {
  interface Window {
    AISummarizeAPI: any;
  }
}

declare module '*.svg' {
  const content: any;
  export default content;
}