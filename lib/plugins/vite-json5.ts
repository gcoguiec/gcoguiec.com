import type { PluginOption } from 'vite';

import JSON5 from 'json5';

/**
 * A minimal JSON5 file loader.
 */
export default function ViteJson5(): PluginOption {
  return {
    name: 'json5-loader',
    /**
     * Transforms JSON5 file into a deserialized and transformed output.
     *
     * @returns The transformed result.
     */
    transform(code: string, id: string) {
      if (!id.endsWith('.json5')) {
        return;
      }

      return {
        code: `export default ${JSON5.stringify(JSON5.parse(code))};`,
        map: null
      };
    }
  };
}
