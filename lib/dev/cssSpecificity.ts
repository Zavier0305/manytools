export interface Specificity {
  ids: number;
  classes: number;
  elements: number;
}

export function calculateSpecificity(selector: string): Specificity {
  let s = selector.replace(/::?[a-zA-Z-]+(\([^)]*\))?/g, (match) => {
    if (/^::/.test(match)) return " ELEMENT ";
    if (/^:not\(/.test(match)) return "";
    return " CLASS ";
  });

  const ids = (s.match(/#[a-zA-Z0-9_-]+/g) ?? []).length;
  s = s.replace(/#[a-zA-Z0-9_-]+/g, "");

  const classesAttrs = (s.match(/\.[a-zA-Z0-9_-]+|\[[^\]]+\]|CLASS/g) ?? []).length;
  s = s.replace(/\.[a-zA-Z0-9_-]+|\[[^\]]+\]|CLASS/g, "");

  const elements =
    (s.match(/(^|[\s>+~])[a-zA-Z][a-zA-Z0-9]*/g) ?? []).length + (s.match(/ELEMENT/g) ?? []).length;

  return { ids, classes: classesAttrs, elements };
}
