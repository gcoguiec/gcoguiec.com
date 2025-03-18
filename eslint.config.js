import { vue, vitest } from '@gcoguiec/eslint-config';

export default [
  {
    ignores: ['.vite/*', '_site/*', '*.config.ts']
  },
  ...(await vue({ typescript: true })),
  ...(await vitest({ typescript: true }))
];
