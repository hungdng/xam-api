export function _generatorPassword() {
  try {
    return Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
  } catch (e) {
    return e;
  }
}
