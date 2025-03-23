export const PREFIX = 'gc';

export type Modifiers = Record<string, boolean> | Array<string>;

export interface UseBemComposable {
  block: (modifiers?: Modifiers) => [string, Modifiers];
  element: (name: string, modifiers?: Modifiers) => [string, Modifiers];
  modifier: (name: string) => string;
  elementModifier: (element: string, name: string) => string;
  elementName: (name: string, dotless?: boolean) => string;
  elementSelector: (name: string, dotless?: boolean) => string;
  modifierSelector: (name: string) => string;
  elementModifierSelector: (element: string, name: string) => string;
  name: string;
  selector: string;
}

export function compute(
  name: string,
  modifiers: Modifiers
): [string, Modifiers] {
  return [
    name,
    Array.isArray(modifiers)
      ? modifiers.map(modifier => `${name}_${modifier}`)
      : Object.fromEntries(
          Object.entries(modifiers).map(([modifier, value]) => [
            `${name}_${modifier}`,
            value
          ])
        )
  ];
}

export function useBem(name: string): UseBemComposable {
  const block = `${PREFIX}-${name}`;
  return {
    block: (modifiers: Modifiers = {}): [string, Modifiers] =>
      compute(block, modifiers),
    element: (name: string, modifiers: Modifiers = {}): [string, Modifiers] =>
      compute(`${block}__${name}`, modifiers),
    modifier: (name: string) => `${block}_${name}`,
    elementModifier: (element, name) => `${block}__${element}_${name}`,
    elementName: name => `${block}__${name}`,
    elementSelector: name => `.${block}__${name}`,
    modifierSelector: name => `.${block}_${name}`,
    elementModifierSelector: (element: string, name: string) =>
      `.${block}__${element}_${name}`,
    name: block,
    selector: `.${block}`
  };
}
