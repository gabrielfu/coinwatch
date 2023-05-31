import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config.js';
const twConfig = resolveConfig(tailwindConfig);
export const twColors = twConfig.theme?.colors as { [key: string]: string };
export default twConfig;