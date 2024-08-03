export function getRandomInRange(range: number) {
  return Math.floor(Math.random() * range);
}

export function nextPowerOfTwo(n: number): number {
  if (n <= 0) return 1;
  return Math.pow(2, Math.ceil(Math.log2(n)));
}

export function isPowerOfTwo(n: number): boolean {
  if (n <= 0) return false;
  const log2 = Math.log2(n);
  return Math.floor(log2) === log2;
}
export function generateNumberArray(n: number): number[] {
  return Array.from({ length: n }, (_, index) => index);
}
