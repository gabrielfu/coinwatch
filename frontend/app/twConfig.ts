import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config.js';
import { RecursiveKeyValuePair } from 'tailwindcss/types/config';
const twConfig = resolveConfig(tailwindConfig);
export const twColors = twConfig.theme.colors as RecursiveKeyValuePair<string, string>;
export default twConfig;