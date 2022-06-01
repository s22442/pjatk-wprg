import type { ViteSSGContext } from 'vite-ssg';

export type PluginModule = (ctx: ViteSSGContext) => void;
