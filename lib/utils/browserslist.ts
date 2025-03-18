import browserslist from 'browserslist';

/**
 * Converts a browserslist manifest into an esbuild target collection.
 *
 * @param path The `.browserslistrc` location path.
 * @returns A collection of esbuild targets.
 */
export function browserslistToTarget(path: string) {
  return browserslist(browserslist.loadConfig({ path }))
    .map(browser =>
      browser.replace('ios_saf', 'ios').replace('and_chr', 'android').split(' ')
    )
    .filter(([name]) =>
      name
        ? ['chrome', 'edge', 'firefox', 'ios', 'safari'].includes(name)
        : false
    )
    .map(browser => browser.join(''));
}
