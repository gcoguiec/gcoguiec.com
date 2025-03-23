import { it, describe, expect } from 'vitest';

import { compute, useBem } from '~/composables/use-bem';

describe('computed()', () => {
  const element = 'element';

  describe('when providing modifiers as an array', () => {
    const modifiers = ['modifier'];

    it('computes class string with correct modifier', () => {
      const [name, mods] = compute(element, modifiers);
      expect(name).toBe(element);
      expect(mods).toStrictEqual(['element_modifier']);
    });
  });

  describe('when providing modifiers as an object', () => {
    const modifiers = { modifier: true };

    it('computes class string with correct modifier', () => {
      const [name, mods] = compute(element, modifiers);
      expect(name).toBe(element);
      expect(mods).toStrictEqual({ element_modifier: true });
    });
  });
});

describe('useBem()', () => {
  const bem = useBem('block');

  it('returns correct block and its modifiers', () => {
    expect(bem.block(['modifier'])).toStrictEqual([
      'gc-block',
      ['gc-block_modifier']
    ]);
  });

  it('returns proper element and its modifiers', () => {
    expect(bem.element('element', ['modifier'])).toStrictEqual([
      'gc-block__element',
      ['gc-block__element_modifier']
    ]);
  });

  it('returns proper modifier', () => {
    expect(bem.modifier('modifier')).toBe('gc-block_modifier');
  });

  it('returns right element modifier', () => {
    expect(bem.elementModifier('element', 'modifier')).toBe(
      'gc-block__element_modifier'
    );
  });

  it('returns valid element name', () => {
    expect(bem.elementName('element')).toBe('gc-block__element');
  });

  it('returns proper selectors', () => {
    expect(bem.elementSelector('element')).toBe('.gc-block__element');
    expect(bem.modifierSelector('modifier')).toBe('.gc-block_modifier');
    expect(bem.elementModifierSelector('element', 'modifier')).toBe(
      '.gc-block__element_modifier'
    );
  });

  it('returns its name and selector', () => {
    expect(bem.name).toBe('gc-block');
    expect(bem.selector).toBe('.gc-block');
  });
});
