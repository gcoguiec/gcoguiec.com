// @vitest-environment node

import { describe, it } from 'vitest';
import sassTrue from 'sass-true';
import path from 'node:path';
import { glob } from 'glob';

describe('scss', () => {
  glob.sync(path.join(__dirname, '**/*.spec.scss')).forEach(file => {
    sassTrue.runSass({ describe, it }, file);
  });
});
