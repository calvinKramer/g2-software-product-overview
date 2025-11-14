export function cleanText(str = "") {
  return str.replace(/\s+/g, " ").trim();
}