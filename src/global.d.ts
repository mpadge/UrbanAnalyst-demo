// Next.js >=15 ships these ambient declarations itself (see
// next/types/global.d.ts); Next 14's bundled types don't, so TypeScript's
// side-effect import check (TS2882) fails on plain `import './x.css'`.
declare module '*.css' {}
declare module '*.sass' {}
declare module '*.scss' {}
