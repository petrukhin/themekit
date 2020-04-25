import { FlattenToken } from './types'

/**
 * Returns css with tokens.
 *
 * @param tokens Tokens list.
 * @param selector Selector name.
 */
export function cssTemplate(tokens: FlattenToken[], selector: string): string {
  let result = `${selector} {\n`
  for (const token of tokens) {
    if (token.comment !== undefined) {
      result += `    /* ${token.comment} */\n`
    }
    result += `    --${token.name}: ${token.value};\n`
  }
  result += '}\n'
  return result
}

/**
 * Returns js module with tokens.
 *
 * @param tokens Tokens list.
 */
export function esmTemplate(tokens: FlattenToken[]): string {
  let result = ''
  for (const token of tokens) {
    if (token.comment !== undefined) {
      result += `// ${token.comment}\n`
    }
    result += `export const ${token.name} = '${token.value}';\n`
  }
  return result
}
