export const colorize = {
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  orange: (text: string) => `\x1b[33m${text}\x1b[0m`,
  violet: (text: string) => `\x1b[35m${text}\x1b[0m`,
};
